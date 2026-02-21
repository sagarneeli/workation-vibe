/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient, ListingType } = require("@prisma/client")

const prisma = new PrismaClient()

const GEONAMES_BASE = "https://secure.geonames.org"
const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter"
const OPEN_METEO_ENDPOINT = "https://api.open-meteo.com/v1/forecast"

const geonamesUsername = process.env.GEONAMES_USERNAME
const destinationLimit = Number(process.env.DESTINATION_LIMIT || 15)

const fallbackCities = [
  { name: "Bali", countryName: "Indonesia", countrycode: "ID", lat: -8.4095, lng: 115.1889, population: 4220000 },
  { name: "Lisbon", countryName: "Portugal", countrycode: "PT", lat: 38.7223, lng: -9.1393, population: 545245 },
  { name: "Chiang Mai", countryName: "Thailand", countrycode: "TH", lat: 18.7883, lng: 98.9853, population: 127240 },
  { name: "Medellin", countryName: "Colombia", countrycode: "CO", lat: 6.2442, lng: -75.5812, population: 2569000 },
  { name: "Mexico City", countryName: "Mexico", countrycode: "MX", lat: 19.4326, lng: -99.1332, population: 9209944 },
  { name: "Barcelona", countryName: "Spain", countrycode: "ES", lat: 41.3874, lng: 2.1686, population: 1620343 },
  { name: "Bangkok", countryName: "Thailand", countrycode: "TH", lat: 13.7563, lng: 100.5018, population: 10539000 },
  { name: "Buenos Aires", countryName: "Argentina", countrycode: "AR", lat: -34.6037, lng: -58.3816, population: 3075646 },
  { name: "Cape Town", countryName: "South Africa", countrycode: "ZA", lat: -33.9249, lng: 18.4241, population: 433688 },
  { name: "Ho Chi Minh City", countryName: "Vietnam", countrycode: "VN", lat: 10.8231, lng: 106.6297, population: 8993082 },
]

const regionBoxes = [
  { north: 72, south: 35, west: -10, east: 45 },
  { north: 50, south: -35, west: -20, east: 55 },
  { north: 55, south: -56, west: -130, east: -30 },
  { north: 55, south: -12, west: 65, east: 150 },
]

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function classifyClimate(latitude) {
  const abs = Math.abs(latitude)
  if (abs < 23.5) return "Tropical"
  if (abs < 40) return "Subtropical"
  if (abs < 60) return "Temperate"
  return "Cool"
}

function destinationDescription(city) {
  return `${city.name} is an active urban destination in ${city.countryName} with strong connectivity and amenities suited for remote work and long-stay travel.`
}

async function fetchJson(url, options = {}, retries = 2) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const body = await response.text()
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${body.slice(0, 250)}`)
    }
    return response.json()
  } catch (error) {
    if (retries <= 0) throw error
    await sleep(1200)
    return fetchJson(url, options, retries - 1)
  }
}

async function fetchGeoNamesCities() {
  if (!geonamesUsername) {
    console.log("GEONAMES_USERNAME is not set. Falling back to curated global city list.")
    return fallbackCities.slice(0, destinationLimit)
  }

  const all = []

  for (const box of regionBoxes) {
    const query = new URLSearchParams({
      north: String(box.north),
      south: String(box.south),
      east: String(box.east),
      west: String(box.west),
      maxRows: "120",
      lang: "en",
      username: geonamesUsername,
    })

    const url = `${GEONAMES_BASE}/citiesJSON?${query.toString()}`
    const data = await fetchJson(url, {
      headers: {
        "User-Agent": "workation-vibe-data-sync/1.0",
      },
    })

    const geonames = Array.isArray(data?.geonames) ? data.geonames : []
    all.push(...geonames)

    await sleep(350)
  }

  const deduped = new Map()
  for (const city of all) {
    const key = `${city.name}|${city.countrycode}`
    const existing = deduped.get(key)
    if (!existing || (city.population ?? 0) > (existing.population ?? 0)) {
      deduped.set(key, city)
    }
  }

  return [...deduped.values()]
    .filter((city) => city.name && city.countryName && city.lat && city.lng)
    .sort((a, b) => (b.population ?? 0) - (a.population ?? 0))
    .slice(0, destinationLimit)
}

async function enrichCityWithWeather(city) {
  const query = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lng),
    current: "temperature_2m",
  })

  const url = `${OPEN_METEO_ENDPOINT}?${query.toString()}`
  const data = await fetchJson(url, {
    headers: {
      "User-Agent": "workation-vibe-data-sync/1.0",
    },
  })

  const currentTemp = data?.current?.temperature_2m
  return {
    climate: classifyClimate(Number(city.lat)),
    temperature: Number.isFinite(currentTemp) ? currentTemp : null,
  }
}

async function fetchListingsForCity(city) {
  const lat = Number(city.lat)
  const lon = Number(city.lng)

  const query = `
[out:json][timeout:25];
(
  nwr(around:4500,${lat},${lon})["office"="coworking"];
  nwr(around:4500,${lat},${lon})["amenity"="coworking_space"];
  nwr(around:4500,${lat},${lon})["amenity"="cafe"];
  nwr(around:4500,${lat},${lon})["tourism"~"hostel|hotel|guest_house|apartment"];
);
out center tags 40;
`

  const body = new URLSearchParams({ data: query })
  const data = await fetchJson(OVERPASS_ENDPOINT, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "workation-vibe-data-sync/1.0",
    },
  })

  const elements = Array.isArray(data?.elements) ? data.elements : []
  const listings = []

  for (const element of elements) {
    const tags = element.tags || {}
    const name = tags.name
    if (!name) continue

    let category = null
    if (tags.office === "coworking" || tags.amenity === "coworking_space") {
      category = ListingType.COWORKING
    } else if (tags.amenity === "cafe") {
      category = ListingType.CAFE
    } else if (tags.tourism === "apartment") {
      category = ListingType.APARTMENT
    } else if (["hostel", "hotel", "guest_house"].includes(tags.tourism)) {
      category = ListingType.COLIVING
    }

    if (!category) continue

    const website = tags.website || tags["contact:website"] || null

    listings.push({
      name,
      category,
      website,
      description: tags.description || null,
    })
  }

  const unique = new Map()
  for (const listing of listings) {
    const key = `${listing.name.toLowerCase()}|${listing.category}`
    if (!unique.has(key)) {
      unique.set(key, listing)
    }
  }

  return [...unique.values()].slice(0, 20)
}

async function upsertDestination(city) {
  const weather = await enrichCityWithWeather(city)

  const name = `${city.name}, ${city.countryName}`
  const slug = slugify(name)

  const destination = await prisma.destination.upsert({
    where: { slug },
    update: {
      name,
      country: city.countryName,
      description: destinationDescription(city),
      weather: weather.climate,
      lifestyle: "Remote-worker friendly",
    },
    create: {
      slug,
      name,
      country: city.countryName,
      description: destinationDescription(city),
      weather: weather.climate,
      lifestyle: "Remote-worker friendly",
    },
  })

  const listings = await fetchListingsForCity(city)

  for (const listing of listings) {
    const listingId = `${destination.id}-${slugify(listing.name)}-${listing.category.toLowerCase()}`

    await prisma.listing.upsert({
      where: { id: listingId },
      update: {
        title: listing.name,
        description: listing.description,
        url: listing.website,
        category: listing.category,
      },
      create: {
        id: listingId,
        title: listing.name,
        description: listing.description,
        url: listing.website,
        category: listing.category,
        destinationId: destination.id,
      },
    })
  }

  return {
    destinationName: name,
    listingsCount: listings.length,
    climate: weather.climate,
  }
}

async function main() {
  console.log("Fetching destination candidates from GeoNames")
  const cities = await fetchGeoNamesCities()
  console.log(`Found ${cities.length} destination candidates`)

  let completed = 0
  for (const city of cities) {
    try {
      const result = await upsertDestination(city)
      completed += 1
      console.log(`[${completed}/${cities.length}] ${result.destinationName} (${result.climate}) with ${result.listingsCount} listings`)
      await sleep(450)
    } catch (error) {
      console.error(`Failed to sync ${city.name}, ${city.countryName}:`, error.message)
    }
  }

  console.log("Open data sync completed")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

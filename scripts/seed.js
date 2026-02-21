/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient, Role, ListingType } = require("@prisma/client")

const prisma = new PrismaClient()

const destinationSeed = [
  {
    slug: "bali-indonesia",
    name: "Bali, Indonesia",
    country: "Indonesia",
    description: "A global nomad hub with strong coworking culture, tropical lifestyle, and established expat networks.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
    wifiSpeed: 45,
    costOfLiving: 1200,
    weather: "Tropical",
    lifestyle: "Surf and coworking",
  },
  {
    slug: "lisbon-portugal",
    name: "Lisbon, Portugal",
    country: "Portugal",
    description: "European base with robust tech scene, walkable neighborhoods, and strong international connectivity.",
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1200",
    wifiSpeed: 85,
    costOfLiving: 2100,
    weather: "Temperate",
    lifestyle: "Startup and city life",
  },
  {
    slug: "chiang-mai-thailand",
    name: "Chiang Mai, Thailand",
    country: "Thailand",
    description: "Budget-friendly base known for stable internet, relaxed pace, and strong digital nomad communities.",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=1200",
    wifiSpeed: 50,
    costOfLiving: 900,
    weather: "Tropical",
    lifestyle: "Slow travel",
  },
  {
    slug: "medellin-colombia",
    name: "Medellin, Colombia",
    country: "Colombia",
    description: "Spring-like climate year-round with emerging remote work ecosystem and strong local culture.",
    imageUrl: "https://images.unsplash.com/photo-1619546952812-520e98064a52?auto=format&fit=crop&q=80&w=1200",
    wifiSpeed: 60,
    costOfLiving: 1100,
    weather: "Temperate",
    lifestyle: "Urban and social",
  },
  {
    slug: "mexico-city",
    name: "Mexico City, Mexico",
    country: "Mexico",
    description: "Dense cultural city with excellent food scene, international airport access, and growing remote worker hubs.",
    imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&q=80&w=1200",
    wifiSpeed: 70,
    costOfLiving: 1800,
    weather: "Temperate",
    lifestyle: "Big city explorer",
  },
]

const articleSeed = [
  {
    slug: "top-5-coworking-spaces-bali",
    title: "Top 5 Coworking Spaces in Bali",
    excerpt: "Discover the most productive spaces across Canggu and Ubud.",
    content: `# Top 5 Coworking Spaces in Bali\n\nBali offers a strong mix of deep work infrastructure and lifestyle flexibility.\n\n## Recommended picks\n\n- BWork in Ubud for quiet focus\n- Tropical Nomad in Canggu for strong events\n- Outpost for distributed teams\n\n## Choosing a space\n\nEvaluate internet stability, meeting room access, and commute time from your stay.`,
    coverImage: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=1200",
    published: true,
    tags: ["Productivity", "Bali"],
  },
  {
    slug: "digital-nomad-visa-guide-2026",
    title: "Complete Guide to Digital Nomad Visas (2026)",
    excerpt: "A practical framework to evaluate visa pathways, taxes, and legal requirements.",
    content: `# Digital Nomad Visa Guide\n\nRegulation varies by country and can shift quickly. Always validate with official government sources.\n\n## Core checklist\n\n1. Minimum income threshold\n2. Allowed employment model\n3. Healthcare and insurance requirements\n4. Tax residency risk\n\nUse this checklist before relocating.`,
    coverImage: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=1200",
    published: true,
    tags: ["Visa", "Legal"],
  },
  {
    slug: "productivity-hacks-remote-work",
    title: "Productivity Hacks for Remote Workers",
    excerpt: "Build routines that preserve focus even while changing locations.",
    content: `# Productivity for Remote Workers\n\nMobility can increase creativity but reduce structure.\n\n## Practices that scale\n\n- Plan weekly priorities every Sunday\n- Use two daily focus blocks\n- Separate exploration time from deep work time\n\nConsistency beats intensity.`,
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200",
    published: true,
    tags: ["Productivity", "Lifestyle"],
  },
]

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@workation.vibe" },
    update: { name: "Demo User", role: Role.USER },
    create: {
      email: "demo@workation.vibe",
      name: "Demo User",
      role: Role.USER,
    },
  })

  const destinationBySlug = {}

  for (const destination of destinationSeed) {
    const created = await prisma.destination.upsert({
      where: { slug: destination.slug },
      update: destination,
      create: destination,
    })

    destinationBySlug[destination.slug] = created.id
  }

  const listingSeed = [
    {
      title: "BWork Ubud",
      description: "Quiet coworking environment with ergonomic setups and meeting rooms.",
      url: "https://example.com/bwork-ubud",
      category: ListingType.COWORKING,
      price: 180,
      destinationId: destinationBySlug["bali-indonesia"],
    },
    {
      title: "Lisbon Downtown Hub",
      description: "Centrally located coworking with reliable fiber and a startup-heavy crowd.",
      url: "https://example.com/lisbon-downtown-hub",
      category: ListingType.COWORKING,
      price: 250,
      destinationId: destinationBySlug["lisbon-portugal"],
    },
  ]

  for (const listing of listingSeed) {
    await prisma.listing.upsert({
      where: {
        id: `${listing.destinationId}-${listing.title.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: listing,
      create: {
        id: `${listing.destinationId}-${listing.title.toLowerCase().replace(/\s+/g, "-")}`,
        ...listing,
      },
    })
  }

  for (const article of articleSeed) {
    const tagConnections = []
    for (const tagName of article.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      })
      tagConnections.push({ id: tag.id })
    }

    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.coverImage,
        published: article.published,
        authorId: demoUser.id,
        tags: {
          set: tagConnections,
        },
      },
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.coverImage,
        published: article.published,
        authorId: demoUser.id,
        tags: {
          connect: tagConnections,
        },
      },
    })
  }

  for (const destinationId of Object.values(destinationBySlug)) {
    await prisma.favorite.upsert({
      where: {
        userId_destinationId: {
          userId: demoUser.id,
          destinationId,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        destinationId,
      },
    })
  }
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

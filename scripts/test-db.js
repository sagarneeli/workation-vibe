/* eslint-disable @typescript-eslint/no-require-imports */
const { Pool } = require("pg")

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

console.log("Testing connection to configured DATABASE_URL")

const pool = new Pool({ connectionString, connectionTimeoutMillis: 2000 })

pool
  .connect()
  .then((client) => {
    console.log("Successfully connected to database")
    client.release()
    pool.end()
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error)
    process.exit(1)
  })

const { Pool } = require('pg');

const connectionString = "postgresql://user:password@localhost:5432/workation_vibe?schema=public";
console.log('Testing connection to:', connectionString);

const pool = new Pool({ connectionString, connectionTimeoutMillis: 2000 });

pool.connect()
    .then(client => {
        console.log('Successfully connected to database!');
        client.release();
        pool.end();
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    });

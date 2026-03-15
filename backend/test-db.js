const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_sSkyXd42iUlr@ep-frosty-rice-a4zm313s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

async function main() {
  try {
    await client.connect();
    console.log('Connected to database successfully');
    await client.end();
  } catch (err) {
    console.error('Connection error', err.stack);
  }
}

main();

const mongoose = require('mongoose');
const dns = require('dns');

function configureDnsServers() {
  const rawServers = process.env.DNS_SERVERS;

  if (!rawServers) {
    return;
  }

  const servers = rawServers
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (!servers.length) {
    return;
  }

  dns.setServers(servers);
  console.log(`Using custom DNS servers for MongoDB SRV lookup: ${servers.join(', ')}`);
}

async function connectDB() {
  const srvUri = process.env.MONGODB_URI;
  const directUri = process.env.MONGODB_URI_DIRECT;

  if (!srvUri) {
    throw new Error('MONGODB_URI is not set in environment variables.');
  }

  configureDnsServers();

  try {
    await mongoose.connect(srvUri);
    console.log('Connected to MongoDB Atlas');
    return;
  } catch (error) {
    const isSrvError =
      srvUri.startsWith('mongodb+srv://') &&
      error &&
      (error.code === 'ECONNREFUSED' || String(error.message || '').includes('querySrv'));

    if (!isSrvError || !directUri) {
      throw error;
    }

    console.warn('SRV lookup failed. Retrying with MONGODB_URI_DIRECT...');
    await mongoose.connect(directUri);
    console.log('Connected to MongoDB Atlas using direct URI fallback');
  }
}

module.exports = connectDB;

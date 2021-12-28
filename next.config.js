require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['api.deepai.org', 's2.loli.net'],
  },
  env:{
    API_KEY: process.env.API_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY
  }
}
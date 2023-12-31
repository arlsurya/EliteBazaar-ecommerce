/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: 'http://127.0.0.1:3001',
    IMG_BASE_URL:'http://127.0.0.1:3001/api/uploads/',
    localStorage:{
      token: '_token'
    }
   
  },

  images: {
    domains: [
      // image domain configuration 
      "img.etimg.com",
    ],
  },

}

module.exports = nextConfig

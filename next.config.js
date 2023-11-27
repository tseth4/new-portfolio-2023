const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    DATA_BOTPOISON_PUBLIC_KEY: process.env.DATA_BOTPOISON_PUBLIC_KEY,
    FORMSPARK_FORM_ID: process.env.FORMSPARK_FORM_ID,
  }
}

module.exports = nextConfig

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    DATA_BOTPOISON_PUBLIC_KEY: process.env.DATA_BOTPOISON_PUBLIC_KEY,
    FORMSPARK_FORM_ID: process.env.FORMSPARK_FORM_ID,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    GOOGLE_RECAPTCHA_SITE_TEST_KEY: process.env.GOOGLE_RECAPTCHA_SITE_TEST_KEY,
    GOOGLE_RECAPTCHA_SECRET_TEST_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_TEST_KEY,
  }
}

module.exports = nextConfig

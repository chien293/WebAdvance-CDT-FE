/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/SignIn',
        permanent: true,
      },
    ]
  },
}

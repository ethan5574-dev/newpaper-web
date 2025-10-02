module.exports = {
  prod: {
    NEXT_PUBLIC_FE_URL: 'https://tranvanhau.id.vn',
    NEXT_PUBLIC_BE_URL: 'https://api.tranvanhau.id.vn/v1',
    NEXT_PUBLIC_MODE: 'prod',
  },
  dev: {
    NEXT_PUBLIC_FE_URL: 'http://localhost:3000',
    NEXT_PUBLIC_BE_URL: 'http://localhost:3003/v1',
    NEXT_PUBLIC_MODE: 'dev',
  },
};
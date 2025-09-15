module.exports = {
  prod: {
    NEXT_PUBLIC_FE_URL: 'https://rc.dragark.net',
    NEXT_PUBLIC_BE_URL: 'https://api-game.dragark.net',
    NEXT_PUBLIC_RPC_URL: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
    NEXT_PUBLIC_MODE: 'prod',
  },
  dev: {
    NEXT_PUBLIC_FE_URL: 'https://beta.dragark.net',
    NEXT_PUBLIC_BE_URL: 'https://api-game-dev.dragark.net',
    NEXT_PUBLIC_RPC_URL: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
    NEXT_PUBLIC_MODE: 'dev',
  },
};
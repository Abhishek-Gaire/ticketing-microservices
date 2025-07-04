export default {
  webpack(config) {
    return {
      ...config,
      watchOptions: {
        ...(config.watchOptions ?? {}),
        poll: 300,
      },
    };
  },
};

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/analyzer',
      handler: 'analyzer.forwardData',
      config: {
        auth: false, // or true if you require authentication
      },
    },
  ],
};

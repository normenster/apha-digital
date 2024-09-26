module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/validate-token',
      handler: 'auth.validateToken', // Controller method for handling validation
      config: {
        auth: false, // Make it public if needed
      },
    },
  ],
};


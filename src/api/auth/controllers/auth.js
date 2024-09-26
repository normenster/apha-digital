const jwt = require('jsonwebtoken');

module.exports = {
  async validateToken(ctx) {
    const {token} = ctx.request.body;

    if (!token) {
      return ctx.badRequest('Token is missing');
    }

    try {
      // Verify the token
      const secret = strapi.config.get('plugin.users-permissions.jwtSecret'); // Replace with your actual secret key
      const decoded = jwt.verify(token, secret);

      // Return the decoded token payload
      return ctx.send({
        message: 'Token is valid',
        decodedToken: decoded,
      });
    } catch (err) {
      // If the token is invalid or expired, return an error
      return ctx.unauthorized('Invalid or expired token');
    }
  },
};

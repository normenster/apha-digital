const jwt = require('jsonwebtoken');

const BASE_URL = 'https://app.apha-digital.de';

const generateApiToken = async (data) => {
  console.log("#data", data);
  if (data.username && data.password) {
    // Generate a token (JWT or hash-based)
    const secret = strapi.config.get('plugin.users-permissions.jwtSecret'); // Replace with your actual secret key
    console.log(data);
    // JWT Option
    const token = jwt.sign(
      {id: data.id, username: data.username, password: data.password},
      secret,
      {expiresIn: '999 years'} // Adjust token expiration as needed
    );

    // Define the base URL where the token should be appended
    const baseUrl = `${BASE_URL}/verify?token=`; // Replace with your actual base URL

    // Merge the token into the URL
    const tokenUrl = `${baseUrl}${token}`;

    await strapi.query('plugin::users-permissions.user').update({
      where: {id: data.id},
      data: {tokenUrl},
    });

  }
}

const updateApiToken = async (event) => {
  // Check if username or password is being updated
  console.log(event.params);

  const data = event.params.data;
  console.log(data);
  if (data.username || data.password) {
    // Fetch the user's existing data
    const existingUser = await strapi.query('plugin::users-permissions.user').findOne({where: {id: event.params.where.id}});

    // Use the updated data, or fall back to the existing data
    const username = data.username || existingUser.username;
    const password = data.password || existingUser.password;

    // Generate a new token with the updated data
    const secret = strapi.config.get('plugin.users-permissions.jwtSecret'); // Replace with your actual secret key


    // JWT Option
    const token = jwt.sign(
      {username: username, password: password, id: event.params.where.id},
      secret,
      {expiresIn: '999 years'} // Adjust token expiration as needed
    );

    // Define the base URL where the token should be appended
    const baseUrl = `${BASE_URL}/verify?token=`; // Replace with your actual base URL

    // Merge the token into the URL
    const tokenUrl = `${baseUrl}${token}`;

    // Store the new token and tokenUrl in the update data
    data.token = token;
    data.tokenUrl = tokenUrl;
  }
}

module.exports = {
  async afterCreate(event) {
    return generateApiToken(event.result);
  },

  async beforeUpdate(event) {
    return await updateApiToken(event);
  }
};

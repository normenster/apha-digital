const axios = require('axios');
const FormData = require('form-data');

module.exports = {
  async forwardData(ctx) {
    let response = null;
    try {
      // Capture the data sent to Strapi's endpoint
      const receivedData = ctx.request.body;
      const queryParams = ctx.query;
      ctx.send({
        message: 'Data received', response: receivedData
      });

      return false;

      const {audio_file} = ctx.request.files;

      // Create a new FormData object to forward the file
      const formData = new FormData();
      formData.append('audio_file', fs.createReadStream(file.path), file.name);

      // Example of forwarding data to another server
      response = await axios.post('http://aphadigital.th-wildau.de:9000/asr/pipeline', formData, {
        params: queryParams
      });

      // Return the response from the other server
      ctx.send({
        message: 'Data forwarded successfully', response: response.data
      });
    } catch (error) {
      if (error.response) {
        // If the proxied API responded with an error (4xx, 5xx)
        ctx.status = error.response.status;
        ctx.send({
          message: 'Error from the proxied API',
          status: error.response.status,
          data: error.response.data,  // Full error message from the proxied API
          headers: error.response.headers // Optionally include headers from the proxied API
        });
      } else if (error.request) {
        // If no response was received from the proxied API
        ctx.status = 502; // Bad Gateway error
        ctx.send({
          message: 'No response from the proxied API',
          error: error.message,
          request: error.request // The request that was sent
        });
      } else {
        // If the request setup failed or another error occurred
        ctx.status = 500; // Internal Server Error
        ctx.send({
          message: 'Request setup failed',
          error: error.message
        });
      }
    }
  }
};

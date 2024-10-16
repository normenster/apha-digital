const axios = require('axios');

module.exports = {
  async forwardData(ctx) {
    try {
      // Capture the data sent to Strapi's endpoint
      const receivedData = ctx.request.body;
      const queryParams = ctx.query;


      // Example of forwarding data to another server
      const response = await axios.post('http://aphadigital.th-wildau.de:9000/asr/pipeline', receivedData, {params: queryParams});

      // Return the response from the other server
      ctx.send({
        message: 'Data forwarded successfully', response: response.data
      });
    } catch (error) {

      console.log("#error", error);
      ctx.throw(500, error.message);
    }
  }
};

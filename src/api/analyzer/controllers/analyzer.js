const axios = require('axios');

module.exports = {
  async forwardData(ctx) {
    let response = null;
    try {
      // Capture the data sent to Strapi's endpoint
      const receivedData = ctx.request.body;
      const queryParams = ctx.query;


      // Example of forwarding data to another server
      response = await axios.post('http://aphadigital.th-wildau.de:9000/asr/pipeline', receivedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
        },
        params: queryParams
      });

      // Return the response from the other server
      ctx.send({
        message: 'Data forwarded successfully', response: response.data
      });
    } catch (error) {
      ctx.send({message: 'ERROR With Api', response: response, status: error.status, error: error});
    }
  }
};

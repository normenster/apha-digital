const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

module.exports = {
  async forwardData(ctx) {
    let response = null;
    try {
      // Capture the data sent to Strapi's endpoint
      const receivedData = ctx.request.body;
      const queryParams = ctx.query;
      console.log("#files", ctx.request.files);
      const formData = new FormData();
      const fileUrl = fs.createReadStream(ctx.request.files.audio_file.path);
      if (ctx.request.files.audio_file)
        formData.append('audio_file', fileUrl, {contentType: 'audio/wav'});

      const responseNow = await axios.post('http://aphadigital.th-wildau.de:9000/asr/pipeline', formData);
      console.log("#data", responseNow.data);
      ctx.send({
        message: 'Data forwarded successfully finally',
        data: responseNow.data
      });

    } catch (error) {
      console.log(error);
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

// ./src/middlewares/flatten-response.js

module.exports = (config) => {
  return async (ctx, next) => {
    // Call the next middleware or controller logic
    await next();

    // Only process responses where ctx.body has a `data` key
    if (ctx.body && ctx.body.data) {
      const { data } = ctx.body;

      // If `data` is an array, map over it and flatten
      if (Array.isArray(data)) {
        ctx.body.data = data.map(item => ({
          id: item.id,
          ...item.attributes,
        }));
      } else {
        // If `data` is a single object, just flatten it
        ctx.body.data = {
          id: data.id,
          ...data.attributes,
        };
      }
    }
  };
};

module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '100mb',  // Increase size limits if necessary
      jsonLimit: '100mb',
      textLimit: '100mb',
      enableTypes: ['json', 'form', 'text', 'raw'],  // Enable raw body parsing for blobs
      extendTypes: {
        text: ['application/octet-stream'],  // Allow binary blobs
      },
      parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
];

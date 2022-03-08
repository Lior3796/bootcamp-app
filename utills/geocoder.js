const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
    httpAdapter: "https"
};

const geocoder = NodeGeocoder(options);
module.exports = geocoder;

global.SERVER_ERROR = "Server Error";
global.JWT_SECRET = "sassen_cg_jwt_secret_value";
global.JWT_EXPIRY_TIME = Math.floor(Date.now() / 1000) + 60 * 60 * 24; //24h
global.JWT_EXIPRY_THRESHOLD = 60;
// global.public_url = "http://192.168.1.126:9100/"
// global.public_url = "http://whatchat.sarthidigitals.in:9100/";
global.backend_url = "http://192.168.1.126:9200/";
// global.backend_url = "http://whatchat.sarthidigitals.in:9200/";
global.api_key = "cac4f5fb-9ff1-4557-99ac-61a1f209ab64";
global.salt_key = "66b23edd5e7b6fb72c61d78d2610a86771e6bb88";

global.whatsapp_per_token =
  "EAAPHBZBz5HgkBAOEuiKz52sO3FegvJvSQrv8M10wnDovugaWG7DegUZBDDfdEqdbdQbR8kIbN7cRtd6W6iHjXTVTBQQu6YiIg16SHvh6OGoicxG6C7Lc8V5WfnPvoKjYXKf16Pi3YkKIvqf8xQmw81HvC4mYg2JvewHCdcpD8LCsurd1m5BnZBJa7PR3eEHgesc9sKwrAZDZD";

global.whatsapp_version = "v14.0";
global.whatsapp_id = "108866948595067"; // cableguy
// global.whatsapp_id = "107898702076082"; // bjp
// global.whatsapp_id = "110590128482581"; // DL-GTPL

// global.cableguy_cable_promotion_image_id = '605382144381951'
// global.cableguy_pamphlet = '627817982317183'
// global.cableguy_new_pamphlet = '1551779981909886'

//For node version <=6 enable below

//add
// global.async = require('asyncawait/async');
// global.await = require('asyncawait/await');

//package.json

// "pg-promise": "^10.10.1",
// to
// "pg-promise": "^8.0.0",

//add
// "asyncawait": "^1.0.6",

// replace async with async(...) wherever found in project

//For node version > 6 enable below

//remove
// global.async = require('asyncawait/async');
// global.await = require('asyncawait/await');

//package.json

// "pg-promise": "^8.0.0",
// to
// "pg-promise": "^10.10.1",

//remove
// "asyncawait": "^1.0.6",

// replace async(..) with async wherever found in project

// whatsapp birthDay
//   {
//   messaging_product: "whatsapp",
//   to: `91${receiver}`,
//   type: "template",
//   template: {
//     name: "bjp_test_template",
//     language: {
//       code: "en",
//     },
//     components: [
//       {
//         type: "header",
//         parameters: [
//           {
//             type: "text",
//             text: text,
//           },
//         ],
//       },
//     ],
//   },
// }

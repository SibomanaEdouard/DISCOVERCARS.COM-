"use strict";
require('dotenv').config();
const algoliasearch = require("algoliasearch");
const client = algoliasearch(process.env.APP_ID, process.env.ADMIN_KEY);
const index = client.initIndex("rangurura");
module.exports = { client, index };

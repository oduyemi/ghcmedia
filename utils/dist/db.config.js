"use strict";
exports.__esModule = true;
exports.dbConfig = void 0;
var dbName = process.env.DB_NAME || "ghcmediadb";
var dbHost = "127.0.0.1";
var dbPort = 27017;
exports.dbConfig = {
    url: "mongodb://" + dbHost + ":" + dbPort + "/" + dbName
};

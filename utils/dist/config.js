"use strict";
exports.__esModule = true;
exports.getHomeConfig = void 0;
var home_json_1 = require("../config/home.json");
var home = home_json_1["default"];
function getHomeConfig() {
    return home;
}
exports.getHomeConfig = getHomeConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
function getName(target) {
    return target[constants_1.NameProperty] || target.name;
}
exports.getName = getName;

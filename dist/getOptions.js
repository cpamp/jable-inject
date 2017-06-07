"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOptions(options, defaults) {
    if (options != null && typeof options === 'object') {
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                options[key] = options[key] !== void 0 ? options[key] : defaults[key];
            }
        }
        return options;
    }
    return defaults;
}
exports.getOptions = getOptions;

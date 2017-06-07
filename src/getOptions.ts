export function getOptions<T extends Object>(options: T, defaults: T): T {
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
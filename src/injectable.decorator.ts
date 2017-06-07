import "reflect-metadata";
import { InjectProvider } from "./inject.provider";
import { getOptions } from "./getOptions";

/**
 * Decorate an object as Injectable into classes that are decorated as Inject
 * 
 * @export
 * @param {IInjectableOptions} [options={}] Options
 * @returns Decorator
 */
export function Injectable(options: IInjectableOptions = {}) {
    options = getOptions(options, defaultOptions);
    return function(constructor: Function) {
        var inject = InjectProvider.Instance;
        inject.register(<string>options.namespace, (<any>constructor).name, <any>constructor);
    }
}

/**
 * Injectable options
 * 
 * @export
 * @interface IInjectableOptions
 * @property {string} namespace Namespace of the Injectable
 */
export interface IInjectableOptions {
    namespace?: string;
}

const defaultOptions: IInjectableOptions = {
    namespace: ''
}
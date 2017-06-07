import "reflect-metadata";
import { InjectProvider } from "./inject.provider";
import { getOptions } from "./getOptions";
import { ParamTypes } from "./constants";

/**
 * Decorate a class as Inject to be injected with Injectables
 * 
 * @export
 * @param {IInjectOptions} [options={}] Options
 * @returns Decorator
 */
export function Inject(options: IInjectOptions = {}) {
    options = getOptions(options, defaultOptions);
    return function(constructor: Function) {
        var metadata = Reflect.getMetadata(ParamTypes, constructor);
        console.log(metadata);
        var params: string[] = [];
        for (var meta of metadata) {
            params.push(InjectProvider.Instance.get(meta));
        }
        
        var newConstructor = function() {
            return constructor.apply(this, params);
        }
        newConstructor.prototype = Object.create(constructor.prototype);

        return <any>newConstructor;
    }
}

/**
 * Inject options
 * 
 * @export
 * @interface IInjectOptions
 * @property {{[type: string]: string}} namespaced Namespaced dependencies and their namespace
 */
export interface IInjectOptions {
    namespaced?: {[type: string]: string}
}

const defaultOptions: IInjectOptions = {
    namespaced: {}
}
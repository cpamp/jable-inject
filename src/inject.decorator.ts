import "reflect-metadata";
import { InjectProvider } from "./inject.provider";
import { getOptions } from "./getOptions";
import { ParamTypes } from "./constants";
import { getName } from "./getName";

/**
 * Decorate a class as Inject to be injected with Injectables
 * 
 * @export
 * @param {IInjectOptions} [options={}] Options
 * @returns Decorator
 */
export function Inject(options: IInjectOptions = {}) {
    options = getOptions(options, defaultOptions);
    console.log(JSON.stringify(options));
    return function(constructor: Function) {
        var metadata = Reflect.getMetadata(ParamTypes, constructor);
        console.log(metadata);
        var params: string | null[] = [];
        for (var meta of metadata) {
            var key = getName(meta);
            if ((<any>options.exclude)[key] !== true) {
                params.push(InjectProvider.Instance.get(key));
            } else {
                params.push(null);
            }
        }
        
        var newConstructor = function(...args: any[]) {
            console.log(args);
            var newParams = params.slice(0);
            for (var arg of args) {
                for (var i = 0; i < newParams.length; i++) {
                    if (newParams[i] === null) {
                         (<any>newParams)[i] = arg;
                         break;
                    }
                }
            }
            return constructor.apply(this, newParams);
        }
        newConstructor.prototype = Object.create(constructor.prototype);

        Object.defineProperty(newConstructor, 'name', { value: (<any>constructor).name, enumerable: false, writable: false });

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
    namespaced?: {[type: string]: string},
    exclude?: {[type: string]: boolean}
}

const defaultOptions: IInjectOptions = {
    namespaced: {},
    exclude: {
        string: true,
        number: true,
        object: true,
        boolean: true
    }
}
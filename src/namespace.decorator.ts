import "reflect-metadata";
import { ParamTypes, NameProperty } from "./constants";

export function Namespace(namespace: string = '') {
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let types: Function[] = Reflect.getOwnMetadata(ParamTypes, target, propertyKey);
        Object.defineProperty(types[parameterIndex], NameProperty, {
            enumerable: false,
            writable: false,
            value: namespace + '.' + (<any>types[parameterIndex]).name
        })
        Reflect.defineMetadata(ParamTypes, types, target, propertyKey);
    }
}
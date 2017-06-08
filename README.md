# js-injectable

Decore classes as Injectable to be injected into or injectable into other class constructors.

## Options

```typescript
/**
 * Injectable options
 * 
 * @export
 * @interface IInjectableOptions
 * @property {string} namespace Namespace of the Injectable
 * @property {{[type: string]: boolean}} exclude Excluded namespaced types, true to exclude
 * @property {boolean} inject Whether or not the class should have injectables injected into it
 */
export interface IInjectableOptions {
    namespace?: string;
    exclude?: {[type: string]: boolean};
    inject?: boolean;
}

const defaultOptions: IInjectableOptions = {
    namespace: '',
    exclude: {
        String: true,
        Number: true,
        Object: true,
        Array: true,
        Boolean: true
    },
    inject: true
}
```
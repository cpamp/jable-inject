export class InjectProvider {
    private static _instance: InjectProvider;

    private injectables: IInstanceMap = {};

    private constructor() { }

    /**
     * Instance of InjectProvider
     * 
     * @readonly
     * @static
     * @type {InjectProvider}
     * @memberOf InjectProvider
     */
    public static get Instance(): InjectProvider {
        return this._instance || (this._instance = new this());
    }

    /**
     * Get an instance of an injectable
     * 
     * @param {Function} namespacedInstance Namespaced instance to get
     * @returns Instance of injectable or null
     * 
     * @memberOf InjectProvider
     */
    public get(namespacedInstance: string) {
        if (this.injectables[namespacedInstance] != null) {
            if (typeof this.injectables[namespacedInstance] === 'function') {
                return this.injectables[namespacedInstance] = new (this.injectables[namespacedInstance])();
            }
            return this.injectables[namespacedInstance];
        }
        return null;
    }

    /**
     * Register an injectable
     * 
     * @template T Type of injectable
     * @param {string} namespace Namespace of the injectable
     * @param {string} name Name of the injectable
     * @param {{new(...args: any[]): T}} instanceType Instance type to create
     * 
     * @memberOf InjectProvider
     */
    public register<T extends Function>(namespace: string, name: string, instanceType: {new(...args: any[]): T}) {
        namespace = (namespace !== '' ? namespace + '.' : '');
        name = namespace + name;
        if (this.injectables[name] == null) {
            this.injectables[name] = instanceType;
        }
    }
}

export interface IInstanceMap {
    [key: string]: {new(...args: any[]): any} | any
}
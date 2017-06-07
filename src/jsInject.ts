
export class JsInject {
    public static inject<T>(newType: {new(...args: any[]): T}, ...args: any[]): T {
        var result: T = new (<any>newType)(...args);
        return result;
    }
}
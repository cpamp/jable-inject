import { Inject } from "./inject.decorator";
import { Injectable } from "./injectable.decorator";
import { Foo as DupeFoo } from "./test";
import { Namespace } from "./namespace.decorator";

@Injectable({
    namespace: 'New.Foo'
})
class Foo {
    constructor(public hello: string = 'world') { }
}

@Inject()
class Injecting {
    constructor(public foo: DupeFoo, @Namespace('New.Foo') public foo2: Foo) { }
}

var inj: Injecting = new (<any>Injecting)();
console.log(inj.foo.p1);
console.log(inj.foo2.hello);
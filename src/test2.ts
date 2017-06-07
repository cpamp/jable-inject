import { Inject } from "./inject.decorator";
import { Injectable } from "./injectable.decorator";
import { Foo as DupeFoo } from "./test";
import { Namespace } from "./namespace.decorator";
import { JsInject } from "./jsInject";

@Injectable({
    namespace: 'New.Foo'
})
class Foo {
    constructor(public hello: string = 'world') { }
}

@Inject({
    exclude:{
        Foo: true
    }
})
class Injecting {
    constructor(public foo: DupeFoo, @Namespace('New.Foo') public foo2: Foo, public test: string) { }
}

var inj: Injecting = new (<any>Injecting)(new DupeFoo("Goodbye"), "string");
console.log(inj.foo.p1);
console.log(inj.foo2.hello);
console.log(inj.test);

var inj2 = JsInject.inject(Injecting, new DupeFoo("hello"), "goodbye");
console.log(inj2.foo.p1);
console.log(inj2.foo2.hello);
console.log(inj2.test);
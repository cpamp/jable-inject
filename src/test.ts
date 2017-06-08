import { Injectable } from "./injectable.decorator";
import { Inject } from "./inject.decorator";


@Injectable({namespace: "BooBoo"})
export class Bar {
    constructor(public p1: string = "bye") {}
}

@Injectable()
@Inject()
export class Foo {
    constructor(public prop: string = "myProp", public foo2: Bar) {}
}

@Inject()
@Injectable()
export class FinalInject {
    constructor(public foo: Foo) { }
}

@Inject({
    exclude: { 'Boo.Bar': true }
})
class Injecting {
    constructor(public foo: FinalInject, public bar: Bar) {

    }
}

var inj: Injecting = new (<any>Injecting)()
console.log(inj.foo.foo.foo2.p1);
inj.foo.foo.foo2.p1 = "hi";

var inj2: Injecting = new (<any>Injecting)(new Bar());
console.log(inj2.foo.foo.foo2.p1);
console.log(inj2.bar.p1);
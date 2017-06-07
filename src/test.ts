import { Injectable } from "./injectable.decorator";
import { Inject } from "./inject.decorator";

@Injectable()
export class Foo {
    constructor(public p1: string = "hi") {}
}

@Injectable()
export class Foo2 {
    constructor(public p1: string = "bye") {}
}

@Inject()
class Injecting {
    constructor(public foo: Foo) { }
}

var inj: Injecting = new (<any>Injecting)();
inj.foo.p1 = "sup";
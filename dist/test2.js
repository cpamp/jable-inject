"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inject_decorator_1 = require("./inject.decorator");
var injectable_decorator_1 = require("./injectable.decorator");
var test_1 = require("./test");
var namespace_decorator_1 = require("./namespace.decorator");
var Foo = (function () {
    function Foo(hello) {
        if (hello === void 0) { hello = 'world'; }
        this.hello = hello;
    }
    return Foo;
}());
Foo = __decorate([
    injectable_decorator_1.Injectable({
        namespace: 'New.Foo'
    }),
    __metadata("design:paramtypes", [String])
], Foo);
var Injecting = (function () {
    function Injecting(foo, foo2) {
        this.foo = foo;
        this.foo2 = foo2;
    }
    return Injecting;
}());
Injecting = __decorate([
    inject_decorator_1.Inject(),
    __param(1, namespace_decorator_1.Namespace('New.Foo')),
    __metadata("design:paramtypes", [test_1.Foo, Foo])
], Injecting);
var inj = new Injecting();
console.log(inj.foo.p1);
console.log(inj.foo2.hello);

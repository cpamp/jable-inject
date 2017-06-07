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
Object.defineProperty(exports, "__esModule", { value: true });
var injectable_decorator_1 = require("./injectable.decorator");
var inject_decorator_1 = require("./inject.decorator");
var Foo = (function () {
    function Foo(p1) {
        if (p1 === void 0) { p1 = "hi"; }
        this.p1 = p1;
    }
    return Foo;
}());
Foo = __decorate([
    injectable_decorator_1.Injectable(),
    __metadata("design:paramtypes", [String])
], Foo);
exports.Foo = Foo;
var Foo2 = (function () {
    function Foo2(p1) {
        if (p1 === void 0) { p1 = "bye"; }
        this.p1 = p1;
    }
    return Foo2;
}());
Foo2 = __decorate([
    injectable_decorator_1.Injectable(),
    __metadata("design:paramtypes", [String])
], Foo2);
exports.Foo2 = Foo2;
var Injecting = (function () {
    function Injecting(foo) {
        this.foo = foo;
    }
    return Injecting;
}());
Injecting = __decorate([
    inject_decorator_1.Inject(),
    __metadata("design:paramtypes", [Foo])
], Injecting);
var inj = new Injecting();
inj.foo.p1 = "sup";

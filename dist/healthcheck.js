"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//------------- imports --------------------
const Router = require("koa-router");
// making a new instance of router 
const router = new Router();
//------------------- endpoint -----------------------------------------
//adding slass routesand slash endpoint whihch will accept get request. when a request comes in on that endpoint 
//we're gonna get a resonce with the status of success with a 200 status code. In order to send something back need 
//access to the context object (ctx.body)
router.get('/user', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.body = {
            status: 'success',
            data: 'pong',
        };
        console.log(ctx.request.query);
    }
    catch (e) {
        console.error(e);
    }
}));
router.get('/user/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.body = {
            status: 'success',
            data: 'pong',
        };
        console.log(ctx.params);
    }
    catch (e) {
        console.error(e);
    }
}));
// exporting it to a diffrent file if needed 
exports.default = router.routes();

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
const healthcheck = new Router();
//-------------- Endpoint ------------------------ 
// router.get('/', function getInfo(ctx,next){
//     try{
//         console.log(Object.keys(ctx));
//         console.log(Object.keys(ctx.state));
//         const [[cars]] = await ctx.state.db.query(
//         `SELECT * FROM car WHERE user_id = :user_id`,
//             {
//                 //user_id: req.user.userId
//                 user_id: ctx.params.user_Id
//             }
//         )
//         console.log('/user-cars',cars);
//     }   catch (e){
//         console.error(e);
//     }
// });
healthcheck.get('/', function getInfo(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(Object.keys(ctx));
        console.log(Object.keys(ctx.state));
        try {
            const [[cars]] = yield ctx.state.db.query(`SELECT * FROM car WHERE id = :id`, { id: 2 });
            console.log('/user-cars', cars);
            ctx.response.body = cars;
        }
        catch (e) {
            console.error(e);
        }
    });
});
// exporting it to a diffrent file if needed 
exports.default = healthcheck;

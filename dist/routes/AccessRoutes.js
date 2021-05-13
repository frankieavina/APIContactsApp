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
//----------------------------------------------- Endpoint -------------------------------------- 
// ---------------------------------------HTTP request methods------------------------------------
//------------------------------ post with values set in the body -----------
//post method is used to submit an entity to the specified resource (list)
router.post('/', function getInfo(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cars = yield ctx.state.db.query(`INSERT INTO car ( make, model, url)
         VALUES ( :make, :model, :url)`, {
                //id: ctx.request.body.id,
                make: ctx.request.body.make,
                model: ctx.request.body.model,
                url: ctx.request.body.url
            });
            ctx.body = cars;
        }
        catch (e) {
            console.error(e);
        }
    });
});
//----------------- put by ctx body -----------
//method replaces all current representations of the target resource with the request (particular)--
router.put('/', function getInfo(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cars = yield ctx.state.db.query(`UPDATE car SET make=:make, model=:model, url=:url 
         WHERE (id = :id)`, {
                id: ctx.request.body.id,
                model: ctx.request.body.model,
                make: ctx.request.body.make,
                url: ctx.request.body.url
            });
            ctx.body = cars;
        }
        catch (e) {
            console.error(e);
        }
    });
});
//------------- get ----------------------
router.get('/:id', function getInfo(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [[cars]] = yield ctx.state.db.query(`SELECT * FROM car WHERE id = :id`, { id: ctx.params.id });
            console.log(ctx.request.query);
            ctx.response.body = cars;
        }
        catch (e) {
            console.error(e);
        }
    });
});
//------------- get all cars ----------------------
router.get('/', function getInfo(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [cars] = yield ctx.state.db.query(`SELECT * FROM car`);
            console.log(ctx.request.query);
            ctx.response.body = cars;
        }
        catch (e) {
            console.error(e);
        }
    });
});
//------------------- delete through values set in params -------------------
router.delete('/:id', function (ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [cars] = yield ctx.state.db.query(`DELETE FROM car WHERE id = :id`, { id: ctx.params.id });
        ctx.response.body = cars;
    });
});
// exporting it to a diffrent file if needed 
//export default healthcheck; 
exports.default = router.routes();

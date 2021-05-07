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
// ---------- all my imports statements -----------------
const Koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
// since its a default need the {}
const config_1 = require("./config");
const mysql = require("mysql2/promise");
const cors = require("koa2-cors");
//used to design routes for the APIs. Each route will allow us to hit an endpoint 
//that corresponds to one of these methods(GET/PUT/POST/DELETE)
const Router = require("koa-router");
const AccessRoutes_1 = require("./routes/AccessRoutes");
//----- create a new koa application and creating a new instance of our router -----------
const app = new Koa();
const router = new Router();
//-------- tell KOA what port to run in ------------------
const PORT = config_1.config.port;
// Create a MySQL connection pool (do this once)
// const pool = mysql.createPool({ 
//     user: 'root', password: 'B3Careful', 
//     database: 'car_data', host: 'localhost' 
// });
// ------------import load the .env file --------------
require('dotenv').config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
//---------------------------------------- middleware --------------------------------------
//--------- Establish MySQL Connctiont------------------
app.use(function mysqlConnection(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            ctx.state.db = yield pool.getConnection();
            ctx.state.db.connection.config.namedPlaceholders = true;
            // Traditional mode ensures not null is respected for unsupplied fields
            yield ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');
            //await ctx.state.db.query(`SET time_zone = '-8:00'`);
            yield next();
            ctx.state.db.release();
        }
        catch (e) {
            if (ctx.state.db)
                ctx.state.db.release();
            throw (e);
        }
    });
});
// bodyparser allows us get access to te info thats been sent in on a request in JSON format 
// logger allows us to view our output on the terminal as stuff comes in and gets out
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(cors());
//---------------------------using the endpoints----------------------------------------------
app.use(router.routes());
app.use(AccessRoutes_1.default);
// listeing to the port specified and log the port its listening to and in the event theres an error throw error
const server = app
    .listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server listening on port: ${PORT}`);
}))
    .on("error", err => {
    console.error(err);
});
/*
export default router.routes()
//at end of healthcheck.ts
import AccessRoutes from './routes/access';
//in your index or app.ts
app.use(AccessRoutes);
//use in the middleware
*/
exports.default = server;

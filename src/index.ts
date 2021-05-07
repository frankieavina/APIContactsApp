// ---------- all my imports statements -----------------
import * as Koa from "koa";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
// since its a default need the {}
import { config } from "./config"
import * as mysql from "mysql2/promise";
import * as cors from "koa2-cors";
import myUserRoutes from "./routes/AccessRoutes";
//used to design routes for the APIs. Each route will allow us to hit an endpoint 
//that corresponds to one of these methods(GET/PUT/POST/DELETE)
import * as Router from "koa-router"; 
import AccessRoutes from "./routes/AccessRoutes";

//----- create a new koa application and creating a new instance of our router -----------
const app = new Koa();
const router = new Router(); 

//-------- tell KOA what port to run in ------------------
const PORT = config.port; 

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
app.use(async function mysqlConnection(ctx, next) {
    try{
        ctx.state.db =  await pool.getConnection();
        ctx.state.db.connection.config.namedPlaceholders = true;
    
        // Traditional mode ensures not null is respected for unsupplied fields
        await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');
        //await ctx.state.db.query(`SET time_zone = '-8:00'`);
    
        await next();
    
        ctx.state.db.release();
    } catch (e){
        if(ctx.state.db) ctx.state.db.release();
        throw (e);
    }  
})

// bodyparser allows us get access to te info thats been sent in on a request in JSON format 
// logger allows us to view our output on the terminal as stuff comes in and gets out
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(cors());


//---------------------------using the endpoints----------------------------------------------
app.use(router.routes());
app.use(AccessRoutes);


// listeing to the port specified and log the port its listening to and in the event theres an error throw error
const server = app
    .listen(PORT, async() => {
        console.log(`Server listening on port: ${PORT}`);
    })
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


export default server; 
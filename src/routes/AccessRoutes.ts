//------------- imports --------------------
import * as Router from "koa-router";

// making a new instance of router 
const router = new Router(); 

//----------------------------------------------- Endpoint -------------------------------------- 
// ---------------------------------------HTTP request methods------------------------------------

//------------------------------ post with values set in the body -----------
//post method is used to submit an entity to the specified resource (list)
router.post('/', async function getInfo(ctx,next){


    try{
        const cars = await ctx.state.db.query(
        `INSERT INTO car ( make, model, url)
         VALUES ( :make, :model, :url)`,
            {
                //id: ctx.request.body.id,
                make: ctx.request.body.make,
                model: ctx.request.body.model,
                url: ctx.request.body.url
            }

        );
        ctx.body = cars; 
    }   catch (e){
        console.error(e);
    }
});

//----------------- put by ctx body -----------
//method replaces all current representations of the target resource with the request (particular)--
router.put('/', async function getInfo(ctx,next){


    try{
        const cars = await ctx.state.db.query(
        `UPDATE car SET make=:make, model=:model, url=:url 
         WHERE (id = :id)`
        , {
                id: ctx.request.body.id,
                model: ctx.request.body.model,
                make: ctx.request.body.make,
                url: ctx.request.body.url
            }
        );
        ctx.body = cars;
    }   catch (e){
        console.error(e);
    }
});

//------------- get ----------------------
router.get('/:id', async function getInfo(ctx,next){


try{
    const [[cars]] = await ctx.state.db.query(`SELECT * FROM car WHERE id = :id`,{id: ctx.params.id});
    console.log(ctx.request.query);
    ctx.response.body = cars; 
}   catch (e){
        console.error(e);
    }

});

//------------- get all cars ----------------------
router.get('/', async function getInfo(ctx,next){


try{
    const [cars] = await ctx.state.db.query(`SELECT * FROM car`);
    console.log(ctx.request.query);
    ctx.response.body = cars; 
}   catch (e){
        console.error(e);
    }

});

//------------------- delete through values set in params -------------------
router.delete('/:id', async function (ctx) {

        const [cars] = await ctx.state.db.query(`DELETE FROM car WHERE id = :id`,{id: ctx.params.id});
       
        ctx.response.body = cars; 
      
});


// exporting it to a diffrent file if needed 
//export default healthcheck; 
export default router.routes()
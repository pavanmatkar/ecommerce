//import modules
import * as express from "express";
import * as mongodb from "mongodb";
import * as cors from "cors";
import * as bodyparser from "body-parser"; 
import obj from "./config/config";
import getConnection from "./db/db_config";
// create the rest object
let app:any = express();
//where "app" object, used to develop the rest services, GET,POST, PUT, DELETE...
//enable the cors policy 
app.use(cors());
//set the json as MIME Type
app.use(bodyparser.json());
//parse the json
app.use(bodyparser.urlencoded({extended:false}));
//create the get request 
app.get("/api/products",(req:any,res:any)=>{
    getConnection().then((conn:any)=>{
        let db:any = conn.db("mern");
        db.collection("products").find().toArray((err:any,array:any)=>{
            if(err) throw err;
            else{
                res.send(array); 
            }
        });
    });
});
//get the product based on id
app.get("/api/products/:id",(req:any,res:any)=>{
    getConnection().then((conn:any)=>{
        let db:any = conn.db("mern");
        try{
            db.collection("products").find({"_id":new obj.ObjectId(req.params.id)}).toArray((err:any,array:any)=>{
                if(err) throw err;
                else{
                    if(array.length>0){
                        res.send(array[0]);
                    }else{
                        res.send({message:"product not available"});
                    }
                }
            });
        }catch(error){
            res.send({message:"invalid key"});
        }
    });
});
//port
let port:any = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started successfully");
});

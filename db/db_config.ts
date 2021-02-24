const db_password:string = `admin`;
const db_name:string = `mern`;
let db_collection:string = `products`;
const db_url:string = `mongodb+srv://admin:${db_password}@miniprojectdb.nzphu.mongodb.net/${db_name}?retryWrites=true&w=majority`;
import obj from "../config/config";

export default function getConnection(){
    try{
        return obj.mernClient.connect(db_url);
    }catch(error){
        console.log(error);
    }
};
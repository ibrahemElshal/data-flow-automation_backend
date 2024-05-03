const mongoose =require('mongoose');
const dbConnection=async ()=>{
    try{
    const con =await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB connected :${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports=dbConnection;
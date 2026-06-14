const mongoose=require("mongoose")
const jobSchema=new mongoose.Schema({
    company:String,
    status:String,
    date:{type:Date, default: Date.now}
})
const Job=mongoose.model("Job",jobSchema)
module.exports=Job
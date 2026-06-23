const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const Job=require("./job")
require("dotenv").config()

const app=express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MongoDB is connected"))
  .catch((err)=> console.log("Error",err))

app.get("/jobs", async(req,res) => {
    const jobs=await Job.find()
    res.json(jobs)
})
app.post("/jobs", async(req,res) => {
    const job=await Job.create(req.body)
    res.json(job)
})
app.delete("/jobs/:id", async(req,res)=>{
    await Job.findByIdAndDelete(req.params.id)
    res.json({message:"Job deleted"})
})
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})
app.put("/jobs/:id", async(req,res)=>{
    const updatedJob=await Job.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!updatedJob) return res.status(404).json({message:"Job not found"})
    res.json(updatedJob)
})

app.listen(process.env.PORT,() => {
    console.log("server is running on port 5000")
})
import cors from "cors";
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan  from "morgan"
import routes from './routes/index.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))
app.use(morgan("dev"))
// add db connection
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Mongo DB is connected")
}).catch((err)=>{
    console.log("Mongo DB is not connected ", err)
})
app.use(express.json())

app.get("/",async (request,response)=>{
    response.status(200).json({
        message:"Welcome to Haitham API"
    })
})


app.use('/api-v1',routes)

// error not found
app.use((request,response,next)=>{
    response.status(404).json({
        message:"API Endpoint Not Found"
    })
})


// error middleware 
app.use((error,request,response,next)=>{
    console.error(error.stack)
    response.status(error.status).json(error.message||"Internal Server Error")
})
    

app.listen(PORT,()=>{
    console.log("server is running on port ", PORT)
})


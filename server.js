import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
import seedAdmin from './seedAdmin.js'

const app =express()
await connectDB();
app.use(express.json())
app.use(cors())

// await seedAdmin();




app.get('/',(req,res)=>{
    res.send("app is working")
})

app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)

const PORT = process.env.PORT||2000;

app.listen(PORT,(req,res)=>{
     console.log('server is running on',PORT)
})
 

 





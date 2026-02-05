import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
// import seedAdmin from './seedAdmin.js'
import videoRouter from'./routes/videoRoutes.js'

const app =express()
await connectDB();
app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: true }))
app.use(cors())

// Set timeout for large uploads
app.use((req, res, next) => {
  req.setTimeout(10 * 60 * 1000); // 10 minutes
  res.setTimeout(10 * 60 * 1000); // 10 minutes
  next();
})

// await seedAdmin();




app.get('/',(req,res)=>{
    res.send("app is  fantastically working")
})

app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)
app.use('/api/video',videoRouter)

const PORT = process.env.PORT||2000;


app.listen(PORT,()=>{
    console.log('server  is fantastically runing on '+ PORT)
})

 
export default app;




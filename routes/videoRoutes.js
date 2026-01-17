import express from 'express';
import{getAllVideos,getVideoById} from '../controllers/videoController.js'



const videoRouter = express.Router();


videoRouter.get('/all',getAllVideos)
videoRouter.post('/:videoId',getVideoById)



export default videoRouter
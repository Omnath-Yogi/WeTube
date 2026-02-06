import express from 'express';
import{getAllVideos,getVideoById, videosByArray,historyVideosByArray, viewIncrement} from '../controllers/videoController.js'



const videoRouter = express.Router();


videoRouter.get('/all',getAllVideos)
videoRouter.get('/:videoId',getVideoById)
videoRouter.post('/videoBy-Ids',videosByArray)
videoRouter.post('/historyVideoBy-Ids',historyVideosByArray)
videoRouter.post('/viewInc',viewIncrement)



export default videoRouter
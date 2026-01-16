import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
     video:{type:mongoose.Schema.Types.ObjectId, ref:'Video',
        required:true},
        name:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        content : {type:String, required:true},
        
    
},{timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const postSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likesCount:{
        type:Number,
        default:0,
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref: 'User',
    }],
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Post = model('Post', postSchema);
export default Post;
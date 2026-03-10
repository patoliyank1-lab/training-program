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
        required: true,
    },
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
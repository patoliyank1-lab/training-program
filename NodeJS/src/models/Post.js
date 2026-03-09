import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,

    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const user = model('Post', postSchema);
export default user;
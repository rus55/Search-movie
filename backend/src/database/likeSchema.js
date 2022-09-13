//для создания лайков
import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema({
        id: {
            type: mongoose.Schema.Types.String,
            default: uuid.v4,
        },
        postId: {
            type: mongoose.Schema.Types.String,
            required: true,
        },

        authorId: {
            type: mongoose.Schema.Types.String,
            required: true,
        },

    },
    {
        timestamps: true
    })
export default schema;
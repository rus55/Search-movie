import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.String,
        default: uuid.v4,
    },
    moviename: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    year: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    poster: {
        type: mongoose.Schema.Types.String,
        required: false,
    }
},
{
    timestamps: true
})
export default schema;
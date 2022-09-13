import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema(
    {
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        token: {
            type: mongoose.Schema.Types.String,
            default: uuid.v4,
        },
        id: {
            type: mongoose.Schema.Types.String,
            default: uuid.v4,
        },
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        surname: {
            type: mongoose.Schema.Types.String,
            required: false,
        },
        aboutMyself: {
            type: mongoose.Schema.Types.String,
            required: false,
        }
    },
    {
        timestamps: true //дата создания пользователя
    }
);

export default schema;
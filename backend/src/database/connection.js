import userSchema from './userSchema.js';
import movieSchema from './movieSchema.js';
import commentSchema from './commentSchema.js';
import likeSchema from './likeSchema.js';
import mongoose from 'mongoose';

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;//
const dbName = 'MoviesSearch'

const uri = `mongodb://${host}:${port}/${dbName}`;

mongoose.connect(uri, { useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', (err) => {
    console.error('произошла ошибка при подключении к Монге', err);
});

db.once('open', () => {
    console.log('успешно подключились к Монге');
});

const user = mongoose.model('user', userSchema);

const movie = mongoose.model('movie', movieSchema);

const comment = mongoose.model('comment', commentSchema);

const like = mongoose.model('like', likeSchema);

export default {
    movie,
    user,
    comment,
    like,
}

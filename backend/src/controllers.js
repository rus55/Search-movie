import { generateHash ,getUserToken } from './helpers.js';
import database from './database/connection.js';
import Boom from "@hapi/boom";

export default {
    login: async (req, h) => {
        try {
            let foundUser = await database.user.findOne({ email: req.payload.email, password: generateHash(req.payload.password)});
            console.log('user in login ',foundUser);
            const isValid = process.env.ADMIN_TOKEN === foundUser.token;
            foundUser.isAdmin = isValid;
            return foundUser;

        } catch (e) {
            console.log(e);
            return 'ошибка'
        }
    },
    register: async (request, h) => {
        try {
            const { email, password, ...restFields } = request.payload;
            const alreadyRegistered = await database.user.findOne({ email });
            if (alreadyRegistered) {
                return Boom.badRequest('Данный email уже занят, попробуйте другой');
        }
        const passwordHash = generateHash(password);
        const result = await database.user.create({
            email,
            ...restFields,
            password: passwordHash,
        });

        return result;

    } catch (e) {
        console.log(e);
        return Boom.badImplementation('Произошла ошибка при регистрации пользователя, попробуйте позднее ' + e.message);
    }
},
    getUserInfo: (req, h) => {
        try {
    console.log(req.params);
    return {
        name: 'Вася',
        surname: 'Пупкин'
    };} catch (e) {
            console.log(e);
            return Boom.badRequest('Ошибка при получении информации о пользователе');
        }
},
     hello: (request, h) => {
    const userName = request.query.name || 'Гость';
    const age = request.query.age || 'Не родился еще';
    console.log(request.query);

    return `Привет, ${userName}, я сервер. Как у тебя дела? Тебе ${age} лет`;
},
    deleteUser: async (request, h) => {
        try {
            const user = request.auth.credentials;
            const token = user.token;
            await database.user.deleteOne({token});
            const result = await database.user.find();
            return result;
        } catch(e){
            console.log(e);
            return Boom.badRequest('Произошла ошибка при удалении пользователя');
        }
    },
    getUsers: async (request, h) => {
        try {
           const result = await database.user.find();
           return result;
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при загрузке пользователей');
        }
    },
    editUser: async (request, h) => {
        try {
            const user = request.auth.credentials;
            const token = user.token;
            let editUser = {};
            if (request.payload.password) {
                const passwordHash = generateHash(request.payload.password);
                editUser['password'] = passwordHash;
            }
            if (request.payload.name){
                editUser['name'] = request.payload.name;
            }
            if (request.payload.surname){
                editUser['surname'] = request.payload.surname;
            }
            if (request.payload.aboutMyself){
                editUser['aboutMyself'] = request.payload.aboutMyself;
            }
            const result = await database.user.updateOne({
                token
            }, editUser);

            const users = await database.user.find();
            return users;
    } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при обновлении');
        }
    },
    addMovie: async (request, h) => {
        try {
            const moviename = request.payload.moviename;
            const description = request.payload.description;
            // const user = await getUserToken(token);
            // const authorName = request.payload.authorName;
            const result = await database.movie.create({
                moviename: moviename,
                description: description,
                year: request.payload.year,
                poster: request.payload.poster,
                type: request.payload.type
                //authorId : user.id,
                //authorName : user.name,

            });
            console.log(result);
            const movies = await database.movie.find().sort('-createdAt');
            return movies;
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при добавлении');
        }
    },
    getMovies: async (request, h) => {
        try {
            const result = await database.movie.find().sort('-createdAt');
            console.log(result);
            return result;
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при загрузке фильмов');
        }
    },
    deleteMovie: async (request, h) => {
        try {
            const postId = request.payload.postId;
            await database.post.deleteOne({id: postId});
            const posts = await database.post.find().sort('-createdAt');
            return posts;
        }  catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при удалении поста');
        }
    },
    editMovie: async (request, h) => {
        try {
            const postId = request.payload.postId;
            const newTitle = request.payload.title;
            const newText = request.payload.text;
            const result = await database.post.updateOne({
            id: postId
            }, {title: newTitle, text: newText});
            console.log(result);
            const posts = await database.post.find().sort('-createdAt');
            return posts;
        }  catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при редактировании поста');
        }
    },
    getMovie: async (request, h) => {
        try {
            console.log(request.payload);
            const movieId = request.payload.MovieId;
            const result = await database.movie.findOne({id: movieId});
            return result;
        }  catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при получении поста');
        }
    },
    search: async (request, h) => {
        try {
            const string = request.payload.searchString;
            const yearFrom = request.payload.yearFrom;
            const yearTo = request.payload.yearTo;
            const type = request.payload.type;
            const searchString = new RegExp(string ,'i');
            const result = await database.movie.find({
                moviename: searchString
            });
            return result;
        }  catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при поиске');
        }
    },
    getComments: async (request, h) => {
        try {
            const postId = request.payload.postId;
            const result = await database.comment.find({postId}).sort('-createdAt');
            return result;
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при загрузке комментариев');
        }
    },
    commentsCount: async (request, h)=> {
        try {
            const posts = await database.post.find();
            const comments = await database.comment.find();
            const commentsCount  = posts.reduce((prValue, post) => {
                const count = comments.reduce((previousValue, comment) => {
                    return comment.postId == post.id ? previousValue+1 : previousValue;
                }, 0);
                prValue[post.id]=count;
                return prValue;
            },{});

            return commentsCount;
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при подсчете комментариев');
        }
    },
    addComment: async (request, h) => {
        try {
            const user = request.auth.credentials;
            const token = user.token;
            const userInfo = await database.user.findOne({token});
            const postId = request.payload.postId;
            const text = request.payload.text;
            const authorId = userInfo.id;
            const authorName = userInfo.name;
            const result = await database.comment.create({
                postId,
                text,
                authorId,
                authorName,
            });
            return 'Комментарий успешно добавлен';
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при добавлении комментария');
        }
    },
    deleteComment: async (request, h) => {
        try {
            const commentId = request.payload.commentId;
            await database.comment.deleteOne({id: commentId});

            return 'Коментарий успешно удален';
        }  catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при удалении комментария');
        }
    },
    editComment: async (request, h) => {
        try {
            const commentId = request.payload.commentId;
            const newText = request.payload.text;
            const result = await database.comment.updateOne({
                id: commentId
            }, {text: newText});
            return 'Редактирование комментария произошло успешно';
        }  catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при редактировании комментария');
        }
    },
    likesCount: async (req, h) => {
        try {
            const posts = await database.post.find();
            const likes = await database.like.find();
            const likesCount  = posts.reduce((prValue, post) => {
                const count = likes.reduce((previousValue, like) => {
                    return like.postId == post.id ? previousValue+1 : previousValue;
                }, 0);
                prValue[post.id]=count;
                return prValue;
            },{});

            return likesCount;
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при подсчете комментариев');
        }
    },
    getLikes: async (request, h) => {
        try {
            const user = request.auth.credentials;
            const token = user.token;
            const userInfo = await database.user.findOne({token});
            const authorId = userInfo.id;
            const posts = await database.post.find();
            const likes = await database.like.find();
            const likesCount  = posts.reduce((prValue, post) => {
                const flag = likes.reduce((previousValue, like) => {
                    return (like.postId == post.id && like.authorId == authorId) ? true : false;
                }, false);
                prValue[post.id]=flag;
                return prValue;
            },{});

            return likesCount;
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при загрузке лайков');
        }
    },

    addLike: async (request, h) => {
        try {
            const postId = request.payload.postId;
            const user = request.auth.credentials;
            const token = user.token;
            const userInfo = await database.user.findOne({token});
            const authorId = userInfo.id;
            const result = await database.like.create({
                postId,
                authorId,
            });
            return 'Лайк успешно добавлен';
        } catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при добавлении лайка');
        }
    },
    deleteLike: async (request, h) => {
        try {
            const token = request.auth.credentials.token;
            const userInfo = await database.user.findOne({token});
            const authorId = userInfo.id;
            const postId = request.payload.postId;
            await database.like.deleteOne({postId: postId, authorId: authorId});
            return 'Лайк успешно удален';
        }  catch (e) {
            console.log(e);
            return Boom.badRequest('Произошла ошибка при удалении лайка');
        }
    },

}


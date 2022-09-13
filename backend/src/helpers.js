import crypto from 'crypto';
import database from './database/connection.js';

export const generateHash = data =>
    crypto
        .createHash('md5')
        .update(data)
        .digest('hex');

export const getUserToken = async function(token)
{
    console.log('found token ', token);
    const foundUser = await database.user.findOne({ token })
    return foundUser;
}

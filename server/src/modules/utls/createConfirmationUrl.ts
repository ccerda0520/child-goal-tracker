import {v4} from 'uuid';
import {redis} from '../../redis';
import {confirmUserPrefix} from "../constants/redisConstants";

export const createConfirmationUrl = async (userId: number) => {
    const token: string = await createConfirmationToken(userId);
    return `http://localhost:3000/user/confirm/${token}`;
};

export const createConfirmationToken = async (userId: number) => {
    const token = v4();
    await redis.set(confirmUserPrefix + token, userId, "ex", 60*60*24); // 1 day expiration
    return token;
};
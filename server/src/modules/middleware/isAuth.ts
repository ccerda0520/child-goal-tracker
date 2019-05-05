import {MiddlewareFn} from "type-graphql";
import {MyContext} from "../../types/myContext";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if(!context.req.session!.userId) {
        throw Error('Not authenticated.');
    }

    await next();
};
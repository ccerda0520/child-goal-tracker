import {buildSchema} from "type-graphql";
import {RegisterResolver} from "../modules/user/register";
import {MeResolver} from "../modules/user/me";
import {LogoutResolver} from "../modules/user/logout";
import {LoginResolver} from "../modules/user/login";
import {ForgotPasswordResolver} from "../modules/user/forgotPassword";
import {ConfirmUserResolver} from "../modules/user/confirmUser";
import {ChangePasswordInput} from "../modules/user/changePassword/changePasswordInput";
import {CreateStudentResolver} from "../modules/student/createStudent";

export const createSchema = async () => {
    return await buildSchema({
        resolvers: [
            // User Resolvers
            ChangePasswordInput,
            ConfirmUserResolver,
            ForgotPasswordResolver,
            LoginResolver,
            LogoutResolver,
            MeResolver,
            RegisterResolver,
            //Student Resolvers
            CreateStudentResolver
        ],
    })
};
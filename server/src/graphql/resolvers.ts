import {Resolver} from "../types/resolverType";
import {User} from "../entity/User";
import {Student} from "../entity/student";
import {Goal} from "../entity/goal";
import {Trial} from "../entity/trial";
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken"

const resolvers: any = {
    Query: {
        me: (_: any, args :any,{user}: any) => {
           if(!user) {
               return null;
           }

           return User.findOne(user.id, {relations: ['students']});
        },
        user: (_: any, {id}: any, {user}: any) => {
            return User.findOne(id, {relations: ['students']});
        },
        users: () => User.find({relations: ['students']}),
        student: (_: any, {id}: any) => Student.findOne(id, {relations: ["user", "goals"]}),
        students: () => Student.find({relations: ["user", "goals"]}),
        goal: (_: any, {id}: any) => Goal.findOne(id, {relations: ["student", "trials"]}),
        goals: () => Goal.find({relations: ["student", "trials"]}),
        trial: (_: any, {id}: any) => Trial.findOne(id, {relations: ["goal"]}),
        trials: () => Trial.find({relations: ["goal"]})
    },
    Mutation: {
        createUser: async (_: any, args: any) => await User.create(args).save(),
        updateUser: async (_: any, {id, ...args}: any) => {
            try {
                await User.update(id, args)
            } catch (err) {
                console.log(err);
                return false
            }

            return true;
        },
        deleteUser: async (_: any, {id}: any) => {
            try {
                await User.delete(id)
            } catch (err) {
                console.log(err);
                return false
            }

            return true;
        },
        createStudent: async (_: any, args: any) => await Student.create(args).save(),
        updateStudent: async (_: any, {id, ...args}: any) => {
            try {
                await Student.update(id, args)
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        deleteStudent: async (_: any, {id}: any) => {
            try {
                await Student.delete(id)
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        createGoal: async (_: any, args: any) => Goal.create(args).save(),
        updateGoal: async (_: any, {id, ...args}: any) => {
            try {
                await Goal.update(id, args);
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        deleteGoal: async (_: any, {id}: any) => {
            try {
                await Goal.delete(id);
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        createTrial: async (_: any, args: any) => await Trial.create(args).save(),
        updateTrial: async (_: any, {id, ...args}: any) => {
            try {
                await Trial.update(id, args);
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        deleteTrial: async (_: any, {id}: any) => {
            try {
                await Trial.delete(id);
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        register: async (_: any, args: any) => {
            const user = args;
            user.password = await bcrypt.hash(user.password, 12);
            return await  User.create(user).save()
        },
        login: async (_: any, {email, password}: any, {JWT_SECRET}: any) => {
            const userSearch = await User.find({where: {email: email}});
            const user = userSearch[0];
            if (!user) {
                throw new Error("No user with that email exists");
            }

            // check password correct
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return new Error('Incorrect password');
            }

            const token = jwt.sign(
                {
                    user: user
                },
                JWT_SECRET,
                {
                    expiresIn: "2 days"
                }
            );

            return token;
        }
    }
};

export default resolvers;
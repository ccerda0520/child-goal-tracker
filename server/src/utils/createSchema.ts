import { buildSchema } from 'type-graphql';
import { CreateGoalResolver } from '../modules/goal/createGoal';
import { GoalsResolver } from '../modules/goal/goals';
import { IncompleteGoalsResolver } from '../modules/goal/incompleteGoals';
import { CreateStudentResolver } from '../modules/student/createStudent';
import { CreateTrialResolver } from '../modules/trial/createTrial';
import { CurrentTrialResolver } from '../modules/trial/currentTrial';
import { GetTrialsByRangeResolver } from '../modules/trial/getTrialsByRange';
import { TrialResolver } from '../modules/trial/trial';
import { UpdateTrialResolver } from '../modules/trial/updateTrial';
import { ChangePasswordResolver } from '../modules/user/changePassword';
import { ConfirmUserResolver } from '../modules/user/confirmUser';
import { ForgotPasswordResolver } from '../modules/user/forgotPassword';
import { LoginResolver } from '../modules/user/login';
import { LogoutResolver } from '../modules/user/logout';
import { MeResolver } from '../modules/user/me';
import { RegisterResolver } from '../modules/user/register';

export const createSchema = async () => {
    return await buildSchema({
        resolvers: [
            // User Resolvers
            ChangePasswordResolver,
            ConfirmUserResolver,
            ForgotPasswordResolver,
            LoginResolver,
            LogoutResolver,
            MeResolver,
            RegisterResolver,
            //Student Resolvers
            CreateStudentResolver,
            // Goal Resolvers
            CreateGoalResolver,
            GoalsResolver,
            IncompleteGoalsResolver,
            //Trial Resolvers
            CreateTrialResolver,
            TrialResolver,
            CurrentTrialResolver,
            UpdateTrialResolver,
            GetTrialsByRangeResolver,
        ],
    });
};

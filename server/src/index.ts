import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { redis } from './redis';
import { createSchema } from './utils/createSchema';
dotenv.config();

const main = async () => {
    await createConnection();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        validationRules: [
            // queryComplexity({
            //     // The maximum allowed query complexity, queries above this threshold will be rejected
            //     maximumComplexity: 50,
            //     // The query variables. This is needed because the variables are not available
            //     // in the visitor of the graphql-js library
            //     variables: {},
            //     // Optional callback function to retrieve the determined query complexity
            //     // Will be invoked whether the query is rejected or not
            //     // This can be used for logging or to implement rate limiting
            //     // onComplete: (complexity: number) => {
            //     //     console.log("Query Complexity:", complexity);
            //     // },
            //     estimators: [
            //         // Using fieldConfigEstimator is mandatory to make it work with type-graphql
            //         fieldConfigEstimator(),
            //         // This will assign each field a complexity of 1 if no other estimator
            //         // returned a value. We can define the default value for fields not explicitly annotated
            //         simpleEstimator({
            //             defaultComplexity: 1,
            //         }),
            //     ],
            // }) as any,
        ],
    });

    const app = express();

    const RedisStore = connectRedis(session); // connect node.req.session to redis backing store

    app.use(cors({ credentials: true, origin: 'https://tracker.carlosalfredocerda.com' }));

    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: 'qid',
            secret: process.env.SESSION_SECRET || '',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
                domain: '.carlosalfredocerda.com',
            },
        }),
    );

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log('Apollo Server on http://localhost:4000/graphql');
    });
};

main();

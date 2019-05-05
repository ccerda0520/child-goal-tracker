import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {createConnection} from 'typeorm';
import "reflect-metadata";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import {redis} from "./redis";
import {createSchema} from "./utils/createSchema";
import queryComplexity, {fieldConfigEstimator, simpleEstimator} from "graphql-query-complexity";

const main = async () => {
    await createConnection();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        validationRules: [
            queryComplexity({
                // The maximum allowed query complexity, queries above this threshold will be rejected
                maximumComplexity: 50,
                // The query variables. This is needed because the variables are not available
                // in the visitor of the graphql-js library
                variables: {},
                // Optional callback function to retrieve the determined query complexity
                // Will be invoked whether the query is rejected or not
                // This can be used for logging or to implement rate limiting
                // onComplete: (complexity: number) => {
                //     console.log("Query Complexity:", complexity);
                // },
                estimators: [
                    // Using fieldConfigEstimator is mandatory to make it work with type-graphql
                    fieldConfigEstimator(),
                    // This will assign each field a complexity of 1 if no other estimator
                    // returned a value. We can define the default value for fields not explicitly annotated
                    simpleEstimator({
                        defaultComplexity: 1,
                    }),
                ],
            }) as any,
        ]
    });

    const app = express();

    const RedisStore = connectRedis(session); // connect node.req.session to redis backing store

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:3000"
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "qid",
            secret: process.env.SESSION_SECRET || "",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('Apollo Server on http://localhost:4000/graphql');
    })
};

main();




import {testConn} from "../../../testUtils/testConn";
import {Connection} from "typeorm";
import {graphql} from "graphql";
import {gCall} from "../../../testUtils/gCall";
import faker from 'faker';
import {User} from "../../../entity/User";

let conn: Connection;
// runs before all our tests
beforeAll(async () => {
    conn = await testConn();
});

// runs after all our tests
afterAll(async () => {
    await conn.close();
});

const meQuery = `
query {
  me {
    id
    firstName
    lastName
    email
  }
}
`;

describe('Me', () => {
    it('get user', async () => {

        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save();



        const response = await gCall({
            source: meQuery,
            userId: user.id
        });

        await expect(response).toMatchObject({
            data: {
                me: {
                    id: `${user.id}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        });

    });

    it('return null', async () => {

        const response = await gCall({
            source: meQuery,
        });

        await expect(response).toMatchObject({
            data: {
                me: null
            }
        });
    });
});
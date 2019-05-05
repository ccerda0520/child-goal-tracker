import {testConn} from "../../../testUtils/testConn";
import {Connection} from "typeorm";
import {gCall} from "../../../testUtils/gCall";
import faker from 'faker';
import {User} from "../../../entity/User";
import {createConfirmationToken} from "../../utls/createConfirmationUrl";

let conn: Connection;
// runs before all our tests
beforeAll(async () => {
    conn = await testConn();
});

// runs after all our tests
afterAll(async () => {
    await conn.close();
});

const confirmUserMutation = `
mutation ConfirmUser($token: String!){
  confirmUser(token: $token)
}
`;

describe('Confirm User', () => {
    it('confirm user', async () => {
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const dbUser = await User.create(user).save();
        const confirmationToken = await createConfirmationToken(dbUser.id);

        const response = await gCall({
            source: confirmUserMutation,
            variableValues: {
                token: confirmationToken
            }
        });

        await expect(response).toMatchObject({
            data: {
                confirmUser: true
            }
        });

        const updatedDbUser = await User.findOne({where: {id: dbUser.id}});
        expect(updatedDbUser!.confirmed).toBeTruthy();
    });
});
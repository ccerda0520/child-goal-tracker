import { logoutMutation } from '../graphql/user/mutations/logout';
import redirect from '../lib/redirect';
import { NextContextWithApollo } from '../types/NextContextWithApollo';

const Logout = () => {
    return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: NextContextWithApollo) => {
    await apolloClient.mutate({ mutation: logoutMutation });
    await apolloClient.resetStore();
    redirect(ctx, "/login")
    return {};
};

export default Logout;

const createResolver = (resolver: any) => {
    const baseResolver = resolver;
    baseResolver.createResolver = (childResolver: any) => {
        const newResolver = async (parent: any, args: any, context: any) => {
            await resolver(parent, args, context);
            return childResolver(parent, args, context);
        };
        return createResolver(newResolver);
    };
    return baseResolver;
};

export const requiresAuth = createResolver((parent: any, args: any, context: any) => {
   if(!context || !context.user) {
       throw new Error('Not authenticated');
   }
});

export const requiresAdmin = requiresAuth.createResolver((parent: any, args: any, context: any) => {
    if(context.user.role !== 'admin') {
        throw new Error('Requires admin access')
    }
});
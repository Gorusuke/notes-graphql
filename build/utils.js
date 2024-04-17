import { GraphQLError } from "graphql";
export const handleError = (message) => {
    throw new GraphQLError(message || 'ID must be a valid number', {
        extensions: {
            code: 'BAD_USER_INPUT',
        },
    });
};

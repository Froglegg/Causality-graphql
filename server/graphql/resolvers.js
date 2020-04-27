const { decodedToken } = require("./authenticate");

module.exports = {
  Query: {
    // protected API route
    allUsers: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      const users = await dataSources.userAPI.findAllUsers();
      return users;
    },
    findUser: async (parent, args, { dataSources, req }) => {
      const user = await dataSources.userAPI.findUser(args);
      return user;
    },
    findMe: async (parent, args, { dataSources, req }) => {
      // protected API route
      // token is accessed via the request header... on the client, specify request header in HTTP Header field, pulling it from local storage etc.
      const decoded = decodedToken(req);
      const myAccount = await dataSources.userAPI.findUser(decoded.email);
      return myAccount[0];
    },
  },
  Mutation: {
    createUser: async (parent, args, { dataSources, req }) => {
      const newUser = await dataSources.userAPI.createUser(args.userInput);

      return {
        success:
          !newUser || newUser == null || newUser.emailInvalid || newUser.error
            ? false
            : true,
        message: newUser.emailInvalid
          ? `422 error, Not a valid email address, try again`
          : newUser.error && newUser.error.code == "23505"
          ? `409 error, ${args.userInput.email} already exists; please use a different email.`
          : newUser.error
          ? `500 error, error inserting new user into database. Details: ${newUser.error.detail}`
          : `Welcome, ${newUser.userName}!`,

        user: newUser,
      };
    },
    login: async (parent, args, { dataSources, req }) => {
      const loginUser = await dataSources.userAPI.login(args.loginInput);
      return {
        success: loginUser.user && !loginUser.error ? true : false,
        message: loginUser.error
          ? `${loginUser.status} ${loginUser.error}`
          : loginUser.user && !loginUser.error
          ? `OK! Login for ${loginUser.user.userName} was successful!`
          : `Server error! ${loginUser.error} Try again later`,
        user: loginUser.user && !loginUser.error ? loginUser.user : "",
        token:
          loginUser.user && !loginUser.error && loginUser.token
            ? loginUser.token
            : "",
      };
    },
    logout: async (parent, args, { dataSources, req }) => {
      // user must have token to logout
      const decoded = decodedToken(req);
      const logout = await dataSources.userAPI.logout(decoded);

      return {
        success: decoded ? true : false,
        message: decoded
          ? `logged out, auth header removed ${logout}`
          : `something went wrong`,
      };
    },
  },
};

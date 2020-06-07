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
    findUserById: async (parent, args, { dataSources, req }) => {
      console.log(args);
      const user = await dataSources.userAPI.findUserById(args.id);
      console.log(user);
      return user;
    },
    isLoggedIn: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      const myAccount = await dataSources.userAPI.findUser(decoded.email);
      if (myAccount[0]) {
        return true;
      }
      return false;
    },
    findMe: async (parent, args, { dataSources, req }) => {
      // protected API route
      // token is accessed via the request header... on the client, specify request header in HTTP Header field, pulling it from local storage etc.
      const decoded = decodedToken(req);

      const myAccount = await dataSources.userAPI.findUser(decoded.email);

      return myAccount[0];
    },
    readJournal: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      if (decoded) {
        const journal = await dataSources.JournalsAPI.readJournal(args.id);
        return journal;
      }
    },
    readAllJournals: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      if (decoded) {
        const journals = await dataSources.JournalsAPI.readAllJournals();
        return journals;
      }
    },
    readMyJournals: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      const userId = decoded.id;
      if (decoded) {
        const journals = await dataSources.JournalsAPI.readMyJournals(userId);
        return journals;
      }
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
          ? `500 error, error inserting new user into database. Details: ${newUser.error}`
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
    updateUser: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);

      const userUpdate = await dataSources.userAPI.putUser(
        decoded.email,
        args.updateUserInput
      );

      return {
        success:
          !userUpdate ||
          userUpdate == null ||
          userUpdate.emailInvalid ||
          userUpdate.error
            ? false
            : true,
        message: userUpdate.emailInvalid
          ? `422 error, Not a valid email address`
          : userUpdate.error
          ? `500 error, error updating user. Details: ${userUpdate.error}`
          : `Update successful, ${userUpdate.userName}!`,

        user: userUpdate,
      };
    },
    deleteUser: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      const deleteUser = await dataSources.userAPI.deleteUser(
        decoded.email,
        args.password
      );

      return {
        success:
          !deleteUser ||
          deleteUser === null ||
          deleteUser.emailInvalid ||
          deleteUser.error
            ? false
            : true,
        message: deleteUser.emailInvalid
          ? "422 error, not a valid email address"
          : deleteUser.error
          ? `500 error, details ${deleteUser.error}`
          : `Delete user success!`,
        user: deleteUser,
      };
    },
    createJournal: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      const userId = decoded.id;
      if (decoded) {
        const createJournal = await dataSources.JournalsAPI.createJournal(
          args.journalInput,
          userId
        );

        return {
          success:
            !createJournal || createJournal === null || createJournal.error
              ? false
              : true,
          message:
            !createJournal || createJournal.error
              ? `500 error, details ${createJournal.error}`
              : "Success!",
          journal: createJournal,
        };
      }
    },
    updateJournal: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);

      if (decoded) {
        const updateJournal = await dataSources.JournalsAPI.updateJournal(
          args.updateJournalInput
        );
        return {
          success:
            !updateJournal || updateJournal === null || updateJournal.error
              ? false
              : true,
          message:
            !updateJournal || updateJournal.error
              ? `500 error, details ${updateJournal.error}`
              : "Success!",
          journal: updateJournal,
        };
      }
    },

    updateJournalData: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      if (decoded) {
        const updateJournalData = await dataSources.JournalsAPI.updateJournalData(
          args.updateJournalData
        );
        return {
          success:
            !updateJournalData ||
            updateJournalData === null ||
            updateJournalData.error
              ? false
              : true,
          message:
            !updateJournalData || updateJournalData.error
              ? `500 error, details ${updateJournalData.error}`
              : "Success!",
          journal: updateJournalData,
        };
      }
    },

    updateCausality: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);
      if (decoded) {
        const updateCausality = await dataSources.JournalsAPI.updateCausality(
          args.updateCausality
        );
        return {
          success:
            !updateCausality ||
            updateCausality === null ||
            updateCausality.error
              ? false
              : true,
          message:
            !updateCausality || updateCausality.error
              ? `500 error, details ${updateCausality.error}`
              : "Success!",
          causality: updateCausality,
        };
      }
    },

    deleteJournal: async (parent, args, { dataSources, req }) => {
      const decoded = decodedToken(req);

      if (decoded) {
        const deleteJournal = await dataSources.JournalsAPI.deleteJournal(
          args.id
        );
        return {
          success:
            !deleteJournal || deleteJournal === null || deleteJournal.error
              ? false
              : true,
          message:
            !deleteJournal || deleteJournal.error
              ? `500 error, details ${deleteJournal.error}`
              : "Success!",
          journal: deleteJournal,
        };
      }
    },
  },
};

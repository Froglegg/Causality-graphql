require("dotenv").config();

const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserAPI extends DataSource {
  /* set store to prototype, db store gets passed in new server constructor in index.js */
  constructor(store) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  generateAuthToken(userID, email) {
    return jwt.sign({ id: userID, email: email }, process.env.JWT_KEY);
  }

  async createUser(userInput) {
    const email = userInput.email ? userInput.email : "";

    if (!email || !isEmail.validate(email))
      return {
        emailInvalid: true,
      };

    userInput.password = await bcrypt.hash(userInput.password, 8);

    const newUser = this.store("users")
      .insert(userInput)
      .returning("*")
      .then((res) => {
        res[0].token = this.generateAuthToken(res[0].id, res[0].email);
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        // catching duplicate email
        console.log(err);
        return {
          error: err,
        };
      });

    return newUser ? newUser : null;
  }

  async findAllUsers() {
    const users = await this.store("users").select();
    return users && users.length ? users : false;
  }

  async findUser(email) {
    if (!email || !isEmail.validate(email))
      return {
        emailInvalid: true,
      };

    const user = await this.store("users").where({ email: email });

    return user ? user : false;
  }

  async putUser(email, updateUserInput) {
    const userUpdate = await this.store("users")
      .where({ email: email })
      .update({
        userName: updateUserInput.userName,
        hobby: updateUserInput.hobby,
      })
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        console.log(err);
        return {
          error: err,
        };
      });
    return userUpdate ? userUpdate : false;
  }

  async login(loginInput) {
    try {
      const { email, password } = loginInput;
      let user = await this.findUser(email);
      if (user.emailInvalid) {
        return {
          status: 422,
          error: "Email invalid! Please enter a proper email address.",
        };
      }
      if (!user[0]) {
        return { status: 401, error: "Invalid login credentials" };
      }
      const isPasswordMatch = await bcrypt.compare(password, user[0].password);
      if (!isPasswordMatch) {
        return { status: 401, error: "Invalid login credentials" };
      }
      const token = this.generateAuthToken(user[0].id, user[0].email);

      return {
        status: 200,
        user: user[0],
        token: token,
      };
    } catch (err) {
      console.log("LOGIN CATCH");
      console.error(err.name + ": " + err.message);
      return {
        status: 500,
        error: err,
      };
    }
  }

  async logout(decodedToken) {
    return decodedToken;
  }

  async deleteUser(email, password) {
    try {
      let user = await this.findUser(email);
      if (user.emailInvalid) {
        return {
          status: 422,
          error: "Email invalid! Please enter a proper email address.",
        };
      }
      if (!user[0]) {
        return { status: 401, error: "Invalid login credentials" };
      }
      const isPasswordMatch = await bcrypt.compare(password, user[0].password);
      if (!isPasswordMatch) {
        return { status: 401, error: "Invalid login credentials" };
      }

      const deleteUser = await this.store("users")
        .where({ email: email })
        .del()
        .returning("*")
        .then((res) => {
          return res[0] ? res[0] : null;
        })
        .catch((err) => {
          console.log(err);
          return { error: err };
        });

      return deleteUser ? deleteUser : false;
    } catch (err) {
      console.log("delete user catch");
      console.error(err.name + ": " + err.message);
      return {
        status: 500,
        error: err,
      };
    }
  }
}

module.exports = UserAPI;

require("dotenv").config();

const { DataSource } = require("apollo-datasource");

class EventsAPI extends DataSource {
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

  createEvent = async (eventInput) => {
    const createEvent = await this.store("events")
      .insert(eventInput)
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });
    return createEvent ? createEvent : false;
  };

  readEvent = async (eventId) => {
    const readEvent = await this.store("events")
      .where({ id: eventId })
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });
    return readEvent ? readEvent : false;
  };

  readAllEvents = async (journalId) => {
    const events = await this.store("events")
      .where({ journal: journalId })
      .then((res) => {
        return res && res.length ? res : null;
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });

    return events ? events : false;
  };

  updateEvent = async (putData) => {
    console.log(putData.id);
    const updateEvent = await this.store("events")
      .where({ id: putData.id })
      .update(putData)
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        console.log(err);
        return { error: err };
      });
    return updateEvent ? updateEvent : false;
  };

  deleteEvent = async (eventId) => {
    const deleteEvent = await this.store("events")
      .where({ id: eventId })
      .del()
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });

    return deleteEvent ? deleteEvent : false;
  };
}

module.exports = EventsAPI;

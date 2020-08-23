require("dotenv").config();

const { DataSource } = require("apollo-datasource");

class JournalsAPI extends DataSource {
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

  createJournal = async (journalInput, userId) => {
    journalInput.user = userId;
    const createJournal = await this.store("journals")
      .insert(journalInput)
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });
    return createJournal ? createJournal : false;
  };

  readJournal = async (journalId) => {
    const readJournal = await this.store("journals")
      .where({ id: journalId })
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });
    return readJournal ? readJournal : false;
  };

  readAllJournals = async () => {
    const journals = await this.store("journals")
      .where({ public: true })
      .then((res) => {
        return res && res.length ? res : [];
      })
      .catch((err) => {
        return { error: err };
      });

    return journals ? journals : false;
  };

  readMyJournals = async (userId) => {
    const readMyJournals = await this.store("journals")
      .where({ user: userId })
      .then((res) => {
        return res && res.length ? res : [];
      })
      .catch((err) => {
        return { error: err };
      });
    return readMyJournals ? readMyJournals : false;
  };

  updateJournal = async (putData) => {
    const updateJournal = await this.store("journals")
      .where({ id: putData.id })
      .update(putData.journal)
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });
    return updateJournal ? updateJournal : false;
  };

  updateJournalData = async (putData) => {
    const updateJournalData = await this.store("journals")
      .where({ id: putData.id })
      .update({
        causality: putData.causality,
        data: JSON.stringify(putData.data),
      })
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });
    return updateJournalData ? updateJournalData : false;
  };

  deleteJournal = async (journalId) => {
    const deleteJournal = await this.store("journals")
      .where({ id: journalId })
      .del()
      .returning("*")
      .then((res) => {
        return res[0] ? res[0] : null;
      })
      .catch((err) => {
        return { error: err };
      });

    return deleteJournal ? deleteJournal : false;
  };
}

module.exports = JournalsAPI;

var methods = require("./functions");
const { phi } = require("./functions");
module.exports = {
  causality: (journal) => {
    let correlationArray = [];
    let objArray = [];
    journal.forEach((obj) => {
      if (obj.events) {
        let events = obj.events;
        events.forEach((event) => {
          let table = methods.tableFor(event, journal);
          let stat = methods.phi(table);
          let eventObj = { event, stat };
          correlationArray.push(stat);
          objArray.push(eventObj);
        });
      }
    });

    let max = Math.max(...correlationArray);
    let min = Math.min(...correlationArray);

    let mostLikely = {};
    let leastLikely = {};

    objArray.forEach((obj) => {
      if (obj.stat == max) {
        mostLikely = obj;
      }
      if (obj.stat == min) {
        leastLikely = obj;
      }
    });

    for (let entry of journal) {
      if (
        entry.events.includes(mostLikely.event) &&
        !entry.events.includes(leastLikely.event)
      ) {
        entry.events.push(`${mostLikely.event} ${leastLikely.event}`);
      }
    }

    let culpritStat = methods
      .phi(
        methods.tableFor(`${mostLikely.event} ${leastLikely.event}`, journal)
      )
      .toFixed(2);

    let data = `This issue occurs most often when this happens: ${mostLikely.event} and when this doesn't happen: ${leastLikely.event}. The correlation between the two events is ${culpritStat}`;

    return data;
  },
};
const j = require("./exampleJournal2");

console.log(phi([76, 9, 4, 1]));

const causality = (journal) => {
  let correlationArray = [];
  let objArray = [];
  journal.forEach((obj) => {
    if (obj.events) {
      let events = obj.events;
      events.forEach((event) => {
        let table = methods.tableFor(event, journal);
        let stat = methods.phi(table);
        let eventObj = { event, stat };
        correlationArray.push(stat);
        objArray.push(eventObj);
      });
    }
  });

  let max = Math.max(...correlationArray);
  let min = Math.min(...correlationArray);

  let mostLikely = {};
  let leastLikely = {};

  objArray.forEach((obj) => {
    if (obj.stat == max) {
      mostLikely = obj;
    }
    if (obj.stat == min) {
      leastLikely = obj;
    }
  });

  for (let entry of journal) {
    if (
      entry.events.includes(mostLikely.event) &&
      !entry.events.includes(leastLikely.event)
    ) {
      entry.events.push(`${mostLikely.event} ${leastLikely.event}`);
    }
  }

  let culpritStat = methods
    .phi(methods.tableFor(`${mostLikely.event} ${leastLikely.event}`, journal))
    .toFixed(2);

  let data = `This issue occurs most often when this happens: ${mostLikely.event} and when this doesn't happen: ${leastLikely.event}. The correlation between the two events is ${culpritStat}`;

  return data;
};
console.log(causality(j));

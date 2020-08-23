var methods = require("./functions");
const { phi } = require("./functions");
module.exports = {
  causality: (journalData, condition) => {
    let correlationArray = [];
    let objArray = [];
    if (journalData && journalData.length) {
      journalData.forEach((obj) => {
        if (obj.events) {
          let events = obj.events;
          events.forEach((event) => {
            let table = methods.tableFor(event, journalData);
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
        if (obj.stat === max) {
          mostLikely = obj;
        }
        if (obj.stat === min) {
          leastLikely = obj;
        }
      });

      let copy = JSON.parse(JSON.stringify(journalData));

      for (let entry of copy) {
        if (
          entry.events.includes(mostLikely.event) &&
          !entry.events.includes(leastLikely.event)
        ) {
          entry.events.push(`${mostLikely.event} ${leastLikely.event}`);
        }
      }

      let culpritStat = methods
        .phi(methods.tableFor(`${mostLikely.event} ${leastLikely.event}`, copy))
        .toFixed(2);

      if (mostLikely.event && leastLikely.event && culpritStat) {
        return `"${condition}" occurs most often when this happens: ${mostLikely.event} and when this doesn't happen: ${leastLikely.event}. The correlation between the two events and "${condition}" is ${culpritStat}. \n\r\n\rIn other words, there is a ${culpritStat} chance that "${condition}" will occur if this event occurs: ${mostLikely.event} and this event doesn't occur: ${leastLikely.event}`;
      } else {
        return "Not enough data to analyze yet. Please submit more entries.";
      }
    } else {
      return `No data yet. Create an entry to begin.`;
    }
  },
};

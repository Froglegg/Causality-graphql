// journal must follow this structure:
// journal = [ {events: [], condition: boolean}, {}...]

var journal = [
  { events: ["carrot", "exercise", "weekend"], condition: false },
  {
    events: ["bread", "pudding", "brushed teeth", "weekend", "touched tree"],
    condition: false
  },
  {
    events: ["carrot", "nachos", "brushed teeth", "cycling", "weekend"],
    condition: false
  },
  {
    events: [
      "brussel sprouts",
      "ice cream",
      "brushed teeth",
      "computer",
      "weekend"
    ],
    condition: false
  },
  {
    events: [
      "potatoes",
      "candy",
      "brushed teeth",
      "exercise",
      "weekend",
      "dentist"
    ],
    condition: false
  },
  {
    events: [
      "brussel sprouts",
      "pudding",
      "brushed teeth",
      "running",
      "weekend"
    ],
    condition: false
  },
  {
    events: ["pizza", "brushed teeth", "computer", "work", "touched tree"],
    condition: false
  },
  {
    events: ["bread", "beer", "brushed teeth", "cycling", "work"],
    condition: false
  },
  { events: ["cauliflower", "brushed teeth", "work"], condition: false },
  { events: ["pizza", "brushed teeth", "cycling", "work"], condition: false },
  { events: ["lasagna", "nachos", "brushed teeth", "work"], condition: false },
  { events: ["brushed teeth", "weekend", "touched tree"], condition: false },
  {
    events: ["lettuce", "brushed teeth", "television", "weekend"],
    condition: false
  },
  { events: ["spaghetti", "brushed teeth", "work"], condition: false },
  { events: ["brushed teeth", "computer", "work"], condition: false },
  { events: ["lettuce", "nachos", "brushed teeth", "work"], condition: false },
  { events: ["carrot", "brushed teeth", "running", "work"], condition: false },
  { events: ["brushed teeth", "work"], condition: false },
  { events: ["cauliflower", "reading", "weekend"], condition: false },
  { events: ["bread", "brushed teeth", "weekend"], condition: false },
  {
    events: ["lasagna", "brushed teeth", "exercise", "work"],
    condition: false
  },
  {
    events: ["spaghetti", "brushed teeth", "reading", "work"],
    condition: false
  },
  {
    events: ["carrot", "ice cream", "brushed teeth", "television", "work"],
    condition: false
  },
  { events: ["spaghetti", "nachos", "work"], condition: false },
  {
    events: ["cauliflower", "ice cream", "brushed teeth", "cycling", "work"],
    condition: false
  },
  { events: ["spaghetti", "peanuts", "computer", "weekend"], condition: true },
  {
    events: ["potatoes", "ice cream", "brushed teeth", "computer", "weekend"],
    condition: false
  },
  {
    events: ["potatoes", "ice cream", "brushed teeth", "work"],
    condition: false
  },
  { events: ["peanuts", "brushed teeth", "running", "work"], condition: false },
  { events: ["potatoes", "exercise", "work"], condition: false },
  { events: ["pizza", "ice cream", "computer", "work"], condition: false },
  { events: ["lasagna", "ice cream", "work"], condition: false },
  { events: ["cauliflower", "candy", "reading", "weekend"], condition: false },
  {
    events: ["lasagna", "nachos", "brushed teeth", "running", "weekend"],
    condition: false
  },
  { events: ["potatoes", "brushed teeth", "work"], condition: false },
  { events: ["carrot", "work"], condition: false },
  { events: ["pizza", "beer", "work", "dentist"], condition: false },
  { events: ["lasagna", "pudding", "cycling", "work"], condition: false },
  {
    events: ["spaghetti", "brushed teeth", "reading", "work"],
    condition: false
  },
  {
    events: ["spaghetti", "pudding", "television", "weekend"],
    condition: false
  },
  {
    events: ["bread", "brushed teeth", "exercise", "weekend"],
    condition: false
  },
  { events: ["lasagna", "peanuts", "work"], condition: true },
  { events: ["pizza", "work"], condition: false },
  { events: ["potatoes", "exercise", "work"], condition: false },
  { events: ["brushed teeth", "exercise", "work"], condition: false },
  {
    events: ["spaghetti", "brushed teeth", "television", "work"],
    condition: false
  },
  { events: ["pizza", "cycling", "weekend"], condition: false },
  { events: ["carrot", "brushed teeth", "weekend"], condition: false },
  { events: ["carrot", "beer", "brushed teeth", "work"], condition: false },
  { events: ["pizza", "peanuts", "candy", "work"], condition: true },
  {
    events: ["carrot", "peanuts", "brushed teeth", "reading", "work"],
    condition: false
  },
  {
    events: ["potatoes", "peanuts", "brushed teeth", "work"],
    condition: false
  },
  {
    events: ["carrot", "nachos", "brushed teeth", "exercise", "work"],
    condition: false
  },
  {
    events: ["pizza", "peanuts", "brushed teeth", "television", "weekend"],
    condition: false
  },
  {
    events: ["lasagna", "brushed teeth", "cycling", "weekend"],
    condition: false
  },
  {
    events: [
      "cauliflower",
      "peanuts",
      "brushed teeth",
      "computer",
      "work",
      "touched tree"
    ],
    condition: false
  },
  {
    events: ["lettuce", "brushed teeth", "television", "work"],
    condition: false
  },
  {
    events: ["potatoes", "brushed teeth", "computer", "work"],
    condition: false
  },
  { events: ["bread", "candy", "work"], condition: false },
  { events: ["potatoes", "nachos", "work"], condition: false },
  {
    events: ["carrot", "pudding", "brushed teeth", "weekend"],
    condition: false
  },
  {
    events: ["carrot", "brushed teeth", "exercise", "weekend", "touched tree"],
    condition: false
  },
  { events: ["brussel sprouts", "running", "work"], condition: false },
  { events: ["brushed teeth", "work"], condition: false },
  { events: ["lettuce", "brushed teeth", "running", "work"], condition: false },
  { events: ["candy", "brushed teeth", "work"], condition: false },
  {
    events: ["brussel sprouts", "brushed teeth", "computer", "work"],
    condition: false
  },
  { events: ["bread", "brushed teeth", "weekend"], condition: false },
  { events: ["cauliflower", "brushed teeth", "weekend"], condition: false },
  {
    events: ["spaghetti", "candy", "television", "work", "touched tree"],
    condition: false
  },
  { events: ["carrot", "pudding", "brushed teeth", "work"], condition: false },
  { events: ["lettuce", "brushed teeth", "work"], condition: false },
  {
    events: ["carrot", "ice cream", "brushed teeth", "cycling", "work"],
    condition: false
  },
  { events: ["pizza", "brushed teeth", "work"], condition: false },
  { events: ["spaghetti", "peanuts", "exercise", "weekend"], condition: true },
  {
    events: ["bread", "beer", "computer", "weekend", "touched tree"],
    condition: false
  },
  { events: ["brushed teeth", "running", "work"], condition: false },
  {
    events: ["lettuce", "peanuts", "brushed teeth", "work", "touched tree"],
    condition: false
  },
  {
    events: ["lasagna", "brushed teeth", "television", "work"],
    condition: false
  },
  {
    events: ["cauliflower", "brushed teeth", "running", "work"],
    condition: false
  },
  { events: ["carrot", "brushed teeth", "running", "work"], condition: false },
  { events: ["carrot", "reading", "weekend"], condition: false },
  { events: ["carrot", "peanuts", "reading", "weekend"], condition: true },
  {
    events: ["potatoes", "brushed teeth", "running", "work"],
    condition: false
  },
  {
    events: ["lasagna", "ice cream", "work", "touched tree"],
    condition: false
  },
  {
    events: ["cauliflower", "peanuts", "brushed teeth", "cycling", "work"],
    condition: false
  },
  { events: ["pizza", "brushed teeth", "running", "work"], condition: false },
  { events: ["lettuce", "brushed teeth", "work"], condition: false },
  {
    events: ["bread", "brushed teeth", "television", "weekend"],
    condition: false
  },
  {
    events: ["cauliflower", "peanuts", "brushed teeth", "weekend"],
    condition: false
  }
];

// This makes sure the data is exported in node.js —
// `require('./path/to/journal.js')` will get you the array.
if (
  typeof module != "undefined" &&
  module.exports &&
  (typeof window == "undefined" || window.exports != exports)
)
  module.exports = journal;
if (typeof global != "undefined" && !global.journal) global.journal = journal;

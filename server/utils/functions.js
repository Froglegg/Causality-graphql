module.exports = {
  // Φ coefficient takes in a table of boolean binaries, [00, 01, 10, 11], and calculates the correlation between the two boolean values.
  // console.log(phi([76, 9, 4, 1]));

  //   phi: table => {
  //     return (
  //       (table[3] * table[0] - table[2] * table[1]) /
  //       Math.sqrt(
  //         (table[2] + table[3]) *
  //           (table[0] + table[1]) *
  //           (table[1] + table[3]) *
  //           (table[0] + table[2])
  //       )
  //     );
  //   },

  // destructured phi function
  phi: ([n00, n01, n10, n11]) => {
    return (
      (n11 * n00 - n10 * n01) /
      Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
    );
  },
  // function that creates a table for Phi, here using "Squirrel"
  tableFor: (event, journal) => {
    let table = [0, 0, 0, 0];
    for (let i = 0; i < journal.length; i++) {
      let entry = journal[i],
        index = 0;
      if (entry.events.includes(event)) index += 1;
      if (entry.condition) index += 2;
      table[index] += 1;
    }
    return table;
  }
};

const NOTES = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'
];

const MAP_STRING_TO_NOTE = {
  1: 'E',
  2: 'B',
  3: 'G',
  4: 'D',
  5: 'A',
  6: 'E'
};

/**
 * Generates a new Task and returns an Object with attribute
 * fret, string, note
 */
let generateTask = function() {
  let fret = Math.round(Math.random() * 11);
  let string = Math.round(Math.random() * 5) + 1;
  let toneOfString = NOTES.indexOf(MAP_STRING_TO_NOTE[string]);
  let note = NOTES[(fret+toneOfString) % 12];

  return {
    fret,
    string,
    note
  };
}

exports.GenerateTask = generateTask;
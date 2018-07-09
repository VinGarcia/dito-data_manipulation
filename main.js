let fs = require('fs');
let EventService = require('./Services/EventService.js');

main();
function main() {
  let events = require('./events.json').events;
  let timeline = EventService.buildTimeline(events);

  let timeline_str = JSON.stringify(timeline);

  // Show the result on the screen:
  console.log(timeline_str);

  // Save it on disk, just in case:
  fs.writeFileSync('timelineReport.json', timeline_str);
}

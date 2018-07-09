let fs = require('fs');
let EventService = require('./EventService.js');

main();
function main() {
  let events = require('./events.json').events;
  let timeline = EventService.buildTimeline(events);

  let timeline_str = JSON.stringify(timeline);
  console.log(timeline_str);
  fs.writeFileSync('timelineReport.json', timeline_str);
}

let fs = require('fs');
let reportService = require('./reportService.js');

main();
function main() {
  let events = require('./events.json').events;
  let timeline = reportService.timeline(events);

  let timeline_str = JSON.stringify(timeline);
  console.log(timeline_str);
  fs.writeFileSync('timelineReport.json', timeline_str);
}

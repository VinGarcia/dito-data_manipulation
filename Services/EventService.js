
let reduceByKey = require('./UtilService.js').reduceByKey;

/**
 * Used to convert each received event into
 * something simpler to work with.
 */
function parseEvent(input) {
  let item = {
    event: input.event,
    timestamp: input.timestamp,
    data: {},
  };

  for (let i in input.custom_data) {
    let data = input.custom_data[i];
    item.data[data.key] = data.value;
  }

  return item;
}

module.exports = {

  /**
   * Converts a list of events into an ordered list
   * of sales grouped by its transaction_id:
   */
  buildTimeline : (events) => {
    // Simplify the structure of all events:
    for (let i in events) {
      events[i] = parseEvent(events[i]);
    }
    
    // Build the timeline:
    let timeline = reduceByKey(events,
      // Choose the key to use to group each reduction:
      function(item) { return item.data.transaction_id; },
    
      // Reduce all items with the same transaction_id
      // to one item of the timeline list:
      function(item, timelineItem) {
        // If this is the first event with this transaction_id:
        // Create a new timelineItem:
        if (!timelineItem) {
          timelineItem = {
            timestamp: item.timestamp,
            revenue: 0,
            transaction_id: item.data.transaction_id,
            store_name: "",
            products: [],
          };
        }

        // Check if this event contains a product:
        if (item.data.product_name && typeof item.data.product_price == "number") {
          timelineItem.products.push({
            name: item.data.product_name,
            price: item.data.product_price,
          });

          timelineItem.revenue += item.data.product_price;
        }
    
        // Check if this event contains a store_name:
        if (item.data.store_name) {
          timelineItem.store_name = item.data.store_name;
        }
    
        return timelineItem;
      }
    );
    
    // The index of this timeline is the trasaction ID
    // and that makes it a sparse list.
    // (it was necessary for grouping them)
    //
    // Transform it on a simple sequential list:
    timeline = Object.values(timeline);

    // And sort it by the timestamp value:
    // timeline.sort((v1,v2) => v2.timestamp-v1.timestamp);

    return timeline;
  }
}

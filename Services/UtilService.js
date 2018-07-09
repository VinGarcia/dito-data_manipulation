
module.exports = {
  /**
   * Receives a list of objects and returns 
   * a new list whose keys were extracted
   * from the attributes of the original list.
   *
   * @arg table - a list of objects.
   * @arg getKey:
   *   A callback that returns the attribute of each
   *   item to be used as key, e.g.:
   *
   *   - (item) => item.new_key
   *
   * @arg getValue:
   *   A callback that returns the value to be used for a given object.
   *   If an object already exists with the given key it is passed
   *   as the second argument.
   */
  reduceByKey: function(table, getKey, getValue) {
    var atvList = [];

    getKey = typeof getKey == 'function' ? getKey : (function(item) { return item.id; });
    getValue = typeof getValue == 'function' ? getValue : (function(item, oldValue) { return item; });

    for (var i in table) {
      var key = getKey(table[i]);

      atvList[key] = getValue(table[i], atvList[key]);
    }

    return atvList;
  }
}

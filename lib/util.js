(function() {

  module.exports = {
    indexOfEql: function(haystack, needle) {
      var i, index, item, _len;
      index = -1;
      for (i = 0, _len = haystack.length; i < _len; i++) {
        item = haystack[i];
        if (item.eql(needle)) {
          index = i;
          break;
        }
      }
      return index;
    }
  };

}).call(this);

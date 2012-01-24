(function() {

  if (window.HAML == null) window.HAML = {};

  window.HAML['form'] = function(context) {
    return (function() {
      var $c, $e, $o, field, label, _ref;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
      };
      $c = function(text) {
        if (text === null || text === void 0) {
          return '';
        } else {
          return text;
        }
      };
      $o = [];
      $o.push("<div class='inside'>");
      _ref = this.fields;
      for (field in _ref) {
        label = _ref[field];
        $o.push("  <div class='" + ([$e($c(this.types[field])), 'form-row'].sort().join(' ')) + "'>");
        if (this.types[field] === "textarea") {
          $o.push("    <textarea placeholder='" + ($e($c(label))) + "' name='" + ($e($c(field))) + "'></textarea>");
        } else {
          $o.push("    <input type='" + ($e($c(this.types[field]))) + "' placeholder='" + ($e($c(label))) + "' name='" + ($e($c(field))) + "' autocapitalize='off'>");
        }
        $o.push("  </div>");
      }
      $o.push("  <div class='form-row'>\n    <input type='submit'>\n  </div>\n</div>");
      return $o.join("\n");
    }).call(context);
  };

}).call(this);
(function() {

  if (window.HAML == null) window.HAML = {};

  window.HAML['list'] = function(context) {
    return (function() {
      var $c, $e, $o, i, item, _len, _ref;
      $e = function(text, escape) {
        return ("" + text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
      };
      $c = function(text) {
        if (text === null || text === void 0) {
          return '';
        } else {
          return text;
        }
      };
      $o = [];
      $o.push("<div class='inside'>");
      _ref = this.items;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        item = _ref[i];
        $o.push("  <li class='" + (this.itemClass ? this.itemClass(item) : '') + "'>\n    <div class='inside'>" + ($e($c(this.method ? item[this.method] : item.name))) + "</div>\n  </li>");
      }
      $o.push("</div>");
      return $o.join("\n");
    }).call(context);
  };

}).call(this);

module.exports = window.HAML;
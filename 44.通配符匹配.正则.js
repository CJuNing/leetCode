/*
 * @lc app=leetcode.cn id=44 lang=javascript
 *
 * [44] 通配符匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  var splitString = (str) => {
    var strArr = str
      .replace(/\?/g, "_?_")
      .replace(/\*/g, "_*_")
      .replace(/(\_)+/g, "_")
      .split("_");
    var result = [];
    var last = null;
    for (var i = 0; i < strArr.length; i++) {
      var cur = strArr[i];
      if (cur != "*" && cur != "?") {
        if (last) {
          result.push(last);
          result.push(cur);
          last = null;
        } else {
          result.push(cur);
        }
      } else {
        if (!last) {
          last = {
            min: cur == "*" ? 0 : 1,
            max: cur == "*" ? Infinity : 1,
          };
        } else {
          last.min += cur == "*" ? 0 : 1;
          last.max += cur == "*" ? Infinity : 1;
        }
      }
    }
    return result;
  };
  // 结构化 正则字符串
  var pArr = splitString(p);

  p = pArr
    .map((_p) => {
      return typeof _p === "string"
        ? _p
        : `[a-z]{${_p.min},${_p.max === Infinity ? "" : _p.max}}`;
    })
    .join("");

  p = new RegExp("^" + p + "$");
  console.log(p);
  return p.test(s);
};
// @lc code=end

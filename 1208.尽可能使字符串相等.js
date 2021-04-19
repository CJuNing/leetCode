/*
 * @lc app=leetcode.cn id=1208 lang=javascript
 *
 * [1208] 尽可能使字符串相等
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */

var equalSubstring = function (s, t, maxCost) {
  var chatCodeAbsMap = new Map();
  var getCharCodeAbs = function (s, t) {
    if (chatCodeAbsMap.has(s + t)) {
      return chatCodeAbsMap.get(s + t);
    }
    if (chatCodeAbsMap.has(t + s)) {
      return chatCodeAbsMap.get(t + s);
    }
    let abs = Math.abs(getCharCode(s) - getCharCode(t));
    chatCodeAbsMap.set(s + t, abs);
    return abs;
  };

  let max = {
    startIndex: 0,
    startValue: getCharCodeAbs(s[i], t[i]),
    endIndex: 0,
    value: getCharCodeAbs(s[i], t[i]),
    length: 1,
  };
  for (var i = 1; i < s.length; i++) {
    let abs = getCharCodeAbs(s[i], t[i]);
    if (max.value + abs <= maxCost) {
      max.endIndex = i;
      max.length = max.endIndex - max.startIndex;
      max.value += abs;
    } else {
    }
  }
};
// @lc code=end

/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  let len = parseInt(s.length / 2);
  let result = false;
  // 从最长开始验证和从最短开始验证没区别
  while (len > 0 && !result) {
    if (s.length % len === 0) {
      // 保证可以整除
      let reg = new RegExp(s.substr(0, len), "g");
      if (s.match(reg).length * len === s.length) {
        // 计算长度是否相等
        result = true;
      }
    }
    len--;
  }
  return result;
};
// @lc code=end

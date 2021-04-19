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
// 逐位找还是逐段文字找，前者用数组，后者用字符串
var isMatch = function (s, p) {
  // 把字符串基于 ? 和 * 分隔
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
            min: cur == "?" ? 0 : 1,
            max: cur == "?" ? Infinity : 1,
          };
        } else {
          last.min += "?" ? 0 : 1;
          last.max += cur == "?" ? Infinity : 1;
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
  return p.test(s);

  //   var markArr = [];

  //   var normalArr = [];

  //   var possibilityMap = {};

  //   var lastMark = null;

  //   var normalCheckResult = pArr.every((str, index) => {
  //     if (str == "") return true;
  //     if (str == "?" || str == "*") {
  //       if (!lastMark) {
  //         lastMark = {
  //           splitIndex: index,
  //           min: 0,
  //           max: str == "*" ? 1 : Infinity,
  //         };
  //       } else {
  //         lastMark.min += str == "*" ? 1 : Infinity;
  //       }
  //       return true;
  //     }

  //     if (lastMark) {
  //       markArr.push(Object.assign({}, lastMark));
  //     }

  //     var reg = new RegExp(str, "g");
  //     var possibility = s.match(reg);
  //     if (!possibility) {
  //       return false;
  //     } else {
  //     }

  // if (str != "*" && str != "?") {
  //   var reg = new RegExp(str, "g");
  //   var possibility = s.match(reg);
  //   if (!possibility) {
  //     return false;
  //   }
  //   // 没命中
  //   let result = s.indexOf(str);
  //   if (result == -1) {
  //     return false;
  //   } else {
  //     // 看这次命中的index是不是比上次靠后 不靠后直接报错
  //     if (result < normalArr[normalArr.length - 1]) {
  //       return false;
  //     }
  //     // 看这次命中间距是不是合理
  //     return true;
  //   }
  // } else {
  //   // 不用管？he *
  //   return true;
  // }
  //   });
};
// @lc code=end

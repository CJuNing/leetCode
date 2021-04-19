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
// 这个的思路是想逐位排除文本检测
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
  p = splitString(p);

  var checkMatch = (mark, startIndex) => {
    let matchIndex = s.indexOf(mark, startIndex);
    // 返回 [startIndex, endIndex]
    return matchIndex == -1
      ? false
      : [matchIndex, matchIndex + mark.length - 1];
  };

  let matchArray = [];

  var createNode = (parent, range) => {
    return {
      parent,
      range,
      children: [],
    };
  };

  let totalStringIndex = 0;

  var checkNext = (markIndex, parent = null) => {
    let startIndex = parent ? parent.range[1] + 1 : 0;
    // 字符串和正则字符是间隔的
    // FIXME. 最大最小值范围有问题 得处理下 初始root的range要是[-1，-1]那 min和max的 对应要处理
    let markRange = p[markIndex - 1] || { min: 0, max: 0 };
    let mark = p[markIndex];
    if (typeof mark === "object") {
      matchArray.push(mark);
      checkNext(markIndex + 1, parent);
    } else {
      // 有 parent 就从 parent.endIndex + 1 开始查
      let result = checkMatch(mark, startIndex);
      while (result) {
        let pcabs = result[0] - parent.range[1];
        if (markRange.min <= pcabs && pcabs <= markRange.max) {
          let node = createNode(parent, result);
          parent.children.push(node);
          checkNext(markIndex + 1, node);
          totalStringIndex = Math.max(totalStringIndex, result[1]);
        }
        result = checkMatch(mark, result[0] + 1);
      }
    }
  };

  let root = { range: [-1, -1], children: [], isRoot: true };

  checkNext(0, root);

  let last = p[p.length - 1];

  console.log(JSON.stringify(root), totalStringIndex);

  if (typeof last === "object") {
    let abs = last - totalStringIndex;
    if (last.min <= abs && abs <= last.max) {
      return true;
    } else {
      return false;
    }
  } else {
    return s.length - 1 === totalStringIndex;
  }
};
// @lc code=end

isMatch("aa", "a");

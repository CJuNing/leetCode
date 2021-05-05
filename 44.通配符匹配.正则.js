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
  if (s === p) {
    return true
  }
  // 把字符串基于 ? 和 * 分隔
  var splitString = (str) => {
    var strArr = str
      .replace(/\?/g, "_?_")
      .replace(/\*/g, "_*_")
      .replace(/(\_)+/g, "_")
      .split("_")
    var result = []
    var last = null
    for (var i = 0; i < strArr.length; i++) {
      var cur = strArr[i]
      if (cur != "*" && cur != "?") {
        if (last) {
          result.push(last)
          result.push(cur)
          last = null
        } else {
          result.push(cur)
        }
      } else {
        if (!last) {
          last = {
            min: cur == "*" ? 0 : 1,
            max: cur == "*" ? Infinity : 1,
          }
        } else {
          last.min += cur == "*" ? 0 : 1
          last.max += cur == "*" ? Infinity : 1
        }
      }
    }
    result = result.filter((r) => r !== "")
    return result
  }
  // 结构化 正则字符串
  p = splitString(p)
  // console.log(p)
  var flag = false
  // var times = 0
  var map = {}

  var checkNext = (markIndex, currentStartIndex) => {
    // debugger
    if (map[markIndex + "_" + currentStartIndex]) {
      return
    }
    map[markIndex + "_" + currentStartIndex] = 1
    // console.log(markIndex, currentStartIndex)
    if (flag || markIndex >= p.length) {
      return
    }
    var mark = p[markIndex]
    // 1. 如果是字符串
    if (typeof mark === "string") {
      var matchIndex = s.indexOf(mark, currentStartIndex)
      if (matchIndex === currentStartIndex) {
        if (markIndex === p.length - 1) {
          // 最后一个正则段
          if (s.length === matchIndex + mark.length) {
            // 检查结束
            flag = true
          } else {
            return
          }
        } else {
          checkNext(markIndex + 1, matchIndex + mark.length)
        }
        // 必须等于0
      } else {
        return
      }
    } else if (markIndex === p.length - 1) {
      // 3. 如果是对象且自身就是最后一个
      var lastStringLength = s.length - currentStartIndex
      if (mark.min <= lastStringLength && lastStringLength <= mark.max) {
        flag = true
      } else {
        return
      }
    } else {
      // 2. 如果是对象且下一个是字符串
      var nextMark = p[markIndex + 1]
      var nextMatchIndex = s.indexOf(nextMark, currentStartIndex + mark.min)
      var range = nextMatchIndex - currentStartIndex
      // 判断多种可能直到 没命中 或者 命中范围超过正则范围
      while (nextMatchIndex !== -1 && range <= mark.max) {
        checkNext(markIndex + 1, nextMatchIndex)
        // 判断多种可能
        nextMatchIndex = s.indexOf(nextMark, nextMatchIndex + 1)
        range = nextMatchIndex - currentStartIndex
      }
    }
  }

  checkNext(0, 0)

  // console.log(times, Object.keys(map).length)

  return flag
}
// @lc code=end

/*
 * @lc app=leetcode.cn id=743 lang=javascript
 *
 * [743] 网络延迟时间
 */

// @lc code=start
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var result = {};
var maxTime = 0;
var source_target_map = {};
var networkDelayTime = function (times, n, k) {
  // 预处理
  source_target_map = collectInfo(times);
  result = {};
  result[k] = 0;
  maxTime = 0;
  //
  loop(source_target_map[k] || {}, 0);
  //   console.log(result);
  //
  if (Object.keys(result).length === n) {
    for (var key in result) {
      maxTime = Math.max(maxTime, result[key]);
    }
    return maxTime;
  } else {
    return -1;
  }
};

var loop = (children, baseTime) => {
  //   console.log(children, baseTime, result);
  for (var child in children) {
    let pathTime = baseTime + children[child];
    if (result[child] === undefined || result[child] > pathTime) {
      // 没有完成的直接写入，并检查子项
      // 如果当前路径小于result记录的 则继续检查
      result[child] = pathTime;
      if (source_target_map[child]) {
        loop(source_target_map[child], result[child]);
      }
    }
  }
};

var collectInfo = (times) => {
  let source_target_map = {};
  times.forEach((time) => {
    if (!source_target_map[time[0]]) {
      source_target_map[time[0]] = {};
    }
    source_target_map[time[0]][time[1]] = time[2];
  });
  return source_target_map;
};

// @lc code=end

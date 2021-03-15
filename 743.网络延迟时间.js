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
var map = {};
var result = {};
var maxTime = 0;
var source_target_map = {};
var networkDelayTime = function (times, n, k) {
  // 预处理
  source_target_map = collectInfo(times);
  //
  map = {};
  result = {};
  maxTime = 0;
  map[k] = 0;
  //
  loop(source_target_map[k] || {}, `{${k}}`, 0);
  console.log(map, result);
  //
  if (Object.keys(result).length === n - 1) {
    for (var key in result) {
      maxTime = Math.max(maxTime, result[key]);
    }
    return maxTime;
  } else {
    return -1;
  }
};

var loop = (children, basePath, baseTime) => {
  for (var child in children) {
    let pathTime = baseTime + children[child];
    if (basePath.indexOf(`{${child}}`) === -1) {
      if (!result[child] || result[child] > pathTime) {
        result[child] = pathTime;
      }
      if (source_target_map[child]) {
        loop(source_target_map[child], basePath + `{${child}}`, result[child]);
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
networkDelayTime(
  [
    [1, 2, 1],
    [2, 1, 3],
  ],
  2,
  2
);

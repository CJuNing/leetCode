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
var networkDelayTime = function (times, n, k) {
  let source_target_map = {};
  times.forEach((time) => {
    if (!source_target_map[time[0]]) {
      source_target_map[time[0]] = {};
    }
    source_target_map[time[0]][time[1]] = time[2];
  });
  let currentTargets = Object.assign({}, source_target_map[k]);
  let finishMap = {};
  finishMap[n] = 0;
  let t = 1;
  function merge(target, source) {
    for (let key in source) {
      let value = source[key];
      if (!target[key] || target[key] > value) {
        target[key] = value;
      }
    }
  }
  function next() {
    let nextTargets = {};
    for (let target in currentTargets) {
      let temp = {};
      temp[target] = currentTargets[target] - 1;
      console.log("temp", temp);
      merge(nextTargets, temp);
      console.log("nextTargets 1", nextTargets);
      if (currentTargets[target] === 1) {
        // 本次为1 则为到达 检查子类
        merge(nextTargets, source_target_map[target]);
        console.log("nextTargets children", nextTargets);
      }
    }
    for (let target in nextTargets) {
      if (finishMap[target]) {
        delete nextTargets[target];
      } else if (nextTargets[target] === 0) {
        finishMap[target] = t;
        delete nextTargets[target];
      }
    }
    console.log(finishMap, nextTargets, t);
    if (
      Object.keys(finishMap).length === n ||
      Object.keys(nextTargets).length === 0
    ) {
      return;
    } else {
      currentTargets = nextTargets;
      t++;
      next();
    }
  }
  next();
  if (Object.keys(finishMap).length == n) {
    return t;
  } else {
    return -1;
  }
};
// @lc code=end

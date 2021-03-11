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
  // 预处理
  let source_target_map = {};
  times.forEach((time) => {
    if (!source_target_map[time[0]]) {
      source_target_map[time[0]] = {};
    }
    source_target_map[time[0]][time[1]] = time[2];
  });
  let currentTargets = Object.assign({}, source_target_map[k]);
  let finishMap = {};
  finishMap[k] = 0;
  let t = 1;
  // 最小合并
  function merge(target, source) {
    for (let key in source) {
      if (finishMap[key]) {
        continue;
      }
      let value = source[key];
      if (!target[key] || target[key] > value) {
        target[key] = value;
      }
    }
  }
  //递归
  function next() {
    // 先检查 完成+结束
    let nextTargets = {};
    // 再递减
    for (let target in currentTargets) {
      if (finishMap[target]) {
        delete nextTargets[target];
      } else if (currentTargets[target] === 0) {
        delete nextTargets[target];
        merge(nextTargets, source_target_map[target]);
        finishMap[target] = t;
      } else {
        let leftT = currentTargets[target] - 1;
        if (!nextTargets[target] || nextTargets[target] > value) {
          nextTargets[target] = leftT;
        }
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

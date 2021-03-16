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
var finish_map = {};
var source_target_map = {};
var current_loop_index = 0;
var start_index = 0;
var nodes_length = 0;
var step = 1;
var networkDelayTime = function (times, n, k) {
  // 得重置状态
  finish_map = {};
  source_target_map = {};
  current_loop_index = 0;
  step = 1;
  nodes_length = n;
  start_index = k;
  // 预处理
  source_target_map = collectInfo(times);
  finish_map[k] = 0;
  // 开始递归
  checkNext(source_target_map[start_index] || {});
  // 最终检查
  if (Object.keys(finish_map).length === nodes_length) {
    return current_loop_index;
  } else {
    return -1;
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

var mergeInfo = (target, source) => {
  // 合并时候 如果已经完成请清除 target
  // 如果没完成 则取小值
  for (let key in source) {
    if (finish_map[key]) {
      delete target[key];
      continue;
    }
    let value = source[key];
    if (target[key] === undefined || target[key] > value) {
      target[key] = value;
    }
  }
};

var checkNext = (currentTargets) => {
  var nextTargets = Object.assign({}, currentTargets);
  // console.log(
  //   `开始 time：${current_loop_index} 检查，targets：${JSON.stringify(
  //     nextTargets
  //   )}`
  // );
  // 1. 检查完结点
  for (let target in currentTargets) {
    if (finish_map[target]) {
      // 防止没有删除已经完成的
      delete nextTargets[target];
    } else if (currentTargets[target] === 0) {
      // 标记完成
      finish_map[target] = current_loop_index;
      // 删除
      delete nextTargets[target];
      // 添加下一轮需要加的对象
      if (source_target_map[target]) {
        mergeInfo(nextTargets, source_target_map[target]);
      }
    }
  }
  // console.log(
  //   `完结点检查完毕，待检测个数 ${
  //     Object.keys(nextTargets).length
  //   }，${JSON.stringify(nextTargets)}`
  // );
  // console.log(
  //   `完结点检查完毕，完成个数 ${
  //     Object.keys(finish_map).length
  //   }，${JSON.stringify(finish_map)}`
  // );

  if (
    Object.keys(finish_map).length === nodes_length ||
    Object.keys(nextTargets).length === 0
  ) {
    // console.log(`完结`);
    return;
  }

  // 2. 递减
  step = Infinity;
  for (let target in nextTargets) {
    step = Math.min(nextTargets[target], step);
  }
  for (let target in nextTargets) {
    nextTargets[target] -= step;
  }
  // console.log(
  //   `递减完毕，step：${step}，targets：${JSON.stringify(nextTargets)}`
  // );

  // 3. 递归
  current_loop_index += step;
  // console.log(
  //   "================================================================"
  // );
  checkNext(nextTargets);
};
// @lc code=end

// 范例

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  const A = new Array(n + 1);
  const dist = new Array(n + 1).fill(-1);
  const S = new Array(n + 1).fill(false);
  for (let i = 0; i <= n; i++) {
    A[i] = new Array(n + 1).fill(256);
  }

  times.forEach((t) => {
    A[t[0]][t[1]] = t[2];
    if (t[0] === k) {
      dist[t[1]] = t[2];
    }
  });
  dist[k] = 0;
  S[k] = true;

  for (let i = 1; i < n; i++) {
    var mindist = 256;
    var u = k;
    for (let j = 1; j <= n; j++) {
      if (!S[j] && dist[j] >= 0 && dist[j] < mindist) {
        u = j;
        mindist = dist[j];
      }
    }
    S[u] = true;
    for (let j = 1; j <= n; j++) {
      if (!S[j] && A[u][j] < 256) {
        if (dist[u] + A[u][j] < dist[j] || dist[j] < 0) {
          dist[j] = dist[u] + A[u][j];
        }
      }
    }
  }

  var max = -1;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === -1) return -1;
    if (dist[i] > max) max = dist[i];
    // if(dist[i]===35) return i;
  }
  return max;
};

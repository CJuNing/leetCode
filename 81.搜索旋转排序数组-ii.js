/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
    if (!nums) return false;
    var startIndex = 0,
        endIndex = nums.length - 1,
        middleIndex;
    while (startIndex <= endIndex) {
        middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
        if (nums[middleIndex] === target ||
            nums[startIndex] === target ||
            nums[endIndex] === target) {
            return true;
        }

        if (nums[startIndex] <= nums[middleIndex]) {
            if (nums[startIndex] < target && target < nums[middleIndex]) {
                endIndex = middleIndex - 1;
            } else {
                startIndex = middleIndex + 1;
            }
        } else {
            if (nums[middleIndex] < target && target < nums[endIndex]) {
                startIndex = middleIndex + 1;
            } else {
                endIndex = middleIndex - 1;
            }
        }
    }

    return false
};
// @lc code=end
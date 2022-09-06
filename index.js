const express = require("express");
const ExpressError = require("./expressError");

const app = express();

app.use((req, res, next) => {
  console.log("The Server Got a Request!");
  next();
});

app.get("/mean", (req, res, next) => {
  try {
    debugger;
    if (!req.query.nums) throw new ExpressError("Nums are required", 400);
    const nums = req.query.nums.split(",");
    let sum = 0;
    for (let num of nums) {
      if (isNaN(Number(num))) {
        throw new ExpressError(`${num} is not a number`, 400);
      } else {
        sum += Number(num);
      }
    }
    let mean = sum / nums.length;
    return res.json({
      operation: "mean",
      value: mean,
    });
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  try {
    debugger;
    if (!req.query.nums) throw new ExpressError("Nums are required", 400);
    const numsString = req.query.nums.split(",");
    let nums = [];
    for (let num of numsString) {
      if (isNaN(Number(num))) {
        throw new ExpressError(`${num} is not a number`, 400);
      } else if (num != "") {
        nums.push(Number(num));
      }
    }
    nums.sort();
    let median;
    if (nums.length % 2 === 1) {
      median = nums[Math.floor(nums.length / 2)];
    } else {
      median = (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
    }
    return res.json({
      operation: "median",
      value: median,
    });
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    debugger;
    if (!req.query.nums) throw new ExpressError("Nums are required", 400);
    const numsString = req.query.nums.split(",");
    let nums = [];
    for (let num of numsString) {
      if (isNaN(Number(num))) {
        throw new ExpressError(`${num} is not a number`, 400);
      } else if (num != "") {
        nums.push(Number(num));
      }
    }
    const uniqueNums = new Set(nums);
    let mode;
    for (let num of uniqueNums) {
      if (!mode) {
        mode = num;
        continue;
      }
      if (
        nums.filter((number) => number == num).length >
        nums.filter((number) => number == mode).length
      ) {
        mode = num;
      }
    }
    return res.json({
      operation: "mode",
      value: mode,
    });
  } catch (e) {
    next(e);
  }
});

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.msg;
  res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

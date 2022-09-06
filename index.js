const express = require("express");
const ExpressError = require("./expressError");
const { findMean, findMedian, findMode } = require("./helpers");

const app = express();

app.use((req, res, next) => {
  console.log("The Server Got a Request!");
  next();
});

app.get("/mean", (req, res, next) => {
  try {
    debugger;
    if (!req.query.nums) throw new ExpressError("Nums are required", 400);
    const numsString = req.query.nums.split(",");
    let nums = [];
    for (let num of numsString) {
      if (isNaN(Number(num))) {
        throw new ExpressError(`${num} is not a number`, 400);
      } else {
        nums.push(Number(num));
      }
    }

    return res.json({
      operation: "mean",
      value: findMean(nums),
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
    return res.json({
      operation: "median",
      value: findMedian(nums),
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
    return res.json({
      operation: "mode",
      value: findMode(nums),
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

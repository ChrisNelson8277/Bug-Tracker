import React from "react";
import bugModel from "../Models/bugModel";

export const retrieveBugs = () => {
  let data = [];

  data.push(
    new bugModel({
      _id: 23456789,
      name: "Crash on Load",
      details: "Crashes after 3 seconds",
      steps: "Open application and it will crash",
      version: "v1.0",
      assigned: "Chris Nelson",
      creator: "Vinnys apizza",
      priority: 1,
      time: "11:28",
    })
  );
  data.push(
    new bugModel({
      _id: 23456789,
      name: "Crash on Load",
      details: "Crashes after 3 seconds",
      steps: "Open application and it will crash",
      version: "v1.0",
      assigned: "Chris Nelson",
      creator: "Vinnys apizza",
      priority: 3,
      time: "11:28",
    })
  );
  let sorted = data.sort((a, b) => {
    return a.priority - b.priority;
  });
  return sorted;
};

const { homedir } = require("os");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.join(homedir(), ".twinesis.json"), {
  defaultValue: {
    firstName: "",
    lastName: ""
  }
});
const db = low(adapter);

module.exports = db;

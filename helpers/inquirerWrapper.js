const inquirer = require("inquirer");

const confirm = async function(message) {
  const { answer } = await inquirer.prompt([
    {
      type: "confirm",
      message,
      name: "answer",
      default: false
    }
  ]);

  return answer;
};

const getString = async function(message) {
  const { string } = await inquirer.prompt([
    {
      type: "input",
      message,
      name: "string"
    }
  ]);

  return string;
};

const getOne = async function(message, choices, def) {
  const { selected } = await inquirer.prompt([
    {
      type: "list",
      message,
      name: "selected",
      choices,
      pageSize: choices.length,
      default: def
    }
  ]);

  return selected;
};

const getMany = async function(message, choices, def) {
  const { selected } = await inquirer.prompt([
    {
      type: "checkbox",
      message,
      name: "selected",
      choices,
      default: def,
      pageSize: choices.length,
      validate(selected) {
        return selected.length ? true : "No service selected!";
      }
    }
  ]);

  return selected;
};

module.exports = {
  confirm,
  getString,
  getOne,
  getMany
};

const inquirer = require("inquirer");
const db = require("../utils/db");
const { Observable } = require("rxjs");

module.exports = async function() {
  const observe = Observable.create(async function(obs) {
    obs.next({
      type: "input",
      name: "firstName",
      message: "What's your first name"
    });

    obs.next({
      type: "input",
      name: "lastName",
      message: "What's your last name",
      default: function() {
        return "Doe";
      }
    });
    obs.complete();
  });

  const answers = await inquirer.prompt(observe);

  db.set("firstName", answers.firstName).write();
  db.set("lastName", answers.lastName).write();
};

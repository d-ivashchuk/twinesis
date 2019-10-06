const inquirer = require("inquirer");
const db = require("../utils/db");
const { Observable } = require("rxjs");

module.exports = async function() {
  const observe = Observable.create(async function(obs) {
    obs.next({
      type: "input",
      name: "twitterKey",
      message: "Provide the key of your twitter app"
    });

    obs.next({
      type: "input",
      name: "twitterSecret",
      message: "Provide the secret of your twitter app"
    });

    obs.next({
      type: "input",
      name: "tokenKey",
      message: "Provide the token key of your twitter app"
    });

    obs.next({
      type: "input",
      name: "tokenSecret",
      message: "Provide the token secret of your twitter app"
    });
    obs.complete();
  });

  const answers = await inquirer.prompt(observe);

  db.set("twitterKey", answers.twitterKey).write();
  db.set("twitterSecret", answers.twitterSecret).write();
  db.set("tokenKey", answers.tokenKey).write();
  db.set("tokenSecret", answers.tokenSecret).write();
};

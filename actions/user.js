const { getUserInfo } = require("../helpers/twitter");
const { getString } = require("../helpers/inquirerWrapper");
const chalk = require("chalk");
const boxen = require("boxen");

module.exports = async function() {
  const answer = await getString("Provide your twitter handler");
  const user = await getUserInfo(answer);
  console.log(
    boxen(
      `\n${chalk.magenta.bold(answer)} has ${chalk.green(
        user.followers_count
      )} followers.\nFollows ${chalk.green(
        user.friends_count
      )} people.\nWith ${chalk.green(user.statuses_count)} tweets.`,
      { padding: 1, borderStyle: "double" }
    )
  );
};

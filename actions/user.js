const { getUserInfo } = require("../helpers/twitter");
const { getString } = require("../helpers/inquirerWrapper");
const chalk = require("chalk");

module.exports = async function() {
  const answer = await getString("Provide your twitter handler");
  const user = await getUserInfo(answer);
  console.log(
    `\n${chalk.black.bgYellow.bold(answer)} has ${chalk.green(
      user.followers_count
    )} followers.\nFollows ${chalk.green(
      user.friends_count
    )} people.\nWith ${chalk.green(user.statuses_count)} tweets.`
  );
};

const { getUserInfo } = require("../helpers/twitter");
const { getString } = require("../helpers/inquirerWrapper");
const chalk = require("chalk");
const boxen = require("boxen");

module.exports = async function({ args }) {
  let name;
  if (args.name) {
    name = await args.name;
  } else {
    name = await getString("Provide your twitter handler");
  }
  const user = await getUserInfo(name);
  console.log(
    boxen(
      `\n${chalk.magenta.bold(name)} has ${chalk.green(
        user.followers_count
      )} followers.\nFollows ${chalk.green(
        user.friends_count
      )} people.\nWith ${chalk.green(user.statuses_count)} tweets.`,
      { padding: 1, borderStyle: "double" }
    )
  );
};

const chalk = require("chalk");
const moment = require("moment");
const shortUrl = require("node-url-shortener");
const ora = require("ora");
const inquirer = require("inquirer");
const { Observable } = require("rxjs");

const { getTweets } = require("../helpers/twitter");
const { getString } = require("../helpers/inquirerWrapper");

module.exports = async function() {
  try {
    const observe = Observable.create(async function(obs) {
      obs.next({
        type: "input",
        name: "twitterHandler",
        message: "What's the twitter handler?"
      });

      obs.next({
        type: "list",
        name: "sortVar",
        message: "How would you like to sort",
        choices: ["Likes 💓", "Retweets 🔁"],
        default: 0
      });
      obs.complete();
    });

    const answers = await inquirer.prompt(observe);

    const spinner = ora(
      `Loading tweets for ${chalk.green(answers.twitterHandler)}`
    );
    spinner.start();
    const tweets = await getTweets(answers.twitterHandler);
    if (!tweets.error && tweets.length) {
      spinner.stop();
      const displayedTweets = tweets
        .map(v => ({
          text: v.full_text,
          tweetId: v.id_str,
          createdAt: v.created_at,
          likes: v.favorite_count,
          retweets: v.retweet_count,
          isReply: v.in_reply_to_status_id,
          isRetweet: v.retweeted_status || v.is_quote_status
        }))
        .filter(v => !v.isReply && !v.isRetweet)
        .sort((a, b) => {
          if (answers.sortVar.includes("Likes")) {
            return a.likes - b.likes;
          } else if (answers.sortVar.includes("Retweets")) {
            return a.retweets - b.retweets;
          }
        });
      displayedTweets.forEach(v =>
        console.log(
          `${chalk.green(v.text)}\n\n💗 ${chalk.red(v.likes)}\n🔁 ${chalk.cyan(
            v.retweets
          )}\n\n${chalk.yellow(
            moment(v.createdAt).format("YYYY-MM-DD")
          )} - ${chalk.yellow(
            moment(v.createdAt).format("HH:mm")
          )}\n${chalk.gray(
            `https://twitter.com/42/status/${v.tweetId}`
          )}\n${"-".repeat(process.stdout.columns)}`
        )
      );
    } else {
      spinner.fail(
        `Failed to fetch the tweets. ${
          tweets.error === 32
            ? `Please provide your twitter app credentials with ${chalk.green(
                "`twinesis reg`"
              )}`
            : tweets.error === 34
            ? `Could not find user with such username`
            : ""
        }`
      );
    }
  } catch (err) {
    console.log(err);
  }
};

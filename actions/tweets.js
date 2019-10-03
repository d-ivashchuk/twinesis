const { getTweets } = require("../helpers/twitter");
const { getString } = require("../helpers/inquirerWrapper");
const chalk = require("chalk");

module.exports = async function() {
  const answer = await getString("Provide your twitter handler");
  const tweets = await getTweets(answer);
  const displayedTweets = tweets
    .map(v => ({
      text: v.full_text,
      likes: v.favorite_count,
      retweets: v.retweet_count
    }))
    .sort((a, b) => a.likes - b.likes);
  displayedTweets.forEach(v =>
    console.log(
      `${chalk.green(v.text)}\n\n💗 ${chalk.red(v.likes)}\n🔁 ${chalk.blue(
        v.retweets
      )}\n`
    )
  );
};

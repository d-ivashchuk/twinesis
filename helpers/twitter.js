const db = require("../utils/db");

const TWITTER_KEY = db.getState().twitterKey;
const TWITTER_SECRET = db.getState().twitterSecret;
const TWITTER_TOKEN_KEY = db.getState().tokenKey;
const TWITTER_TOKEN_SECRET = db.getState().tokenSecret;

const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: TWITTER_KEY,
  consumer_secret: TWITTER_SECRET,
  access_token_key: TWITTER_TOKEN_KEY,
  access_token_secret: TWITTER_TOKEN_SECRET
});

const getUserInfo = async userScreenName => {
  try {
    const params = { screen_name: userScreenName };
    const user = await client.get("users/lookup", params);
    return user[0];
  } catch (err) {
    if (err[0].code === 17) {
      return { error: "BAD_USERNAME" };
    }
    if (err[0].code === 32) {
      return { error: "BAD_AUTH" };
    }
  }
};

const getTweets = async (userScreenName, maxId) => {
  try {
    let resultArray = [];
    const params = {
      screen_name: userScreenName,
      trim_user: true,
      tweet_mode: "extended",
      count: 200,
      max_id: maxId
    };
    const tweets = await client.get("statuses/user_timeline", params);
    resultArray = [...tweets];
    if (tweets.length === 200) {
      const nextTweets = await getTweets(
        userScreenName,
        tweets[tweets.length - 1].id
      );
      resultArray = [...resultArray, ...nextTweets];
    }
    return resultArray;
  } catch (err) {
    return { error: err[0].code };
  }
};

module.exports = { getUserInfo, getTweets };

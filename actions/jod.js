const axios = require("axios");
const { get } = require("lodash");
const { say } = require("cowsay");

module.exports = async function() {
  const result = await axios.get("https://api.jokes.one/jod");

  const joke = get(result, "data.contents.jokes[0].joke.text");

  if (joke) {
    console.log(say({ e: "oO", text: joke }));
  } else {
    console.log("Sry, no joke today...");
  }
};

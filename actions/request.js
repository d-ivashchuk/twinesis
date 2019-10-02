const ora = require("ora");
const axios = require("axios");
const { getString } = require("../helpers/inquirerWrapper");

const spinner = ora("Loading posts");

module.exports = async function() {
  const answer = await getString("Twitter handler");
  spinner.start();
  const posts = await axios.get(
    `https://jsonplaceholder.typicode.com/${answer}`
  );
  setTimeout(() => {
    spinner.stop();
    posts.data.forEach(v => console.log(v.title));
  }, 2000);

  const titles = posts.data.map(({ title }) => title);
};

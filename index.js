#!/usr/bin/env node
const program = require("commander");

const { jod, reg, request, user, tweets } = require("./actions/index");
const { getTweets } = require("./helpers/twitter");

program
  .command("user")
  .alias("userInfo")
  .description("Get current user info")
  .action(user);

program
  .command("tweets")
  .alias("twe")
  .description("Get current user tweets")
  .action(tweets);

program
  .command("reg")
  .alias("registration")
  .description("register")
  .action(reg);

program
  .version("1.0.0")
  .description("CLI")
  .parse(process.argv);

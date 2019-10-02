#!/usr/bin/env node
const program = require("commander");

const { jod, reg } = require("./actions/index");

program
  .command("jod")
  .alias("joke")
  .description("get joke of the day")
  .action(jod);

program
  .command("reg")
  .alias("registration")
  .description("register")
  .action(reg);

program
  .version("1.0.0")
  .description("CLI")
  .parse(process.argv);

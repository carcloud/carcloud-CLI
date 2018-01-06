#!/usr/bin/env node --harmony

var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var request = require('superagent');
var chalk = require('chalk');
var ProgressBar = require('progress');
var fs = require('fs');
var RSVP = require('rsvp');
var jsonfile = require('jsonfile');
var path = require('path');


program
  .command('client-sync <client>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .option('-c, --client <client>', 'The production domain name of the client.')
  .action(function (client) {
    if (client) {
      console.log("client sync");
      var Credentials = function() {
        return new RSVP.Promise(function(resolve, reject) {
          co(function *() {
            resolve({
              username: program.username || (yield prompt('username: ')),
              password: program.password || (yield prompt.password('password: '))
            });
          });
        });
      };
    }
  })
  .parse(process.argv);

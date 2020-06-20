const utils = require("./utils");
const contants = require("./constants");
const colors = require("colors");
const fs = require("fs");
const os = require("os");
const manageHosts = require("manage-hosts");
/**
 * This file exports all available processing that can be done on the hosts file
 */

module.exports = processes;
function processes() {
    var self = {};

    const hosts = new manageHosts();

    // Function that lists the ip and domains in hosts file
    self.list = function(optionPassed) {
        hosts.list(optionPassed);
    }

    // Wrapper to function that backs up the current hosts file to the file provided by user.
    self.backup = function() {
        return hosts.backup(true);
    }

    // Function that activate line or group number
    self.activate = function(optionPassed) {
        hosts.activate(optionPassed);
    };

    // Function that activate line or group number
    self.deActivate = function(optionPassed) {
        hosts.deActivate(optionPassed);
    };

    return self;
}


require("colors");
const os = require("os");
const manageHosts = require("@shvtp/manage-hosts");
/**
 * This file exports all available processing that can be done on the hosts file
 */

module.exports = processes;
function processes() {
    var self = {};

    const hosts = new manageHosts();

    const printStringLength = 150;

    // Function to print data on terminal
    function print(dataToPrint) {
        console.log(os.EOL + appendSpaces('\u2714       ACTIVE').bgWhite.red);
        console.log(appendSpaces('\u2718       INACTIVE').bgRed.white + os.EOL);
        if (Object.keys(dataToPrint).length === 0) {
            console.log('No entries found'.black.bgWhite + os.EOL);
        }
        for (const groupId in dataToPrint) {
            if (dataToPrint.hasOwnProperty(groupId)) {
                const element = dataToPrint[groupId];
                let groupIdOutput = appendSpaces('Group Id :           ' + groupId);
                console.log(groupIdOutput.bgWhite.black);
                let groupNameOutput = appendSpaces(
                    'Group Name :         ' + element.groupInfo.name.toUpperCase()
                );
                console.log(groupNameOutput.bgWhite.bold.magenta);
                let envOutput = '';
                if (element.groupInfo.env) {
                    envOutput = appendSpaces(
                        'Group Environment :  ' + element.groupInfo.env.toUpperCase()
                    );
                    console.log(envOutput.italic.bgWhite.red);
                }
                let output = appendSpaces("Active  Line    IP Domains");
                console.log(output.bgWhite.black);
                element.lineInfos.forEach(info => {
                    if(info.isValid) {
                        let lineOutput = (info.isActive ? '\u2714       ' : '\u2718       ') +
                            info.lineNumber +
                            (info.lineNumber < 100 ? (info.lineNumber < 10 ? '  ' : ' ') : '') +
                            "     " + info.ip;
                        info.domains.forEach((domain) => {
                            lineOutput += ' ' + domain;
                        });
                        let output = appendSpaces(lineOutput);
                        console.log(info.isActive ? output.red.bgWhite : output.white.bgRed);
                    }
                });
                console.log(os.EOL);
            }
        }
    }

    function appendSpaces(str) {
        let returnStr = str;
        if(str.length < printStringLength)
            for (let index = str.length; index < printStringLength; index++)
                returnStr += ' ';
        return returnStr
    }

    // Function that lists the ip and domains in hosts file
    self.list = function(optionPassed) {
        var dataToPrint = hosts.search(optionPassed);
        print(dataToPrint);
    }

    // Wrapper to function that backs up the current hosts file to the file provided by user.
    self.backup = function() {
        return hosts.backup(true);
    }

    // Function that activate line or group number
    self.activate = function(optionPassed) {
        var dataToPrint = hosts.activate(optionPassed);
        print(dataToPrint);
    };

    // Function that activate line or group number
    self.deActivate = function(optionPassed) {
        var dataToPrint = hosts.deActivate(optionPassed);
        print(dataToPrint);
    };

    return self;
}


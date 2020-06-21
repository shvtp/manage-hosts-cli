require("colors");
const os = require("os");
const manageHosts = require("manage-hosts");
/**
 * This file exports all available processing that can be done on the hosts file
 */

module.exports = processes;
function processes() {
    var self = {};

    const hosts = new manageHosts();

    const printStringLength = 120;

    // Function to print data on terminal
    function print(dataToPrint) {
        for (const groupId in dataToPrint) {
            if (dataToPrint.hasOwnProperty(groupId)) {
                const element = dataToPrint[groupId];
                let groupIdOutput = appendSpaces('Group Id : \t\t#' + groupId);
                let groupNameOutput = appendSpaces(
                    'Group Name : \t\t' + element.groupInfo.name.toUpperCase()
                );
                let envOutput = '';
                if (element.groupInfo.env) {
                    envOutput = appendSpaces(
                        'Group Environment : \t' + element.groupInfo.env.toUpperCase()
                    );
                }
                let output = appendSpaces("Line\tIP Domains") + os.EOL;
                let isActive = false;
                element.lineInfos.forEach(info => {
                    isActive = info.isActive;
                    let lineOutput = '#' + info.lineNumber + "\t" + info.ip;
                    info.domains.forEach((domain) => {
                        lineOutput += ' ' + domain;
                    });
                    output += appendSpaces(lineOutput) + os.EOL;
                });
                if (output !== '') {
                    console.log(isActive ? groupIdOutput.black.bgWhite : groupIdOutput.bgRed);
                    console.log(isActive ? groupNameOutput.magenta.bgWhite.bold : groupNameOutput.bgRed.yellow.bold);
                    if('' !== envOutput) {
                        console.log(
                            isActive ? envOutput.red.bgWhite.italic : envOutput.blue.bgRed.italic
                        );
                    }
                    console.log(isActive ? output.gray.bgWhite : output.black.bgRed);
                }
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


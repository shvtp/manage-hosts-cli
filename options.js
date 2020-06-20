const utils = require("./modules/utils")();
const processes = require("./modules/processes")();

// This object stores the properties of all options available for passing in arguments
// And a custom function key (callBackFn) which will be executed when that option is passed
const options = {
    l: {
        // Yargs option property mapping
        alias: 'list',
        describe: 'Shows the list of hosts in tabular format. You can search entries using line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
        boolean: true,
        depends: {
            options: ['L', 'G', 'g', 'e'],
            describe: 'Requires line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
            preferred: true
        },
        // Custom key to set function which will get executed when this option is passed as argument
        callBackFn: processes.list
    },
    v: {
        // Yargs option property mapping
        alias: 'version'
    },
    h: {
        // Yargs option property mapping
        alias: 'help'
    },
    b: {
        // Yargs option property mapping
        alias: 'backup',
        describe: 'Backups the current hosts file to ' + utils.getBackupFilePath(true),
        boolean: true,
        // Custom key to set function which will get executed when this option is passed as argument
        callBackFn: processes.backup
    },
    a: {
        alias: 'activate',
        describe: 'Activate entries. Requires line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
        depends: {
            options: ['L', 'G', 'g', 'e'],
            describe: 'Requires line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
            preferred: true,
            required: true
        },
        callBackFn: processes.activate
    },
    d: {
        alias: 'de-activate',
        describe: 'De-activate entries. Requires line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
        depends: {
            options: ['L', 'G', 'g', 'e'],
            describe: 'Requires line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
            preferred: true,
            required: true
        },
        callBackFn: processes.deActivate
    },
    L: {
        alias: 'line-number',
        requiresArg: true,
        conflicts: ['G', 'g'],
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        type: 'number',
        describe: 'The line number to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    },
    G: {
        alias: 'group-number',
        requiresArg: true,
        conflicts: 'g',
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        type: 'number',
        describe: 'The group number to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    },
    g: {
        alias: 'group-name',
        requiresArg: true,
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        type: 'string',
        describe: 'The group name to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    },
    e: {
        alias: 'env',
        requiresArg: true,
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        type: 'string',
        describe: 'The environment to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    }
};

module.exports = options;
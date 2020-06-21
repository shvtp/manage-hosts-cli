const processes = require("./modules/processes")();
const manageHosts = require("manage-hosts");

const hosts = new manageHosts();

// This object stores the properties of all options available for passing in arguments
// And a custom function key (callBackFn) which will be executed when that option is passed
const options = {
    l: {

        // Yargs option property mappings. Please check yargs documentation
        alias: 'list',
        describe: 'Shows the list of hosts in tabular format. You can search entries using line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
        boolean: true,

        // Following are custom keys. Not part of Yargs
        // Custom key to define dependant behaviour of options.
        depends: {

            // Other Options this option is dependant on
            options: ['L', 'G', 'g', 'e'],

            // Error message to display if dependancy check fails
            describe: 'Requires line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',

            // If this is set as true then callbackFn of this option will be called
            // instead of the dependant options.
            // Make sure this key is set as false in other dependant options
            preferred: true,

            // If this is true then an error will be thrown
            // if neither of the dependant options are passed as arguments
            required: false
        },

        // Custom key to set function which will get executed when this option is passed as argument
        callBackFn: processes.list
    },
    v: {
        alias: 'version'
    },
    h: {
        alias: 'help'
    },
    b: {

        alias: 'backup',
        describe: 'Backups the current hosts file to ' + hosts.getBackupFilePath(true),
        boolean: true,
        callBackFn: processes.backup
    },
    a: {
        alias: 'activate',
        describe: 'Activate entries. Requires line number (-L | --line-number) or group number (-G | --group-number) or group name (-g | --group-name) or environment (-e | --env)',
        type: 'boolean',
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
        type: 'boolean',
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
        type: 'number',
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        describe: 'The line number to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    },
    G: {
        alias: 'group-number',
        requiresArg: true,
        conflicts: 'g',
        type: 'number',
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        describe: 'The group number to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    },
    g: {
        alias: 'group-name',
        requiresArg: true,
        type: 'string',
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        describe: 'The group name to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    },
    e: {
        alias: 'env',
        requiresArg: true,
        type: 'string',
        depends: {
            options: ['a', 'd', 'l'],
            describe: 'Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries',
            required: true
        },
        describe: 'The environment to be viewed or activated or de-activated. Requires (-l | --list) to view host entries or (-a | --activate) to activate host entries or (-d | --de-activate) to de activate host entries'
    }
};

module.exports = options;
#! /usr/bin/env node

const options = require("./options");
const yargs = require("yargs");


(function main() {
    // Parsing arguments
    var argv = yargs.options(options).argv;

    // Not enough arguments passed. Show help and exit.
    if (Object.keys(argv).length == 2) {
        yargs.showHelp();
        return;
    }

    function getCamelCased(str) {
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    }

    // Populate a list of all valid options
    var validOptions = Object.keys(options);
    validOptions.forEach((option) => {
        validOptions.push(getCamelCased(options[option].alias));
        validOptions.push(options[option].alias);
    });

    // Keys added by yargs by default
    validOptions.push('_');
    validOptions.push('$0');

    // Check for invalid arguments
    var invalidArgs = Object.keys(argv).filter(isInvalidOption);
    if (invalidArgs.length) {
        console.log('Invalid arguments passed : ' + invalidArgs.join(', '));
        yargs.showHelp();
        return;
    }

    // Return true if argument option is present in list of valid options
    function isInvalidOption(option) {
        return -1 === validOptions.indexOf(option);
    }

    /**
     * Checks if dependant options are present.
     * If present then at the least one of them should have been passes as an argument in command line.
     * 
     * @param {*} optionProperties 
     */
    function getDependantOptions(optionProperties) {

        // Default true. If no dependant options present in option properties
        var optionsToCheck,
            dependantOptions = {options: {}, isValid: true};

        // If dependant options are present in option properties
        if (optionProperties.depends && (optionsToCheck = optionProperties.depends.options)) {
            if (typeof optionsToCheck === 'string') {

                // If dependant options is a single value as string
                dependantOptions.isValid = Boolean(argv[optionsToCheck]);

                // Argument value was passed in command line for dependant option - optionsToCheck
                if (dependantOptions.isValid)
                    dependantOptions.options[optionsToCheck] = argv[optionsToCheck];
            } else {

                // If dependant options are an array of options.
                // Dependancy check fails if neither of them are passed in comand line.
                var isValid = !optionProperties.depends.required;
                optionsToCheck.forEach(opt => {
                    if ((isValid = isValid || argv[opt]) && argv[opt]) {

                        // Argument value was passed in command line for dependant option - opt
                        dependantOptions.options[opt] = argv[opt];
                    }
                });
                dependantOptions.isValid = Boolean(isValid);
            }
        }
        return dependantOptions;
    }

    // Processing arguments
    for(const option in options) {

        // Option properties object containing info about option
        let optionProperties = options[option];

        // Argument value obtained while parsing arguments.
        // If argValue is present then the option was passed as argument
        let argValue = argv[option];
        try {

            // Is option passed as argument
            if (argValue) {

                // Validating dependent options. Show help if dependancy check fails.
                let dependantOptions = getDependantOptions(optionProperties);
                if (!dependantOptions.isValid) {
                    yargs.showHelp();
                    console.log("Missing required options. " + optionProperties.depends.describe || "Please check the help menu.")
                    return;
                }
                
                // Execute callBackFn if option is passed as argument
                // and call back function is defined in option properties
                if (
                    // Callback property present
                    optionProperties.callBackFn &&
                    
                    // Is call back property callable
                    typeof optionProperties.callBackFn === 'function'
                ) {
                    options[option].callBackFn(dependantOptions.options);
                }
            }
        } catch (error) {
            console.error(
                "Error occurred while parsing option values for option --" + optionProperties.alias + " (-" + option + ")"
            );
            console.error(error);
        }

    }
})();
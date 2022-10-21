const yargs = require("yargs");

yargs
    .scriptName("print-lorem-ipsum")
    .command('test', 'Print lorem ipsum to reproduce truncation.', (yargs) => {
        yargs.option('blocking', {
            type: 'boolean',
            default: false,
            global: false,
            boolean: true,
            describe: 'Whether or not to set stdout and stderr to be blocking before the command runs.'
        })
    }, async function (args) {
        console.log(process.stdout._handle.blocking);

        // If setBlocking(true) is called within the script, no truncation happens regardless of piping.
        if (args.blocking) {
            process.stdout._handle.setBlocking(true);
            process.stderr._handle.setBlocking(true);
        }

        const text = [
            ...[...new Array(1000)]
                .map(x => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..."),
            "",
            "┌────────────────────────────────┐",
            "│                                │",
            "│   End of lorem ipsum output.   │",
            "│                                │",
            "└────────────────────────────────┘",
            ""
        ].join("\n");

        console.log(text)

        throw new Error("Throwing an error to reproduce truncation.");
    })
    .help()
    .argv

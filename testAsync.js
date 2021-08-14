const inquirer = require("inquirer");

(async () => {
    const ans1 = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            default: "Jake",
        },
    ]);
    const ans2 = await inquirer.prompt([
        {
            type: "confirm",
            name: "summary",
            message: "Is this information correct? Your name is:" + ans1.name,
        },
    ]);
    return { ...ans1, ...ans2 };
})
    ()
    .then(console.log)
    .catch(console.error);
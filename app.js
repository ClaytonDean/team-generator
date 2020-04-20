const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function initialize() {
    inquirer.prompt({
        type: "list",
        message: "who would you like to add?",
        name: "role",
        choices: [
            "manager",
            "engineer",
            "intern",
            "done"
        ]
    }).then(function (response) {
        switch (response.role) {
            case "manager":
                manager();
                break;
            case "engineer":
                engineer();
                break;
            case "intern":
                intern();
                break;
            default:
                finish();
        }
    })
}
initialize();

function manager() {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter name of Manager: "
    },
    {
        type: "input",
        name: "id",
        message: "Enter ID of manager: "
    },
    {
        type: "input",
        name: "email",
        message: "Enter email of manager: "
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter office number of manager: "
    }

    ]).then(function (response) {
        team.push(new Manager(response.name, response.id, response.email, response.officeNumber)),

            initialize();
    })
}

function engineer() {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter name of engineer: "
    },
    {
        type: "input",
        name: "id",
        message: "Enter ID of engineer: "
    },
    {
        type: "input",
        name: "email",
        message: "Enter email of engineer: "
    },
    {
        type: "input",
        name: "github",
        message: "Enter Github of engineer: "
    }

    ]).then(function (response) {
        team.push(new Engineer(response.name, response.id, response.email, response.github)),
            initialize();
    })
}

function intern() {
    return inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter name of intern: "
    },
    {
        type: "input",
        name: "id",
        message: "Enter ID of intern: "
    },
    {
        type: "input",
        name: "email",
        message: "Enter email of intern: "
    },
    {
        type: "input",
        name: "school",
        message: "Enter ID of intern: "
    }

    ]).then(function (response) {
        team.push(new Intern(response.name, response.id, response.email, response.school)),
            initialize();
    })
}

const team = []

function finish() {
    fs.writeFile(outputPath, render(team), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("success")
    })
}



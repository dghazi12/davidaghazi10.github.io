const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let results = [];

async function employee() {

    await inquirer.prompt([

        {
            message: "Please enter name.",
            name: "name"
        },
        {
            message: "Please enter company ID.",
            name: "id"
        },
        {
            message: "Please enter an email address.",
            name: "email"
        },
        {
            type: "list",
            message: "What is their role in the company?",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        }

    ]).then((data) => {

        name = data.name;
        id = data.id;
        role = data.role;
        email = data.email;

    })

    switch (role) {

        case "Manager":

            await inquirer.prompt([

                {
                    message: "What is the office number of the Manager?",
                    name: "officeNumber"
                }

            ]).then((data) => {

                const manager = new Manager(name, id, email, data.officeNumber)
                results.push(manager)

                teamMember()
                renderResults()

            })

        break;

        case "Engineer":

            await inquirer.prompt([

                {
                    message: "What is the GitHub username of the Engineer?",
                    name: "github"
                }

            ]).then((data) => {

                const engineer = new Engineer(name, id, email, data.github)
                results.push(engineer)

                teamMember()
                renderResults()

            })

        break;

        case "Intern":

            await inquirer.prompt([
                {
                    message: "What is the name of the school the Intern is attending?",
                    name: "school"
                }

            ]).then((data) => {

                const intern = new Intern(name, id, email, data.school)
                results.push(intern)

                teamMember()
                renderResults()

            })

        break;

    }

}

employee();

function teamMember() {

    inquirer.prompt([

        {
            type: "list",
            message: "Would you like to add another team member?",
            name: "addmember",
            choices: ["Yes", "No"]
        }

    ]).then((data) => {

        if (data.addmember === "Yes") {

            console.log("Enter new members information below!")
            employee()

        }else{ 
            console.log("Your team is built!!!")
        }

    })

}

function renderResults() {

    teamInfo = render(results);

    fs.writeFile("./output/team.html", teamInfo, err => {

        if (err) {
            throw err;
        }

    })

}
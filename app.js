const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function totalEmployees() {
    console.log("Let's begin creating your team!");

    let teamSize;

    await inquirer.prompt(
        {
            type: 'number',
            message: 'How many team members would you like to include in your Employee Summary?',
            name: "total"
        }
    ).then((data) => {
        teamSize = data.total

        if (teamSize === 0) {
            console.log("This is not a very impressive team :(");
            return;
        }

        mainQuestions()

    });

}

function employees() {
    return inquirer.prompt([
        {
            message: "What is your name?",
            name: "name"
        },
        {
            message: "What is your company ID?",
            name: "id"
        },
        {
            message: "What is your email address?",
            name: "email"
        }
    ]);

}

async function mainQuestions() {
    try {
        const mainAnswers = await employees();
        role()

        // console.log(mainAnswers)

    } catch (err) {
        console.log(err);
    }
}

totalEmployees()

function role() {

    inquirer.prompt(
        {
            type: "checkbox",
            message: "Please select the following that best applies to you.",
            name: "title",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
            ]
        }
    ).then ((res) => {

        let title = res.title.toString();

        if (title === "Manager"){
            inquirer.prompt(
                {
                    message: "What is your office number?",
                    name: "office"
                }).then((data) => {
                    console.log(data.office)
                })
        }else if (title === "Engineer") {
            inquirer.prompt(
                {
                    message: "What is your GitHub username?",
                    name: "github"
                }).then((data) => {
                    console.log(data.github)
                })
        }else {
            inquirer.prompt(
                {
                    message: "What is the name of your school?",
                    name: "school"
                }).then((data) => {
                    console.log(data.school)
                })
        }

    });

}




// Create a prompt that asks how many employees are on the team;
// Have to create a loop that will ask all of the employee class questions - this is where I will wrap the prompt in the employee class
// After that, it will what their role is.
// It will prompt a question based on that role that will be sent to the specific class. 




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

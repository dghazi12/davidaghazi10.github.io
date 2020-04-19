const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamSize;
let i = 0;

let results = []

function checkTeamSize(){
    if (i < teamSize){
        i++;
        console.log("Please input information for the new team member!")
        mainQuestions()
    }else if (teamSize === 0) {
        console.log("This is not a very impressive team :(");
    }else{
        console.log(results)
        console.log("Your team is built!")

        employeeInfo = render(results);
        fs.writeFile("./output/team.html", employeeInfo, err => {
        if (err) {
            throw err;
        } console.log("Successfully written to team.html file");
        })
    }
}

async function totalEmployees() {
    console.log("Let's begin creating your team!");

    await inquirer.prompt(
        {
            type: 'number',
            message: 'How many team members would you like to include in your Employee Summary?',
            name: "total"
        }
    ).then((data) => {
        teamSize = data.total
        checkTeamSize()
        
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
    ]).then ((res) => {
        let employee = [res.name,res.id, res.email]
        results.push(...employee)
    })

}

async function mainQuestions() {
    try {
        await employees();
        role()

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
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
            ]
        }
    ).then ((res) => {

        let role = (res.role).toString();
        results.push(role)

        if (role === "Manager"){
            inquirer.prompt(
                {
                    message: "What is your office number?",
                    name: "officeNumber"
                }).then((data) => {
                    results.push(data.officeNumber)
                    checkTeamSize()

                })
        }else if (role === "Engineer") {
            inquirer.prompt(
                {
                    message: "What is your GitHub username?",
                    name: "github"
                }).then((data) => {
                    results.push(data.github)
                    checkTeamSize()

                })
        }else {
            inquirer.prompt(
                {
                    message: "What is the name of your school?",
                    name: "school"
                }).then((data) => {
                    results.push(data.school)
                    checkTeamSize()

                })
                
        }

    });

}
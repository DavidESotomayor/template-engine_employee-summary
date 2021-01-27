const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const team = [];

// asks user if they would like to add another user or create the html
const confirmAdd = () => {
    inquirer.prompt({
        type: 'confirm',
        name: 'addMember',
        message: 'Would you like to add another team member?'
    }).then(response => {
        if (response.addMember) {
            addTeamMember()
        } else {
            createHTML()
        }
    })
}

// creates the HTML and creates a folder where it stores its created file
const createHTML = () => {
    console.log('New HTML created!');
    render(team)
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdir(OUTPUT_DIR, () => {
            fs.writeFile(outputPath, render(team), (err) => {
                if (err) throw err;
            })
        })
    }
}

// main function that asks questions to describe the new team members
const addTeamMember = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your id number?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is your role on the team?',
                choices: ["Manager", "Engineer", "Intern"]
            }
        ])
    .then(answers => {
        // asks specific questions based on role and instantiates a new object
        if (answers.role === 'Manager') {
            inquirer.prompt({
                type: 'input',
                name: 'manager',
                message: 'What is your office number?'
            }).then(manager => {
                Object.assign(answers, manager)
                team.push(new Manager(answers.name, answers.id, answers.email, answers.role, answers.manager))
                confirmAdd()
            })
        } else if (answers.role === 'Engineer') {
            inquirer.prompt({
                type: 'input',
                name: 'engineer',
                message: 'What is your GitHub username?'
            }).then(engineer => {
                Object.assign(answers, engineer)
                team.push(new Engineer(answers.name, answers.id, answers.email, answers.role, answers.engineer))
                confirmAdd()
            })
        } else {
            inquirer.prompt({
                type: 'input',
                name: 'intern',
                message: 'What is the name of your school?'
            }).then(intern => {
                Object.assign(answers, intern)
                team.push(new Intern(answers.name, answers.id, answers.email, answers.role, answers.intern))
                confirmAdd()
            })
        }
    })
    .catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    });
}

addTeamMember()

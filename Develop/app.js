// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
        // {
        //     type: 'list',
        //     name: 'office_number',
        //     message: 'What is your office number?',
        //     when: answers => answers.role === false
        // },
        // {
        //     type: 'list',
        //     name: 'github',
        //     message: 'What is your GitHub username?',
        //     when: answers => answers.role === false
        // },
        // {
        //     type: 'list',
        //     name: 'school',
        //     message: 'What is the name of your school?',
        //     when: answers => answers.role === false
        // }
    ])
    .then(answers => {
        console.log(answers);
        if ( answers.role === 'Manager' ) {
            inquirer.prompt({
                type: 'input',
                name: 'manager',
                message: 'What is your office number?'
            }).then(manager => {
                console.log(manager);
                Object.assign(answers, manager)
                console.log(answers);
            })
        } else if ( answers.role === 'Engineer' ) {
            inquirer.prompt({
                type: 'input',
                name: 'engineer',
                message: 'What is your GitHub username?'
            }).then(engineer => {
                console.log(engineer);
                Object.assign(answers, engineer)
                console.log(answers);
            })
        } else {
            inquirer.prompt({
                type: 'input',
                name: 'intern',
                message: 'What is the name of your school?'
            }).then(intern => {
                console.log(intern);
                Object.assign(answers, intern)
                console.log(answers);
            })
        }
    })
    .catch(console.log('Error; Please rerun program'))


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
// for the provided `render` function to work! ```

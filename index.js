// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const generateMarkdown = require('./Develop/utils/generateMarkdown')

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Please enter the title of your application.',
        name:'title',

    },
    {
        type:'input',
        message: 'Please write a short description about your application',
        name:'description',
    },
    {
        type:'input',
        message: 'Please describe the installation of your application.',
        name:'installation',

    },
    {
        type:'input',
        message:"Please let us know how to use your application",
        name:'usage'
    },
    {
        type:'input',
        message: 'Please enter the contributor(s) of your application',
        name:'contributor'
    },
    {
        type:'input',
        message: 'Please include instructions on how to test your application',
        name:'test'
    },
    {
        type:'list',
        message: 'Please select a license you want',
        name: 'license',
        choices:['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
    },
    {
        type:'input',
        message: "Please enter your GitHub username",
        name:'username'
    },
    {
        type:'input',
        message: "Please include your email address",
        name:'email'
    }


];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }

        console.log("Congratulations! Your README file has been successfully generated.")
    })
}

const writeFile = util.promisify(writeToFile)

// Create a function to initialize app
// Use a asyncfunction to use the await syntax 
async function init() {
    try {
        const userInput = await inquirer.prompt(questions);
        const markdown = generateMarkdown(userInput);

        await writeFile("README.md", markdown);


    } catch (error){
        console.log(error);
    }
}

// Function call to initialize app
init();

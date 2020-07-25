const Employee = require("./Employee.js");
const Manager = require("./Manager.js");
const Engineer = require("./Engineer.js");
const Intern = require("./Intern.js");
const inquirer = require("inquirer");
const fs = require('fs');

class App {

    constructor() {

        //List of employees that gets added
        this.employees = [];
        
        this.employeePrompt = [
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your employee id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your work email?",
                name: "email"
            }
        ];//.concat creates a new array following the order for each argument
        this.managerPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "What is your office number?",
                name: "officeN"
            }
        ]);
        this.engineerPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "What is your github link?",
                name: "github"
            }
        ]);
        this.internPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "What school are you from?",
                name: "school"
            }
        ]);
        
    }

    start() {
        this.nextEmployee();
    }

    end() {
        console.log("Team Profile Generated");
    }

    //prompts for employee role
    nextEmployee() {
        this.promptRole().then((role) => {
            if (role === "Exit") {
                this.renderHTML();
                this.end();
            }
            else {
                //prompt user for employee and add employee object to employees array
                this.promptInfo(role).then((data) => {
                    //create employee object with data received
                    switch (role) {
                        case "Manager":
                            this.employees.push(new Manager(data.name, data.id, data.email, data.officeN));
                            break;
                        case "Engineer":
                            this.employees.push(new Engineer(data.name, data.id, data.email, data.github));
                            break;
                        case "Intern":
                            this.employees.push(new Intern(data.name, data.id, data.email, data.school));
                            break;
                    }
                    //prompt for next employee
                    this.nextEmployee();
                });
            }
        });
    }

    //Prompt for roles
    promptRole() {
        return inquirer.prompt([
            {
                type: "list",
                message: "Enter your role",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "Exit"]
            }
        ]).then(function (data) {
            return (data.role);
        }).catch(function (error) {
            console.log(error);
        });
    }

    //prompt user for employee info and return it
    promptInfo(role) {
        switch (role) {
            case "Manager":
                return inquirer.prompt(this.managerPrompt).then(function (data) {
                    return data;
                });
            case "Engineer":
                return inquirer.prompt(this.engineerPrompt).then(function (data) {
                    return data;
                });
            case "Intern":
                return inquirer.prompt(this.internPrompt).then(function (data) {
                    return data;
                });
        }
    }
    // reads, write and render html (index.html)
    renderHTML() {
        fs.readFile('main.html', 'utf8', (err, htmlString) => {

            htmlString = htmlString.split("<script></script>").join(this.getScript());

            fs.writeFile('index.html', htmlString, (err) => {
                // throws an error
                if (err) throw err;
                
                console.log('Done! It is now generated!');
            });
        });

    }

    //return javascript that generates an employee information card per employee in the employees list
    getScript() {

        var scripts = ``;
        this.employees.forEach(e => {
            var field = "";
            var iconClass = "";
            switch (e.getRole()) {
                case "Manager":
                    field = `Office #: ${e.getOfficeNumber()}`;
                    iconClass = `users`;
                    break;
                case "Engineer":
                    field = `Github: ${e.getGithub()}`;
                    iconClass = `cogs`;
                    break;
                case "Intern":
                    field = `School: ${e.getSchool()}`;
                    iconClass = `user-graduate`;
                    break;
            }

            var cardScript = `
            <script>
            var col = $('<div class="col-4">');
            var card = $('<div class="card mx-auto border-info mb-3" style="max-width: 18rem;">');
            var header1 = $('<div class="card-header text-center h4">');
            header1.text("${e.getName()}");
            var header2 = $('<div class="card-header text-center">');
            var icon = $('<i class="fas fa-${iconClass}">');
            header2.text(" ${e.getRole()}");
            header2.prepend(icon);

            var cardBody = $('<div class="card-body text-info">');
            var cardTitle = $('<h5 class="card-title">');
            cardTitle.text("Employee Information:");
            var cardText = $('<p class="card-text">');
            cardText.text("ID: ${e.getId()}");
            var cardText2 = $('<p class="card-text">');
            cardText2.text("Email: ${e.getEmail()}");
            var cardText3 = $('<p class="card-text">');
            cardText3.text("${field}");
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardBody.append(cardText2);
            cardBody.append(cardText3);
    
            card.append(header1);
            card.append(header2);
            card.append(cardBody);
            col.append(card);
            $("#cards").append(col);    
            </script>        
            `;
            scripts += cardScript;

        });

        return scripts;
    }

}

module.exports = App;
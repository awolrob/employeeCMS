//Include packages needed for this application
const inquirer = require('inquirer');
const Employee_db = require('./db/connection');
const cTable = require('console.table');
const db = require('./db/connection');

/* VARIABLES */
const employeeArr = [];

console.log(",----------------------------------------------------.");
console.log("|    _____                 _                         |");
console.log("|   | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |");
console.log("|   |  _| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |");
console.log("|   | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |");
console.log("|   |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |");
console.log("|                   |_|            |___/             |");
console.log("|    __  __                                          |");
console.log("|   |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |");
console.log("|   | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|       |");
console.log("|   | |  | | (_| | | | | (_| | (_| |  __/ |          |");
console.log("|   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |");
console.log("|                            |___/                   |");
console.log("|                                                    |");
console.log(",----------------------------------------------------'");

// TODO: Create an array of questions for user input
const menuQuestions = menuData => {
  console.log(`
    ====================
          Main Menu
    ====================
    `);
  return inquirer.prompt([
    {
      type: 'list',
      name: 'mainAction',
      default: "View All Employees',",
      message: 'What would you like to do?',
      choices: [
        { name: 'View All Employees', value: 'readEmp', },
        { name: 'View All Employees By Department', value: 'readEmpDpt', },
        { name: 'View All Employees By Manager', value: 'readEmpMrg', },
        { name: 'Add Employee', value: 'write', },
        { name: 'Remove Employee', value: 'delete', },
        { name: 'Update Employee Role', value: 'updateEmpRole', },
        { name: 'Update Employee Manager', value: 'updateEmpMrg', }
      ]
    }
  ])
};

function viewEmployees() {
  db.query("SELECT e.id as ID, e.first_name as FIRST_NAME, e.last_name as LAST_NAME, role.title as TITLE, department.name as DEPARTMENT, role.salary as SALARY, CONCAT(m.last_name, ', ', m.first_name) AS MANAGER FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY e.id", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    console.table([
      {
        name: 'foo',
        age: 10
      }, {
        name: 'bar',
        age: 20
      }
    ]);
  });

};

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((mainAnswers) => {
    console.log(mainAnswers.mainAction);
  });
};

// Menu function to loop through creating engineer and interm team members
const menuLoop = function () {
  menuQuestions()
    .then((mainAnswers) => {
      if (mainAnswers.mainAction === "readEmp") {
        viewEmployees();
      } else if (mainAnswers.mainAction === "readEmpDpt") {
        console.log(
          `
  ===================================================
  readEmpDpt
  ===================================================
              `);
      } else {
        // writeFile(generatePage(teamData));
        // copyFile();
        console.log(
          `
      ===================================================
      My Team Page Created!  Saved to - ./dist/index.html
      ===================================================
                  `
        );
      }
    });
};


// // Function call to initialize app
menuLoop();
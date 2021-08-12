//Include packages needed for this application
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

/* VARIABLES */
const employeeArr = [];

const menuQuestions = [
  {
    type: 'list',
    name: 'mainAction',
    default: "View All Employees',",
    message: 'What would you like to do?',
    choices: [
      { name: 'View All Employees', value: 'readEmp', },
      { name: 'View All Employees By Department', value: 'readEmpDpt', },
      { name: 'View All Employees By Manager', value: 'readEmpMrg', },
      { name: 'Add Employee', value: 'create', },
      { name: 'Remove Employee', value: 'delete', },
      { name: 'Update Employee Role', value: 'updateEmpRole', },
      { name: 'Update Employee Manager', value: 'updateEmpMrg', },
      { name: 'View All Roles', value: 'readRoles', },
      { name: 'Add Role', value: 'createRole', },
      { name: 'Remove Role', value: 'deleteRole', },
      new inquirer.Separator('*********'),
      { name: 'End', value: 'end', },
      new inquirer.Separator('*********')
    ]
  }
];
/* END VERIABLES */

function viewEmployees(orderBy) {
  db.query(`SELECT e.id as ID, e.first_name as FIRST_NAME, e.last_name as LAST_NAME, role.title as TITLE, department.name as DEPARTMENT, role.salary as SALARY, CONCAT(m.last_name, ', ', m.first_name) AS MANAGER FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY ${orderBy}`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
};

function viewRoles() {
  db.query(`SELECT * FROM role`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
};

// function ask() {
//   inquirer.prompt(questions).then((answers) => {
//     output.push(answers.tvShow);
//     if (answers.askAgain) {
//       ask();
//     } else {
//       console.log('Your favorite TV Shows:', output.join(', '));
//     }
//   });
// }

// Menu function to loop through employee management actions
const menuLoop = function () {
  inquirer.prompt(menuQuestions)
    .then((mainAnswers) => {
      console.log(mainAnswers);
      switch (mainAnswers.mainAction) {
        case "readEmp":
          viewEmployees("e.id");
          menuLoop();
          break;
        case "readEmpDpt":
          viewEmployees("department.name");
          menuLoop();
          break;
        case "readEmpMrg":
          viewEmployees("e.manager_id");
          menuLoop();
          break;
        case "create":
          menuLoop();
          break;
        case "delete":
          menuLoop();
          break;
        case "updateEmpRole":
          menuLoop();
          break;
        case "updateEmpMrg":
          menuLoop();
          break;
        case "readRoles":
          viewRoles();
          menuLoop();
          break;
        case "createRole":
          menuLoop();
          break;
        case "deleteRole":
          menuLoop();
          break;
        case "end":
          console.log('good bye');
      };
      return false;
    });
};

console.log(".----------------------------------------------------.");
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
console.log("|                             |___/                  |");
console.log("|                                                    |");
console.log("'----------------------------------------------------'");

// Main logic - loop until end is selected
menuLoop();
//Include packages needed for this application
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');


/* VARIABLES */
const employeeArr = []; //may need later
// const roleArr = []; //may need later

const empData = [];

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
/* END VARIABLES */

/* FUNCTIONS */
function viewEmployees(orderBy) {
  db.query(`SELECT e.id as ID, e.first_name as FIRST_NAME, e.last_name as LAST_NAME, role.title as TITLE, department.name as DEPARTMENT, role.salary as SALARY, CONCAT(m.last_name, ', ', m.first_name) AS MANAGER FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY ${orderBy}`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    menuLoop();
  });
};

function viewRoles() {
  db.query(`SELECT * FROM role`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    menuLoop();
  });
};

const promptCreateEmp = (roleArr) => {
  console.log(`
=============
Add Employee
=============
`);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What is the employee's first name?",
      validate: first_nameInput => {
        if (first_nameInput) {
          return true;
        } else {
          console.log("Please enter the employee's first name");
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the employee's last name?",
      validate: last_nameInput => {
        if (last_nameInput) {
          return true;
        } else {
          console.log("Please enter the employee's last name");
          return false;
        }
      },
    },
    {
      type: 'list',
      name: 'empRole',
      message: "What is the employee's role?",
      choices: roleArr
      // choices: [
      //   { name: 'None', value: "", },
      //   { name: 'View All Employees', value: 'readEmp', },
      //   { name: 'View All Employees By Department', value: 'readEmpDpt', },
      //   { name: 'View All Employees By Manager', value: 'readEmpMrg', },
      //   { name: 'Add Employee', value: 'create', },
      //   { name: 'Remove Employee', value: 'delete', },
      //   { name: 'Update Employee Role', value: 'updateEmpRole', },
      //   { name: 'Update Employee Manager', value: 'updateEmpMrg', },
      //   { name: 'View All Roles', value: 'readRoles', },
      //   { name: 'Add Role', value: 'createRole', },
      //   { name: 'Remove Role', value: 'deleteRole', }
      // ]
    }
  ]);
};

const fRole = function (item) {
  var newArr = {};
  newArr.name = item.title;
  newArr.value = item.id;
  return newArr;
};

const createEmp = () => {
  db.promise().query(`SELECT id, title FROM role`).then((results) => {
    //   if (err) {
    //     console.log(err);
    //   };
    // console.log(results[0]);
    let roleArr = results[0].map(fRole);
    console.log(roleArr);
    promptCreateEmp(roleArr).then(empAnswers => {
      menuLoop();
    });
    // })
  })
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

          break;
        case "readEmpDpt":
          viewEmployees("department.name");

          break;
        case "readEmpMrg":
          viewEmployees("e.manager_id");

          break;
        case "create":
          createEmp();

          break;
        case "delete":

          break;
        case "updateEmpRole":

          break;
        case "updateEmpMrg":

          break;
        case "readRoles":
          viewRoles();

          break;
        case "createRole":

          break;
        case "deleteRole":

          break;
        case "end":
          console.log('good bye');
          process.abort;
      };
    });
  return false;
};
/* END FUNCTIONS */

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
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
//Map employee Array from SQL for use in Inquire list array to select employee to delete
const fEmp = function (item) {
  var newArr = {};
  newArr.name = item.name;
  newArr.value = item.id;
  return newArr;
};

//Map Role Array from SQL for use in Inquire list array
const fRole = function (item) {
  console.log(item);
  var newArr = {};
  newArr.name = item.title;
  newArr.value = item.id;
  return newArr;
};

function viewEmployees(orderBy) {
  const sql = `SELECT 
    e.id as ID, 
    e.first_name as FIRST_NAME, 
    e.last_name as LAST_NAME, 
    role.title as TITLE, 
    department.name as DEPARTMENT, 
    role.salary as SALARY, 
    CONCAT(m.last_name, ', ', m.first_name) AS MANAGER 
  FROM 
    employee e 
  JOIN role ON e.role_id = role.id 
  JOIN department ON role.department_id = department.id 
  LEFT JOIN employee m ON m.id = e.manager_id 
  ORDER BY ${orderBy}`;

  db.query(sql, function (err, results) {
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

//Create new employee
const createEmp = () => {
  //New Employee Prompt for data
  const promptCreateEmp = (roleArr, empArr) => {
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
      },
      {
        type: 'list',
        name: 'empMrg',
        message: "Who is the employee's manager?",
        choices: empArr
      }
    ]);
  };

  db.promise().query(`SELECT id, title FROM role`).then((results) => {
    //Pull Role Index from SQL using Array.Map
    let roleArr = results[0].map(fRole);
    db.promise().query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`).then((results) => {
      let empArr = results[0].map(fEmp);

      //Prompt User for New Employee Data, Insert into SQL
      promptCreateEmp(roleArr, empArr).then(empAnswers => {
        const sql = `INSERT INTO employee 
        (first_name, last_name, role_id, manager_id) 
      VALUES 
        ("${empAnswers.first_name}","${empAnswers.last_name}",${empAnswers.empRole},${empAnswers.empMrg})`;

        db.query(sql, function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          menuLoop();
        });
      })
    })
  })
};

//Remove employee from SQL
const deleteEmp = () => {
  //List employees to select one to delete
  const promptDeleteEmp = (empArr) => {
    console.log(`
  =========================
  Select Employee To Remove
  =========================
  `);
    return inquirer.prompt([
      {
        type: 'list',
        name: 'empList',
        message: "Which employee do you want to remove?",
        choices: empArr
      }
    ]);
  };

  const sql = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`;
  db.promise().query(sql).then((results) => {
    //Pull Role Index from SQL using Array.Map
    let empArr = results[0].map(fEmp);

    //Prompt User for New Employee Data, Insert into SQL
    promptDeleteEmp(empArr).then(empAnswers => {
      console.log(empAnswers)
      const sql = `DELETE FROM employee WHERE id = ${empAnswers.empList}`;

      db.query(sql, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        menuLoop();
      });
    })
  })
};

//Update employee Role
const updateEmpRole = () => {
  //New Employee Prompt for data
  const promptEmpRole = (roleArr, empArr) => {
    console.log(`
  =======================
  To change Employee Role
  =======================
  `);
    return inquirer.prompt([
      {
        type: 'list',
        name: 'empList',
        message: "Which employee do you want to change role?",
        choices: empArr
      },
      {
        type: 'list',
        name: 'empRole',
        message: "What is the employee's role?",
        choices: roleArr
      }
    ]);
  };

  const sql = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`;
  db.promise().query(sql).then((results) => {
    //Pull Role Index from SQL using Array.Map
    let empArr = results[0].map(fEmp);

    db.promise().query(`SELECT id, title FROM role`).then((results) => {
      //Pull Role Index from SQL using Array.Map
      let roleArr = results[0].map(fRole);

      //Prompt User for New Employee Data, Insert into SQL
      promptEmpRole(roleArr, empArr).then(empAnswers => {
        console.log(empAnswers)
        const sql = `UPDATE employee 
            SET role_id = ${empAnswers.empRole}
            WHERE id = ${empAnswers.empList}`;

        db.query(sql, function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          menuLoop();
        });
      })
    })
  })
};

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
          deleteEmp();
          break;
        case "updateEmpRole":
          updateEmpRole();
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
          db.end();
      };
    });
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
db.connect();
menuLoop();
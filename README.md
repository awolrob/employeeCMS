# 12 SQL: Employee Tracker

Build a command-line application to manage a company's database of employees using Node.js, Inquirer, and MySQL.

## Author: Rob Ellingson
- Source: Github: [https://github.com/awolrob/employeeCMS](https://github.com/awolrob/employeeCMS)

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Target Application

The following animation shows an example of the application being used from the command line:

![Command Line demo](./assets/12-sql-homework-demo-01.gif)

## Install
* npm install console.table --save
* npm install mysql2
* npm install inquirer
```
  "scripts": {
   ...
    "start": "cls && node index.js"
  },
```
## Run
npm start

## Video of Final Application

The following video was generated using index.js from the command line::

https://drive.google.com/file/d/1GjXysOWylVetM6iLp8lfFg5Tnt4Qgiv_/view

- - -
` https://github.com/awolrob | 2021-08-15 ` 
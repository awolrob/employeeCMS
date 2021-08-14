INSERT INTO department
  (name)
VALUES
  ('Sales'),
  ('Finance'),
  ('Legal'),
  ('Technical');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Programmer',70000,1),
  ('QC', 85000,4),
  ('Planner', 88000,3),
  ('Team Lead', 50000,2);

INSERT INTO employee
  (first_name, last_name, role_id,manager_id)
VALUES
  ('James', 'Fraser', 1,NULL),
  ('Jack', 'London', 2,NULL),
  ('Robert', 'Bruce', 3,NULL),
  ('Peter', 'Greenaway', 4,1),
  ('Derek', 'Jarman', 4,NULL),
  ('Paolo', 'Pasolini', 3,2),
  ('Heathcote', 'Williams', 2,NULL),
  ('Sandy', 'Powell', 1,3),
  ('Emil', 'Zola', 2,NULL),
  ('Sissy', 'Coalpits', 3,NULL),
  ('Antoinette', 'Capet', 4,NULL),
  ('Samuel', 'Delany', 1,NULL),
  ('Tony', 'Duvert', 3,NULL),
  ('Dennis', 'Cooper', 4,NULL),
  ('Monica', 'Bellucci', 1,NULL),
  ('Samuel', 'Johnson', 2,NULL),
  ('John', 'Dryden', 3,NULL),
  ('Alexander', 'Pope', 4,NULL),
  ('Lionel', 'Johnson', 3,NULL),
  ('Aubrey', 'Beardsley', 2,NULL),
  ('Tulse', 'Luper', 1,NULL),
  ('William', 'Morris', 1,NULL),
  ('George', 'Shaw', 2,NULL),
  ('Arnold', 'Bennett', 3,NULL),
  ('Algernon', 'Blackwood', 4,NULL),
  ('Rhoda', 'Broughton', 4,NULL),
  ('Hart', 'Crane', 4,NULL),
  ('Vitorio', 'DeSica', 4,NULL),
  ('Wilkie', 'Collins', 4,NULL),
  ('Elizabeth', 'Gaskell', 3,NULL),
  ('George', 'Sand', 2,NULL),
  ('Vernon', 'Lee', 1,NULL),
  ('Arthur', 'Machen', 1,NULL),
  ('Frederick', 'Marryat', 4,NULL),
  ('Harriet', 'Martineau', 3,NULL),
  ('George', 'Meredith', 3,NULL),
  ('Margaret', 'Oliphant', 3,NULL),
  ('Anthony', 'Trollope', 1,NULL),
  ('Charlotte', 'Yonge', 3,NULL),
  ('Horace', 'Walpole', 1,NULL),
  ('Matthew', 'Lewis', 1,NULL),
  ('William', 'Bedford', 2,NULL),
  ('Anne', 'Radcliffe', 4,NULL),
  ('Charles', 'Brown', 4,NULL),
  ('Eliza', 'Parsons', 3,NULL),
  ('Susan', 'Hill', 4,NULL),
  ('Sydney', 'Owenson', 4,NULL),
  ('Hubert', 'Crackanthorpe', 3,NULL),
  ('William', 'Carleton', 2,NULL),
  ('Gerald', 'Griffin', 1,NULL);
  
  SELECT * FROM role;
  SELECT * FROM department;
  SELECT * FROM employee;
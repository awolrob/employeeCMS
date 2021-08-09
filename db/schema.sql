DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS role;

CREATE TABLE  manager (
  id INTEGER PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE  department (
  id INTEGER PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL
);

--
--CREATE TABLE candidates (
--  id INTEGER AUTO_INCREMENT PRIMARY KEY,
--  first_name VARCHAR(30) NOT NULL,
--  last_name VARCHAR(30) NOT NULL,
--  party_id INTEGER,
--  industry_connected BOOLEAN NOT NULL,
--  CONSTRAINT fk_party
--    FOREIGN KEY (party_id)
--    REFERENCES parties(id)
--    ON DELETE SET NULL
--);

-- CREATE TABLE voters (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   email VARCHAR(50) NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE votes (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   voter_id INTEGER NOT NULL,
--   candidate_id INTEGER NOT NULL,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT uc_voter UNIQUE (voter_id),
--   CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
--   CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
-- );

CREATE SCHEMA `modern_tech_solutions` ;

CREATE TABLE `modern_tech_solutions`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `position` VARCHAR(45) NOT NULL,
  `department` VARCHAR(45) NOT NULL,
  `salary` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `modern_tech_solutions`.`attendance` (
  `attendance_id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`attendance_id`),
  INDEX `fk_attendance_employees_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_attendance_employees`
    FOREIGN KEY (`employee_id`)
    REFERENCES `modern_tech_solutions`.`employees` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `modern_tech_solutions`.`leave_requests`;

CREATE TABLE `modern_tech_solutions`.`leave_requests` (
  `employee_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
  `reason` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`employee_id`, `date`),
  CONSTRAINT `fk_leave_requests_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `modern_tech_solutions`.`employees` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `modern_tech_solutions`.`payrolldata` (
  `payroll_id` INT NOT NULL AUTO_INCREMENT,
  `employee_id` INT NOT NULL,
  `hours_worked` VARCHAR(45) NOT NULL,
  `leave_deductions` VARCHAR(45) NOT NULL,
  `final_salary` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`payroll_id`),
  INDEX `fk_payroll_employee_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_payroll_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `modern_tech_solutions`.`employees` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Sibongile Nkosi', 'Software Engineer', 'Development', 'R70,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Lungile Moyo', 'HR Manager', 'HR', 'R80,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Thabo Molefe', 'Quality Analyst', 'QA', 'R55,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Keshav Naidoo', 'Sales Representative', 'Sales', 'R60,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Zanele Khumalo', 'Marketing Specialist', 'Marketing', 'R58,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Sipho Zulu', 'UI/UX Designer', 'Design', 'R65,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Naledi Moeketsi', 'DevOps Engineer', 'IT', 'R72,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Farai Gumbo', 'Content Strategist', 'Marketing', 'R56,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Karabo Dlamini', 'Accountant', 'Finance', 'R62,000');
INSERT INTO `modern_tech_solutions`.`employees` (`name`, `position`, `department`, `salary`) VALUES ('Fatima Patel', 'Customer Support Lead', 'Support', 'R58,000');

INSERT INTO `modern_tech_solutions`.`leave_requests` 
(`employee_id`, `date`, `status`, `reason`) VALUES 
(1, '2025-07-22', 'approved', 'Sick Leave'),
(1, '2024-12-01', 'pending', 'Personal'),        -- FIXED: 'Pendingl' → 'pending'
(2, '2025-07-15', 'rejected', 'Family Responsibility'),
(2, '2024-12-02', 'approved', 'Vacation'),
(3, '2025-07-10', 'approved', 'Medical Appointment'),
(3, '2024-12-05', 'pending', 'Personal'),
(4, '2025-07-20', 'approved', 'Bereavement'),
(5, '2024-12-01', 'pending', 'Childcare'),
(6, '2025-07-18', 'approved', 'Sick Leave'),
(7, '2025-07-22', 'pending', 'Vacation'),
(8, '2024-12-02', 'approved', 'Medical Appointment'),
(9, '2025-07-19', 'rejected', 'Childcare'),
(10, '2024-12-03', 'pending', 'Vacation');

INSERT INTO `modern_tech_solutions`.`payrolldata`
(`employee_id`, `hours_worked`, `leave_deductions`, `final_salary`) VALUES
('1', '160', '8', '69500'),
('2', '150', '10', '79000'),
('3', '170', '4', '54800'),
('4', '165', '6', '59700'),
('5', '158', '5', '57850'),
('6', '168', '2', '64800'),
('7', '175', '3', '71800'),
('8', '160', '0', '56000'),
('9', '155', '5', '61500'),
('10', '162', '4', '57750');



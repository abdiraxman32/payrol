-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2023 at 11:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `payrol`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `bills_sp` (IN `_employee_id` INT, IN `_amount` DOUBLE, IN `_month` VARCHAR(100), IN `_year` VARCHAR(100), IN `_description` TEXT, IN `_user` VARCHAR(100))   BEGIN
   INSERT INTO bills(employee_id,Amount,month,year,description,user,date)
    VALUES(_employee_id,_amount,_month,_year,_description,_user,CURRENT_DATE);
        SELECT 'Registered' as msg ;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `charges` (IN `_month` VARCHAR(100), IN `_year` VARCHAR(100), IN `_description` TEXT, IN `_Account_id` INT, IN `_user_id` VARCHAR(100))   BEGIN
if(read_salary() > read_account_balance(_Account_id))THEN
SELECT "Deny" as msg;
else
INSERT IGNORE INTO `charges`(`employee_id`, `job_title_id`, `Amount`, `month`, `year`, `description`,`Account_id`,`user_id`, `date`)
 SELECT e.employee_id,j.job_title_id,j.salary,_month,_year,_description,_Account_id,_user_id,
CURRENT_DATE from employee e JOIN job_title  j on e.job_title_id=j.job_title_id;
IF(row_count()>0)THEN
SELECT "Registered" as msg;
ELSE
SELECT "NOt" as msg;
END IF;    
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `employe_statement` (IN `_telphone` INT)   BEGIN
if(_telphone = '0000-00-00')THEN
SELECT e.employee_id,e.fristname,e.lastname,e.phone,e.address,e.city,d.department_name as department, j.job_title_name as job, j.salary,s.shift_name from employee e JOIN department d on e.department_id=d.department_id JOIN job_title j on e.job_title_id=j.job_title_id JOIN shift s on e.shift_id=s.shift_id;
ELSE
 SELECT e.employee_id,e.fristname,e.lastname,e.phone,e.address,e.city,d.department_name as department, j.job_title_name as job, j.salary,s.shift_name from employee e JOIN department d on e.department_id=d.department_id JOIN job_title j on e.job_title_id=j.job_title_id JOIN shift s on e.shift_id=s.shift_id
 WHERE phone=_telphone;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `_username` VARCHAR(255), IN `_password` INT)   BEGIN


if EXISTS(SELECT * FROM users WHERE users.username = _username and users.password = MD5(_password))THEN	


if EXISTS(SELECT * FROM users WHERE users.username = _username and 	users.status = 'Active')THEN
 
SELECT * FROM users where users.username = _username;

ELSE

SELECT 'Locked' Msg;

end if;
ELSE


SELECT 'Deny' Msg;

END if;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_employe_salary` (IN `_employe_id` INT)   BEGIN
SELECT c.employee_id,j.salary FROM charges c JOIN employee e on c.employee_id=e.employee_id
JOIN job_title j on e.job_title_id=j.job_title_id WHERE c.employee_id=_employe_id;



END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `read_overtime_paid` (IN `_employe_id` INT)   BEGIN

SELECT e.employee_id,j.overtime_rate from employee e join job_title j on e.job_title_id=j.job_title_id
 WHERE e.employee_id=_employe_id;
 


END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `read_account_balance` (`_Account_id` INT) RETURNS INT(11)  BEGIN
SET @balance=0.00;
SELECT SUM(balance)INTO @balance FROM account WHERE Account_id
=_Account_id;
RETURN @balance;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `read_salary` () RETURNS DECIMAL(11,2)  BEGIN
SET @salary=0.00;
SELECT SUM(salary)INTO @salary FROM job_title;
RETURN @salary;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `Account_id` int(11) NOT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `holder_name` varchar(50) DEFAULT NULL,
  `accoun_number` int(11) NOT NULL,
  `balance` decimal(12,0) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`Account_id`, `bank_name`, `holder_name`, `accoun_number`, `balance`, `date`) VALUES
(1, 'ips_pank', 'samafale', 618846254, 50, '2023-05-26 13:41:33'),
(2, 'primary_pank', 'farxaan', 615680993, 250, '2023-06-04 13:58:51'),
(3, 'Hormuud', 'anwar', 616095981, 49050, '2023-06-07 10:36:25');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `Amount` double DEFAULT NULL,
  `month` varchar(100) DEFAULT NULL,
  `year` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `employee_id`, `Amount`, `month`, `year`, `description`, `user`, `date`) VALUES
(1, 2, 180, 'Jan', '2023', 'mushaar', 'USR001', '2023-06-08');

--
-- Triggers `bills`
--
DELIMITER $$
CREATE TRIGGER `bills` AFTER INSERT ON `bills` FOR EACH ROW BEGIN
UPDATE charges SET Amount=Amount-new.`Amount` where employee_id=new.employee_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bonuses`
--

CREATE TABLE `bonuses` (
  `bonuses_id` int(11) NOT NULL,
  `bonuses_type` varchar(50) DEFAULT NULL,
  `amount` decimal(9,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bonuses`
--

INSERT INTO `bonuses` (`bonuses_id`, `bonuses_type`, `amount`) VALUES
(1, 'hard work', 100.00),
(2, 'early came', 300.00);

-- --------------------------------------------------------

--
-- Table structure for table `charges`
--

CREATE TABLE `charges` (
  `charge_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `job_title_id` int(11) NOT NULL,
  `Amount` decimal(12,0) NOT NULL,
  `month` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `Account_id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `charges`
--

INSERT INTO `charges` (`charge_id`, `employee_id`, `job_title_id`, `Amount`, `month`, `year`, `description`, `Account_id`, `user_id`, `date`) VALUES
(1, 1, 1, 200, 'jan', '2023', 'mushaar', 3, 'usr001', '2023-06-06 16:00:00'),
(2, 3, 1, 200, 'jan', '2023', 'mushaar', 3, 'usr001', '2023-06-06 16:00:00'),
(3, 2, 2, 0, 'jan', '2023', 'mushaar', 3, 'usr001', '2023-06-07 20:22:30'),
(4, 5, 2, 180, 'jan', '2023', 'mushaar', 3, 'usr001', '2023-06-06 16:00:00'),
(5, 4, 3, 190, 'jan', '2023', 'mushaar', 3, 'usr001', '2023-06-06 16:00:00');

--
-- Triggers `charges`
--
DELIMITER $$
CREATE TRIGGER `update_balance` AFTER INSERT ON `charges` FOR EACH ROW BEGIN
UPDATE account SET balance= balance-new.Amount
WHERE Account_id=new.Account_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `deduction`
--

CREATE TABLE `deduction` (
  `deduction_id` int(11) NOT NULL,
  `deduction_type` varchar(50) DEFAULT NULL,
  `amount` decimal(9,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deduction`
--

INSERT INTO `deduction` (`deduction_id`, `deduction_type`, `amount`) VALUES
(1, 'heath', 200.00),
(2, 'health2', 100.00),
(7, '', 200.00);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`) VALUES
(1, 'enginering'),
(2, 'computer science'),
(3, 'Busines');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `fristname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  `job_title_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `fristname`, `lastname`, `phone`, `address`, `city`, `department_id`, `job_title_id`, `shift_id`, `reg_date`) VALUES
(1, 'shaafici', 'nuur', '2767282', 'hodan', 'mugdisho', 2, 1, 1, '2023-05-26 12:12:15'),
(2, 'anwar', 'isaakh', '672672678', 'hodan', 'mugdisho', 1, 2, 1, '2023-05-26 12:12:37'),
(3, 'abdirahmaan', 'mohamed', '617270990', 'hilwaa', 'mugdisho', 2, 1, 2, '2023-05-26 12:15:32'),
(4, 'farxaan ', 'saciid', '617237928', 'yaaqshiid', 'mugdisho', 1, 3, 2, '2023-05-26 12:16:06'),
(5, 'muqtaar', 'faarax', '612989920', 'hodan', 'mugdisho', 1, 2, 1, '2023-05-26 12:16:42');

-- --------------------------------------------------------

--
-- Table structure for table `job_title`
--

CREATE TABLE `job_title` (
  `job_title_id` int(11) NOT NULL,
  `job_title_name` varchar(50) DEFAULT NULL,
  `salary` decimal(12,0) DEFAULT NULL,
  `overtime_rate` varchar(50) DEFAULT '25'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_title`
--

INSERT INTO `job_title` (`job_title_id`, `job_title_name`, `salary`, `overtime_rate`) VALUES
(1, 'narse', 200, '25'),
(2, 'waardiye', 180, '40'),
(3, 'cleaner', 190, '80');

-- --------------------------------------------------------

--
-- Table structure for table `leave_info`
--

CREATE TABLE `leave_info` (
  `leave_info_id` int(11) NOT NULL,
  `leave_type` varchar(50) DEFAULT NULL,
  `leave_balance` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_info`
--

INSERT INTO `leave_info` (`leave_info_id`, `leave_type`, `leave_balance`) VALUES
(1, 'mmm', '30');

-- --------------------------------------------------------

--
-- Table structure for table `month`
--

CREATE TABLE `month` (
  `month_id` int(11) NOT NULL,
  `month_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `month`
--

INSERT INTO `month` (`month_id`, `month_name`) VALUES
(1, 'jan'),
(2, 'feb'),
(3, 'mar'),
(4, 'april'),
(5, 'May');

-- --------------------------------------------------------

--
-- Table structure for table `overtime_pay`
--

CREATE TABLE `overtime_pay` (
  `overtime_pay_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `month_id` int(11) DEFAULT NULL,
  `overtime_hours` varchar(50) DEFAULT NULL,
  `overtime_rate` varchar(50) DEFAULT NULL,
  `Total_amount` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `overtime_pay`
--

INSERT INTO `overtime_pay` (`overtime_pay_id`, `employee_id`, `month_id`, `overtime_hours`, `overtime_rate`, `Total_amount`) VALUES
(1, 1, 1, '3', '25', 75.00),
(2, 2, 2, '7', '25', 175.00);

-- --------------------------------------------------------

--
-- Table structure for table `pay_bonus`
--

CREATE TABLE `pay_bonus` (
  `pay_bonus_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `bonuses_id` int(11) NOT NULL,
  `amount` decimal(12,0) NOT NULL,
  `bonuses_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pay_bonus`
--

INSERT INTO `pay_bonus` (`pay_bonus_id`, `employee_id`, `bonuses_id`, `amount`, `bonuses_date`) VALUES
(1, 1, 1, 100, '2023-06-07 21:28:47');

-- --------------------------------------------------------

--
-- Table structure for table `pay_deduction`
--

CREATE TABLE `pay_deduction` (
  `pay_deduction_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `deduction_id` int(11) NOT NULL,
  `amount` decimal(12,0) NOT NULL,
  `date_paid` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pay_deduction`
--

INSERT INTO `pay_deduction` (`pay_deduction_id`, `employee_id`, `deduction_id`, `amount`, `date_paid`) VALUES
(1, 1, 1, 200, '2023-06-07 21:11:17');

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `shift_id` int(11) NOT NULL,
  `shift_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`shift_id`, `shift_name`) VALUES
(1, 'subax'),
(2, 'galab');

-- --------------------------------------------------------

--
-- Table structure for table `time_and_attendence`
--

CREATE TABLE `time_and_attendence` (
  `time_and_attendence_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `month_id` int(11) DEFAULT NULL,
  `total_hours_work` varchar(50) DEFAULT NULL,
  `overtime_hours` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_and_attendence`
--

INSERT INTO `time_and_attendence` (`time_and_attendence_id`, `employee_id`, `month_id`, `total_hours_work`, `overtime_hours`) VALUES
(1, 2, 2, '9', '12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active',
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `employee_id`, `username`, `password`, `image`, `status`, `date`) VALUES
('USR001', 1, 'Samafale', '202cb962ac59075b964b07152d234b70', 'USR001.png', 'active', '2023-05-25 22:58:45'),
('USR002', 2, 'anwar', '202cb962ac59075b964b07152d234b70', 'USR002.png', 'active', '2023-05-26 13:16:17'),
('USR003', 3, 'abdi', '202cb962ac59075b964b07152d234b70', 'USR003.png', 'active', '2023-05-26 13:16:40'),
('USR004', 4, 'farxaan', '202cb962ac59075b964b07152d234b70', 'USR004.png', 'active', '2023-05-26 13:17:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Account_id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bonuses`
--
ALTER TABLE `bonuses`
  ADD PRIMARY KEY (`bonuses_id`);

--
-- Indexes for table `charges`
--
ALTER TABLE `charges`
  ADD PRIMARY KEY (`charge_id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`,`month`,`year`),
  ADD UNIQUE KEY `employee_id_2` (`employee_id`,`month`,`year`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `deduction`
--
ALTER TABLE `deduction`
  ADD PRIMARY KEY (`deduction_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `job_title_id` (`job_title_id`);

--
-- Indexes for table `job_title`
--
ALTER TABLE `job_title`
  ADD PRIMARY KEY (`job_title_id`);

--
-- Indexes for table `leave_info`
--
ALTER TABLE `leave_info`
  ADD PRIMARY KEY (`leave_info_id`);

--
-- Indexes for table `month`
--
ALTER TABLE `month`
  ADD PRIMARY KEY (`month_id`);

--
-- Indexes for table `overtime_pay`
--
ALTER TABLE `overtime_pay`
  ADD PRIMARY KEY (`overtime_pay_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `month_id` (`month_id`);

--
-- Indexes for table `pay_bonus`
--
ALTER TABLE `pay_bonus`
  ADD PRIMARY KEY (`pay_bonus_id`);

--
-- Indexes for table `pay_deduction`
--
ALTER TABLE `pay_deduction`
  ADD PRIMARY KEY (`pay_deduction_id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`shift_id`);

--
-- Indexes for table `time_and_attendence`
--
ALTER TABLE `time_and_attendence`
  ADD PRIMARY KEY (`time_and_attendence_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `month_id` (`month_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `Account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bonuses`
--
ALTER TABLE `bonuses`
  MODIFY `bonuses_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `charges`
--
ALTER TABLE `charges`
  MODIFY `charge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `deduction`
--
ALTER TABLE `deduction`
  MODIFY `deduction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `job_title`
--
ALTER TABLE `job_title`
  MODIFY `job_title_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `leave_info`
--
ALTER TABLE `leave_info`
  MODIFY `leave_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `month`
--
ALTER TABLE `month`
  MODIFY `month_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `overtime_pay`
--
ALTER TABLE `overtime_pay`
  MODIFY `overtime_pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pay_bonus`
--
ALTER TABLE `pay_bonus`
  MODIFY `pay_bonus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pay_deduction`
--
ALTER TABLE `pay_deduction`
  MODIFY `pay_deduction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `time_and_attendence`
--
ALTER TABLE `time_and_attendence`
  MODIFY `time_and_attendence_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `charges`
--
ALTER TABLE `charges`
  ADD CONSTRAINT `charges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`job_title_id`) REFERENCES `job_title` (`job_title_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

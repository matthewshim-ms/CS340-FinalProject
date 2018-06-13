/*Data Definition Queries for the sample database for Project
By Aleksander Bruske and Matthew Shim
*/
/*
Table structure for table 'proj_customers'
*/
CREATE TABLE `proj_customers` (
    `customer_id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
Table structure for table 'proj_sales_reps'
*/
CREATE TABLE `proj_sales_reps` (
    `salesrep_id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `salary` int NOT NULL,
    PRIMARY KEY (`salesrep_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
Table structure for table 'proj_customer_salesreps'
*/
CREATE TABLE `proj_customer_salesreps` (
    `cid` int(11) NOT NULL DEFAULT '0',
    `sid` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
Constraints for table 'proj_customer_salesreps'
*/
ALTER TABLE `proj_customer_salesreps`
    ADD CONSTRAINT `proj_customer_salesreps_ibfk1` FOREIGN KEY (`cid`)
REFERENCES `proj_customers` (`customer_id`) ON DELETE CASCADE,
    ADD CONSTRAINT `proj_customer_salesreps_ibfk2` FOREIGN KEY (`sid`)
REFERENCES `proj_sales_reps` (`salesrep_id`) ON DELETE CASCADE;

/*
Indexes for table 'proj_customer_salesreps'
*/
ALTER TABLE `proj_customer_salesreps`
    ADD PRIMARY KEY (`cid`, `sid`),
    ADD KEY `sid` (`sid`);

/*
Table structure for table 'proj_orders'
*/
CREATE TABLE `proj_orders` (
    `orders_id` int(11) NOT NULL AUTO_INCREMENT,
    `date` date NOT NULL,
    `cid` int(11) NOT NULL DEFAULT '0',
    `sid` int(11) NOT NULL DEFAULT '0', 
	`pid` int(11) NOT NULL DEFAULT '0',
	`quantity` int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (`orders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
Table structure for table 'proj_products'
*/
CREATE TABLE `proj_products` (
    `product_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `quantity` int(11) NOT NULL DEFAULT '0',
    `price` float NOT NULL,
    PRIMARY KEY (`product_id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*
Constraints for table 'proj_orders'
*/
ALTER TABLE `proj_orders`
    ADD CONSTRAINT `proj_orders.ibfk1` FOREIGN KEY (`cid`)
REFERENCES `proj_customers` (`customer_id`) ON DELETE CASCADE,
    ADD CONSTRAINT `proj_orders.ibfk2` FOREIGN KEY (`sid`)
REFERENCES `proj_sales_reps` (`salesrep_id`) ON DELETE CASCADE,
	ADD CONSTRAINT `proj_orders.ibfk3` FOREIGN KEY (`pid`)
REFERENCES `proj_products` (`product_id`) ON DELETE CASCADE;

/*
Insert values into 'proj_customers'
*/
INSERT INTO `proj_customers` (`first_name`, `last_name`) VALUES
('John', 'Willis'),
('Abe', 'Lincoln'),
('Patrick', 'Adams'),
('Stacy', 'Anderson'),
('Luke', 'Skywalker'),
('Joe', 'Henderson'),
('Adam', 'Gracys'),
('Robert', 'Downey');

/*
Insert values into 'proj_sales_reps'
*/
INSERT INTO `proj_sales_reps` (`first_name`, `last_name`, `salary`) VALUES
('Mark', 'Thompson', 55000),
('Greg', 'Glass', 63000),
('Mike', 'Mulnix', 47000);

/*
Insert values into 'proj_customer_salesreps'
*/
INSERT INTO `proj_customer_salesreps` (`cid`, `sid`) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1),
(3, 2),
(3, 3),
(4, 2),
(4, 3),
(5, 1),
(5, 3),
(6, 2),
(7, 3),
(8, 1),
(8, 2);

/*
Insert values into 'proj_products'
*/
INSERT INTO `proj_products`(`name`, `description`, `quantity`, `price`) VALUES
('4116-B', 'Blue Truck and Window Brush', 23, 13.75),
('5617-A', 'Orange Unflagged Broom', 17, 15.25),
('9424-C', 'Industrial Sweeping Mop', 8, 24.99),
('2132-M', 'Red Metal Back Brush', 33, 34.80),
('4072-M', 'Black Metal Back Brush', 19, 28.35),
('6032-H', 'Wood Miracle Tip Handle', 45, 5.60),
('6031-H', 'Heavy Duty Metal Handle', 38, 8.90);

/*
Insert values into 'proj_orders'
*/
INSERT INTO `proj_orders` (`date`, `cid`, `sid`, `pid`, `quantity`) VALUES
('2017-08-25', 1, 3, 1, 2),
('2017-08-29', 2, 2, 3, 1),
('2017-09-05', 2, 2, 2, 3),
('2017-09-15', 1, 1, 1, 1),
('2017-09-17', 3, 1, 5, 2),
('2017-09-25', 3, 2, 6, 4),
('2017-09-25', 4, 3, 1, 1),
('2017-10-03', 3, 3, 7, 2),
('2017-10-25', 1, 3, 2, 3),
('2017-11-15', 5, 3, 1, 1),
('2017-12-25', 1, 1, 3, 2),
('2017-12-27', 6, 2, 5, 1),
('2017-12-28', 8, 2, 2, 3),
('2018-01-07', 8, 1, 1, 2),
('2018-01-22', 7, 3, 7, 3);
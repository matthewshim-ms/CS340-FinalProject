-- Get names and ids of all Customers
SELECT first_name, last_name FROM proj_customers

--Get ALL details - salesrep_id, first_name, last_name, and salary from Sales Reps table (proj_sales_reps)
SELECT first_name, last_name, salary FROM proj_sales_reps

--Get ALL details - product_id, name, description, quantity, and price from Products table (proj_products)
SELECT product_id, name, description, quantity, price FROM proj_products

--Get ALL details - orders_id, date, customer names, sales rep names from Orders table (proj_orders)
SELECT orders_id, date, CONCAT(cust.first_name, ' ', cust.last_name) as 'Customer', 
CONCAT(reps.first_name, ' ', reps.last_name) as 'Sales Rep' 
FROM proj_orders 
INNER JOIN proj_sales_reps reps ON sid = salesrep_id
INNER JOIN proj_customers cust ON cid = customer_id

--Get ALL details - orderdetail_id, quantity, pid, oid from Orders table (proj_order_details)
SELECT orderdetail_id, quantity, pid, oid FROM proj_order_details

--Show all records from many-to-many relationship - sales reps and customers (proj_customer_salesreps)
SELECT 
CONCAT(cust.first_name, ' ', cust.last_name) as 'Customer', 
CONCAT(reps.first_name, ' ', reps.last_name) as 'Sales Rep'

FROM 
proj_customers cust 
INNER JOIN proj_customer_salesreps cust_rep ON cust_rep.cid = cust.customer_id 
INNER JOIN proj_sales_reps reps ON cust_rep.sid = reps.salesrep_id

ORDER BY 
'Customer', 
'Sales Rep'

-- add a new customer
INSERT INTO proj_customers(first_name, last_name) VALUES ([fname_input], [lname_input])

-- add a new sales rep
INSERT INTO proj_sales_reps(first_name, last_name, salary) VALUES ([fname_input], [lname_input], [salary])

-- add a product
INSERT INTO proj_products(name, description, quantity, price) VALUES ([name], [description], [quantity], [price])

-- add new order
INSERT INTO proj_orders(date, cid, sid) VALUES ([date], [customer_id_From_Dropdown_Input], [salesrep_id_From_Dropdown_Input])

-- add new order detail
INSERT INTO proj_order_details(pid, oid, quantity) VALUES ([product_id_From_Dropdown_Input], [orders_id_From_Dropdown_Input], [date])

-- delete customer
DELETE FROM proj_customers WHERE customer_id = [customer_id_selected_from_browse_proj_customers_page]

-- delete sales rep
DELETE FROM proj_sales_reps WHERE salesrep_id = [salesrep_id_selected_from_browse_proj_sales_rep_page]

-- delete a product
DELETE FROM proj_products WHERE product_id = [product_id_selected_from_browse_proj_products_page]

-- delete an order
DELETE FROM proj_orders WHERE orders_id = [orders_id_selected_from_browse_proj_orders_page]

-- delete an order detail
DELETE FROM proj_order_details WHERE orderdetail_id = [orderdetail_id_selected_from_browse_proj_order_details_page]

-- associate a customer with a sales rep (M-to-M relationship addition)
INSERT INTO proj_customer_salesreps (cid, sid) VALUES ([customer_id_from_dropdown_Input], [salesrep_id_from_dropdown_Input])

-- dis-associate a customer from a sales rep (M-to-M relationship deletion)
DELETE FROM proj_customer_salesreps WHERE cid = [customer_id_selected_from_customer_and_sales_rep_list] AND sid = [salesrep_id_selected_from_customer_and_sales_rep_list]

-- Search for all information on sales reps (first name, last name, and salary) by user search textbox - search by sales rep's last name
SELECT first_name, last_name, salary FROM proj_sales_reps WHERE last_name LIKE '%[user_search]%'

--Change association of Customer and Sales Rep
UPDATE proj_customer_salesreps
SET cid = [newCustomer_id]
WHERE sid = [selectedSalesRep_id] AND cid = [selectedCustomer_id];


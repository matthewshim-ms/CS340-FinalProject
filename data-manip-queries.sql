-- Get names and ids of all Customers
SELECT customer_id, first_name, last_name FROM proj_customers

--Get ALL details - salesrep_id, first_name, last_name, and salary from Sales Reps table (proj_sales_reps)
SELECT salesrep_id, first_name, last_name, salary FROM proj_sales_reps

--Get ALL details - product_id, name, description, quantity, and price from Products table (proj_products)
SELECT product_id, name, description, quantity, price FROM proj_products

--Get ALL details - orders_id, date, cid, and sid from Orders table (proj_orders)
SELECT orders_id, date, cid, sid FROM proj_orders

--Get ALL details - orderdetail_id, quantity, pid, oid from Orders table (proj_order_details)
SELECT orderdetail_id, quantity, pid, oid FROM proj_order_details

-- add a new customer
INSERT INTO proj_customers(first_name, last_name) VALUES ([fname_input], [lname_input])

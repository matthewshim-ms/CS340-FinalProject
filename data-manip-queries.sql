-- Get names and ids of all Customers
SELECT customer_id, first_name, last_name FROM proj_customers

-- add a new customer
INSERT INTO proj_customers(first_name, last_name) VALUES ([fname_input], [lname_input])

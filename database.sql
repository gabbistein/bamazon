create database bamazon;

use bamazon;

create table products (
	id integer(11) auto_increment not null, 
	product_name varchar(50) not null, 
	department_name varchar(50), 
	price decimal(11, 2) not null,
    stock_quantity integer(11) not null,
    primary key (id)
);

select * from products;
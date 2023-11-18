-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

insert into Person (first_name, last_name, email)
values ('Johann', 'Maier', 'johann.maier@yahoo.com');
insert into Person (first_name, last_name, email)
values ('Herbert', 'Huber', 'herbert.huber@gmx.com');
insert into Person (first_name, last_name, email)
values ('Julia', 'Schneider', 'julia.schneider@outlook.com');
insert into Person (first_name, last_name, email)
values ('Paul', 'Schulz', 'paul.schulz@aol.com');
insert into Person (first_name, last_name, email)
values ('Anna', 'Struff', 'anna.struff@juno.com');
insert into Customer (id, date_of_birth)
values (1, '2012-12-23');
insert into Customer (id, date_of_birth)
values (2, '1980-10-11');
insert into Customer (id, date_of_birth)
values (3, '2010-09-05');
insert into Customer (id, date_of_birth)
values (4, '1970-04-15');
insert into Customer (id, date_of_birth)
values (5, '1975-06-30');
insert into Instructor (id, hiring_date)
values (4, '2000-05-24');

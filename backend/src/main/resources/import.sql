-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

insert into Customer (firstName, lastName, email, dateOfBirth)
values ('Johann', 'Maier', 'johann.maier@yahoo.com', '2012-12-23');
insert into Customer (firstName, lastName, email, dateOfBirth)
values ('Herbert', 'Huber', 'herbert.huber@gmx.com', '1980-10-11');
insert into Customer (firstName, lastName, email, dateOfBirth)
values ('Julia', 'Schneider', 'julia.schneider@outlook.com', '2010-09-05');
insert into Customer (firstName, lastName, email, dateOfBirth)
values ('Paul', 'Schulz', 'paul.schulz@aol.com', '1970-04-15');
insert into Customer (firstName, lastName, email, dateOfBirth)
values ('Anna', 'Struff', 'anna.struff@juno.com', '1975-06-30');

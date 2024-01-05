-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

insert into Person (first_name, last_name, email)
values ('Johann', 'Maier', 'johann.maier@yahoo.com'),
       ('Herbert', 'Huber', 'herbert.huber@gmx.com'),
       ('Julia', 'Schneider', 'julia.schneider@outlook.com'),
       ('Paul', 'Schulz', 'paul.schulz@aol.com'),
       ('alice', 'Struff', 'anna.struff@juno.com');
-- insert into Customer (id, date_of_birth)
values (1, '2012-12-23'),
       (2, '1980-10-11'),
       (3, '2010-09-05'),
       (4, '1970-04-15'),
       (5, '1975-06-30');
insert into Instructor (id, hiring_date)
values (4, '2000-05-24');
insert into Appointment (name, date, duration, address)
values ('Yoga', '2022-11-09 12:00:00', 1800000000000, 'Sophiengutstraße'),
       ('Kinderschwimmen', '2023-04-26 18:00:00', 1800000000000, 'Taubenmarkt'),
       ('WATSU', '2022-08-15 16:00:00', 1800000000000, 'Goethestraße');

-- insert into Participation (appointment_id, customer_id) values (1, 1);
-- insert into Participation (appointment_id, customer_id) values (1, 2);
-- insert into Participation (appointment_id, customer_id) values (1, 3);
-- insert into Participation (appointment_id, customer_id) values (2, 5);
-- insert into Participation (appointment_id, customer_id) values (3, 5);
insert into Appointment_Management (appointment_id, instructor_id) values (1, 4);
-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

insert into Appointment (name, date, duration, address)
values ('Yoga', '2022-11-09 12:00:00', 1800000000000, 'Sophiengutstraße'),
       ('Kinderschwimmen', '2023-04-26 18:00:00', 1800000000000, 'Taubenmarkt'),
       ('Fußballkurs', '2024-04-16 15:00:00', 1800000000000, 'Leonding'),
       ('Tenniskurs', '2024-02-05 12:00:00', 1800000000000, 'Feldkirchen'),
       ('WATSU', '2022-08-15 16:00:00', 1800000000000, 'Goethestraße');

insert into organisation (name, uniquename)
values ('Google', 'google');

insert into packet (name, price, organisation_id)
values ('Angebot', 49.99, 1),
       ('Sport', 99.99, 1);

insert into offer (appointment_id, packet_id)
values (1, 1),
       (2, 1),
       (5, 1),
       (3, 2),
       (4, 2);


-- insert into Participation (appointment_id, customer_id) values (1, 1);
-- insert into Participation (appointment_id, customer_id) values (1, 2);
-- insert into Participation (appointment_id, customer_id) values (1, 3);
-- insert into Participation (appointment_id, customer_id) values (2, 5);
-- insert into Participation (appointment_id, customer_id) values (3, 5);
-- insert into Appointment_Management (appointment_id, instructor_id) values (1, 4);
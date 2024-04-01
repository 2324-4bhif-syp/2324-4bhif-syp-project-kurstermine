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
       ('WATSU', '2022-08-15 16:00:00', 1800000000000, 'Goethestraße'),
       ('Basketball', '2023-09-20 14:00:00', 1800000000000, 'Linzer Straße'),
       ('Klettern', '2024-07-10 10:00:00', 1800000000000, 'Am Berg 5'),
       ('Karate', '2023-12-05 17:00:00', 1800000000000, 'Hauptplatz 7'),
       ('Badminton', '2024-05-15 13:00:00', 1800000000000, 'Am Flussufer'),
       ('Pilates', '2023-02-28 09:00:00', 1800000000000, 'Eichenweg 12'),
       ('Zumba', '2023-08-20 17:00:00', 1800000000000, 'Mozartstraße'),
       ('Salsa', '2024-06-12 19:00:00', 1800000000000, 'Bachgasse'),
       ('Pilates', '2023-10-15 09:00:00', 1800000000000, 'Am Parkplatz'),
       ('Boxen', '2024-03-25 16:00:00', 1800000000000, 'Ringstraße'),
       ('Gymnastik', '2023-05-30 10:00:00', 1800000000000, 'Sportplatzweg'),
       ('Aerobic', '2024-09-05 18:00:00', 1800000000000, 'Seestraße'),
       ('Tanzkurs', '2023-11-08 20:00:00', 1800000000000, 'Schulweg'),
       ('Kampfsport', '2024-01-15 14:00:00', 1800000000000, 'Kampfplatz'),
       ('Schwimmkurs', '2023-07-22 11:00:00', 1800000000000, 'Schwimmbadstraße'),
       ('Fahrradtour', '2024-04-30 13:00:00', 1800000000000, 'Radweg 12');

insert into organisation (name, uniquename)
values ('Google', 'google'),
       ('Microsoft', 'microsoft'),
       ('Amazon', 'amazon'),
       ('Apple', 'apple'),
       ('Facebook', 'facebook'),
       ('Tesla', 'tesla'),
       ('Netflix', 'netflix'),
       ('Twitter', 'twitter'),
       ('Uber', 'uber'),
       ('Airbnb', 'airbnb'),
       ('IBM', 'ibm'),
       ('Intel', 'intel'),
       ('Samsung', 'samsung'),
       ('Sony', 'sony'),
       ('LG', 'lg'),
       ('NVIDIA', 'nvidia');

insert into packet (name, price, organisation_id)
values ('Angebot', 49.99, 1),
       ('Sport', 99.99, 1),
       ('Angebot', 59.99, 1),
       ('Sport', 109.99, 1),
       ('Basic', 39.99, 2),
       ('Premium', 149.99, 2),
       ('Starter', 79.99, 3),
       ('Professional', 199.99, 3),
       ('Standard', 69.99, 4),
       ('Deluxe', 129.99, 4),
       ('Bronze', 49.99, 5),
       ('Silver', 89.99, 5),
       ('Gold', 199.99, 5),
       ('Platinum', 299.99, 5),
       ('Prime', 179.99, 6),
       ('Ultimate', 399.99, 6),
       ('Premium Plus', 249.99, 7),
       ('Ultra', 449.99, 7),
       ('Diamond', 219.99, 8),
       ('Titanium', 359.99, 8),
       ('Exclusive', 269.99, 9),
       ('Elite', 499.99, 9);

insert into offer (appointment_id, packet_id)
values (1, 1),
       (2, 1),
       (5, 1),
       (3, 2),
       (4, 2),
       (6, 3),
       (7, 3),
       (8, 4),
       (9, 4),
       (10, 5),
       (11, 6),
       (12, 6),
       (13, 7),
       (14, 7),
       (15, 8),
       (16, 8),
       (17, 9),
       (18, 9),
       (19, 10),
       (20, 10);


-- insert into Participation (appointment_id, customer_id) values (1, 1);
-- insert into Participation (appointment_id, customer_id) values (1, 2);
-- insert into Participation (appointment_id, customer_id) values (1, 3);
-- insert into Participation (appointment_id, customer_id) values (2, 5);
-- insert into Participation (appointment_id, customer_id) values (3, 5);
-- insert into Appointment_Management (appointment_id, instructor_id) values (1, 4);
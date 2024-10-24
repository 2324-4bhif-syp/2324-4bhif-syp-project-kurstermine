-- This file allow to write SQL commands that will be emitted in test and dev.
create extension if not exists pg_trgm;

/*
insert into Appointment (name, date, duration, address)
values
    ('Yoga', '2022-11-09 12:00:00', 1800000000000, 'Sophiengutstraße'),
    ('Kinderschwimmen', '2023-04-26 18:00:00', 1800000000000, 'Taubenmarkt'),
    ('Fußballkurs', '2024-04-16 15:00:00', 1800000000000, 'Leonding'),
    ('Tenniskurs', '2024-02-05 12:00:00', 1800000000000, 'Feldkirchen'),
    ('WATSU', '2022-08-15 16:00:00', 1800000000000, 'Goethestraße'),
    ('Basketball', '2023-09-20 14:00:00', 1800000000000, 'Linzer Straße'),
    ('Klettern', '2024-07-10 10:00:00', 1800000000000, 'Am Berg 5'),
    ('Karate', '2023-12-05 17:00:00', 1800000000000, 'Hauptplatz 7'),
    ('Badminton', '2024-05-15 13:00:00', 1800000000000, 'Am Flussufer'),
    ('Pilates', '2023-02-28 09:00:00', 1800000000000, 'Eichenweg 12'),
    ('Zen Meditation', '2023-02-15 08:00:00', 1800000000000, 'Tranquility Center'),
    ('Artistic Dance Fusion', '2023-05-20 17:00:00', 1800000000000, 'Dance Studio Avenue'),
    ('Extreme Parkour', '2023-08-25 14:00:00', 1800000000000, 'Urban Jungle Gym'),
    ('Mindful Tai Chi', '2023-11-30 10:00:00', 1800000000000, 'Peaceful Park'),
    ('AcroYoga Adventure', '2024-02-05 16:00:00', 1800000000000, 'Serene Sanctuary'),
    ('Street Jazz Groove', '2024-05-10 18:00:00', 1800000000000, 'City Beats Studio'),
    ('Aerial Silk Spectacle', '2024-08-15 19:00:00', 1800000000000, 'Sky High Gym'),
    ('Wilderness Survival Training', '2024-11-20 09:00:00', 1800000000000, 'Nature Reserve Camp'),
    ('Sensory Deprivation Float', '2025-02-25 12:00:00', 1800000000000, 'Floatation Therapy Spa'),
    ('Glow-in-the-Dark Yoga', '2025-05-30 20:00:00', 1800000000000, 'Luminous Yoga Studio');*/

-- Insert for Organisation
INSERT INTO organisation (name, uniquename) VALUES
    ('Google', 'google'),
    ('Microsoft', 'microsoft'),
    ('Amazon', 'amazon'),
    ('Apple', 'apple'),
    ('Facebook', 'facebook');

-- Insert for Category
INSERT INTO category (name, organisation_id) VALUES
    ('Software Development', 1),
    ('Data Science', 1),
    ('Finance', 2),
    ('Baby Swimming', 5),
    ('Personal Training', 5),
    ('Nutrition', 4),
    ('English Language', 3),
    ('Spanish Language', 4);

-- Insert for User
-- UUID generation using PostgreSQL function gen_random_uuid()
INSERT INTO b_user (id) VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479'),
    ('4fcd3b34-7d1e-4772-bf25-65a8e20b9d60'),
    ('ae5df6de-2d1c-4f62-9f2c-7f2b3cb41c44'),
    ('123e4567-e89b-12d3-a456-426614174005'),
    ('123e4567-e89b-12d3-a456-426614174006'),
    ('123e4567-e89b-12d3-a456-426614174007'),
    ('123e4567-e89b-12d3-a456-426614174008');

-- Insert for Course
INSERT INTO course (name, category_id) VALUES
    ('Java Programming', 1),
    ('Python for Data Science', 2),
    ('Corporate Finance', 3),
    ('Beginner Strength Training', 4),
    ('Advanced Nutrition', 6),
    ('English for Beginners', 7),
    ('Spanish for Business', 7);

-- Insert for Appointment
INSERT INTO appointment (name, date, duration, address, course_id) VALUES
    ('Java Class - Session 1', '2024-10-25 10:00:00', 1800000000000, 'Main Campus, Room 101', 1),
    ('Python Data Science Workshop', '2024-11-10 14:00:00', 1800000000000, 'Tech Building, Room 204', 2),
    ('Corporate Finance Intro', '2024-10-30 09:00:00', 1800000000000, 'Business Hall, Room 301', 3),
    ('Strength Training Basics', '2024-11-20 10:00:00', 1800000000000, 'Fitness Center, Room A', 3),
    ('Nutrition and Health', '2024-11-22 12:00:00', 1800000000000, 'Fitness Center, Room B', 2),
    ('Beginner English Workshop', '2024-12-05 09:00:00', 1800000000000, 'Language Academy, Room 101', 2),
    ('Spanish for Business Professionals', '2024-12-12 14:00:00', 1800000000000, 'Language Academy, Room 102', 1),
    ('Russian for Beginners', '2024-12-12 14:00:00', 1800000000000, 'HTL Leonding, Room K03', 6);

-- Insert for AppointmentManagement
INSERT INTO appointment_management (appointment_id, instructor_id) VALUES
    (1, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
    (2, '4fcd3b34-7d1e-4772-bf25-65a8e20b9d60'),
    (3, 'ae5df6de-2d1c-4f62-9f2c-7f2b3cb41c44');

-- Insert for Hire
INSERT INTO hire (organisation_id, instructor_id) VALUES
    (1, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
    (1, '4fcd3b34-7d1e-4772-bf25-65a8e20b9d60'),
    (2, 'ae5df6de-2d1c-4f62-9f2c-7f2b3cb41c44');

-- Insert for Token
INSERT INTO token (id, category_id, appointment_id, user_id) VALUES
    ('e65d7654-3d1b-4d1c-b8df-4b8a0b8a7e63', 1, 1, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
    ('da75bc12-6a9f-46c2-bcb5-8f6d9642e3d1', 2, 2, '4fcd3b34-7d1e-4772-bf25-65a8e20b9d60'),
    ('d76f6f8e-4b1e-4d5b-bcef-4b2d634a2d9a', 3, 3, 'ae5df6de-2d1c-4f62-9f2c-7f2b3cb41c44'),
    ('9f91b4c0-d230-4f34-9517-73f69b5ad3df', 6, null, '123e4567-e89b-12d3-a456-426614174008'),
    ('b5e631a4-2fc9-40a6-a5ed-4078a8ad5e2f', 7, null, '123e4567-e89b-12d3-a456-426614174008'),
    ('22e5f4a7-82e0-4b36-9284-bc35dcb258f5', 8, null, '123e4567-e89b-12d3-a456-426614174008'),
    ('e093dd16-5d95-47d7-bf77-3dfb1e9d682e', 7, null, '123e4567-e89b-12d3-a456-426614174008');

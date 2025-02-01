-- This file allow to write SQL commands that will be emitted in test and dev.
create extension if not exists pg_trgm;

-- Insert for Organisation
INSERT INTO organisation (name, uniquename) VALUES
    ('Google', 'google'),
    ('Microsoft', 'microsoft'),
    ('Amazon', 'amazon'),
    ('Apple', 'apple'),
    ('Facebook', 'facebook'),
    ('Akademie',  'akw'),
    ('Ich gebe dir Raum', 'elvira');

-- Insert for Category
INSERT INTO category (name, organisation_id) VALUES
    ('Software Development', 1),
    ('Data Science', 1),
    ('Finance', 2),
    ('Baby Swimming', 5),
    ('Personal Training', 5),
    ('Nutrition', 4),
    ('English Language', 3),
    ('Spanish Language', 4),
    ('Schwimmen', 6),
    ('Aqua-relax', 6),
    ('Körperorientierte Visualisierung', 7);

-- Insert for Course
INSERT INTO course (name, category_id) VALUES
    ('Java Programming', 1),
    ('Python for Data Science', 2),
    ('Corporate Finance', 3),
    ('Beginner Strength Training', 4),
    ('Advanced Nutrition', 6),
    ('English for Beginners', 7),
    ('Spanish for Business', 7),
    ('Neugeborenen Schwimmen', 9),
    ('Baby Schwimmen', 9),
    ('Kleinkind Schwimmen', 9),
    ('Kinder Schwimmen', 9),
    ('Aqua Gym für Schwangere', 10),
    ('Aqua Fit für Alle', 10),
    ('Herzblüte', 11),
    ('Sicherer Ort', 11),
    ('Körpererkundung', 11);

-- Insert for Appointment
INSERT INTO appointment (name, date, duration, address, course_id) VALUES
    ('Java Class - Session 1', '2024-10-25 10:00:00', 1800000000000, 'Main Campus, Room 101', 1),
    ('Python Data Science Workshop', '2024-11-10 14:00:00', 1800000000000, 'Tech Building, Room 204', 2),
    ('Corporate Finance Intro', '2024-10-30 09:00:00', 1800000000000, 'Business Hall, Room 301', 3),
    ('Strength Training Basics', '2024-11-20 10:00:00', 1800000000000, 'Fitness Center, Room A', 3),
    ('Nutrition and Health', '2024-11-22 12:00:00', 1800000000000, 'Fitness Center, Room B', 2),
    ('Beginner English Workshop', '2024-12-05 09:00:00', 1800000000000, 'Language Academy, Room 101', 2),
    ('Spanish for Business Professionals', '2024-12-12 14:00:00', 1800000000000, 'Language Academy, Room 102', 1),
    ('Russian for Beginners', '2024-12-12 14:00:00', 1800000000000, 'HTL Leonding, Room K03', 6),
    ('FR 13:40 Neugeborene', '2024-11-08 13:40', 1200000000000, 'Wellnessoase Hummelhof', 8),
    ('FR 13:40 Neugeborene', '2024-11-15 13:40', 1200000000000, 'Wellnessoase Hummelhof', 8),
    ('FR 13:40 Neugeborene', '2027-11-22 13:40', 1200000000000, 'Wellnessoase Hummelhof', 8),
    ('FR 13:40 Neugeborene', '2027-11-29 13:40', 1200000000000, 'Wellnessoase Hummelhof', 8),
    ('FR 13:40 Neugeborene', '2027-12-06 13:40', 1200000000000, 'Wellnessoase Hummelhof', 8),
    ('FR 14:00 Babys', '2024-11-08 14:00', 1800000000000, 'Wellnessoase Hummelhof', 9),
    ('FR 14:00 Babys', '2026-11-15 14:00', 1800000000000, 'Wellnessoase Hummelhof', 9),
    ('FR 14:00 Babys', '2026-11-22 14:00', 1800000000000, 'Wellnessoase Hummelhof', 9),
    ('FR 14:00 Babys', '2026-11-29 14:00', 1800000000000, 'Wellnessoase Hummelhof', 9),
    ('FR 14:00 Babys', '2026-12-06 14:00', 1800000000000, 'Wellnessoase Hummelhof', 9);

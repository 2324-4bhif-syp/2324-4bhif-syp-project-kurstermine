-- This file allow to write SQL commands that will be emitted in test and dev.
create extension if not exists pg_trgm;

-- Insert for Organisation
INSERT INTO organisation (name, uniquename) VALUES
    ('Akademie',  'akw'),
    ('Ich gebe dir Raum', 'elvira');

-- Insert for Category
INSERT INTO category (name, organisation_id) VALUES
    ('Schwimmen', 1),
    ('Aqua-relax', 1),
    ('Körperorientierte Visualisierung', 2);

-- Insert for Course
INSERT INTO course (name, category_id) VALUES
    ('Neugeborenen Schwimmen', 1),
    ('Baby Schwimmen', 1),
    ('Kleinkind Schwimmen', 1),
    ('Kinder Schwimmen', 1),
    ('Aqua Gym für Schwangere', 2),
    ('Aqua Fit für Alle', 2),
    ('Herzblüte', 3),
    ('Sicherer Ort', 3),
    ('Körpererkundung', 3);

-- Insert for Appointment
INSERT INTO appointment (name, date, duration, address, course_id) VALUES
    ('FR 13:40 Neugeborene', '2024-11-08 13:40', 1200000000000, 'Wellnessoase Hummelhof', 1),
    ('FR 13:40 Neugeborene', '2024-11-15 13:40', 1200000000000, 'Wellnessoase Hummelhof', 1),
    ('FR 13:40 Neugeborene', '2027-11-22 13:40', 1200000000000, 'Wellnessoase Hummelhof', 1),
    ('FR 13:40 Neugeborene', '2027-11-29 13:40', 1200000000000, 'Wellnessoase Hummelhof', 1),
    ('FR 13:40 Neugeborene', '2027-12-06 13:40', 1200000000000, 'Wellnessoase Hummelhof', 1),
    ('FR 14:00 Babys', '2024-11-08 14:00', 1800000000000, 'Wellnessoase Hummelhof', 2),
    ('FR 14:00 Babys', '2026-11-15 14:00', 1800000000000, 'Wellnessoase Hummelhof', 2),
    ('FR 14:00 Babys', '2026-11-22 14:00', 1800000000000, 'Wellnessoase Hummelhof', 2),
    ('FR 14:00 Babys', '2026-11-29 14:00', 1800000000000, 'Wellnessoase Hummelhof', 2),
    ('FR 14:00 Babys', '2026-12-06 14:00', 1800000000000, 'Wellnessoase Hummelhof', 2),
    ('SA 15:00 Kleinkinder', '2024-11-08 15:00', 1200000000000, 'Wellnessoase Hummelhof', 3),
    ('SA 15:00 Kleinkinder', '2027-11-15 15:00', 1200000000000, 'Wellnessoase Hummelhof', 3),
    ('SA 15:00 Kleinkinder', '2027-11-22 15:00', 1200000000000, 'Wellnessoase Hummelhof', 3),
    ('SA 15:00 Kleinkinder', '2027-11-29 15:00', 1200000000000, 'Wellnessoase Hummelhof', 3),
    ('SA 15:00 Kleinkinder', '2027-12-06 15:00', 1200000000000, 'Wellnessoase Hummelhof', 3),
    ('MO 09:30 Aqua Gym Schwangere', '2026-01-06 09:30', 3600000000000, 'Therme Sonnentau', 5),
    ('MO 09:30 Aqua Gym Schwangere', '2026-01-13 09:30', 3600000000000, 'Therme Sonnentau', 5),
    ('MO 09:30 Aqua Gym Schwangere', '2026-01-20 09:30', 3600000000000, 'Therme Sonnentau', 5),
    ('MO 09:30 Aqua Gym Schwangere', '2026-01-27 09:30', 3600000000000, 'Therme Sonnentau', 5),
    ('MI 18:00 Aqua Fit', '2026-02-05 18:00', 3600000000000, 'AquaPark Blau', 6),
    ('MI 18:00 Aqua Fit', '2026-02-12 18:00', 3600000000000, 'AquaPark Blau', 6),
    ('MI 18:00 Aqua Fit', '2026-02-19 18:00', 3600000000000, 'AquaPark Blau', 6),
    ('MI 18:00 Aqua Fit', '2026-02-26 18:00', 3600000000000, 'AquaPark Blau', 6),
    ('DI 10:00 Herzblüte', '2026-03-04 10:00', 5400000000000, 'Zentrum für Achtsamkeit', 7),
    ('DI 10:00 Herzblüte', '2026-03-11 10:00', 5400000000000, 'Zentrum für Achtsamkeit', 7),
    ('DI 10:00 Herzblüte', '2026-03-18 10:00', 5400000000000, 'Zentrum für Achtsamkeit', 7),
    ('DI 10:00 Herzblüte', '2026-03-25 10:00', 5400000000000, 'Zentrum für Achtsamkeit', 7),
    ('DO 17:30 Sicherer Ort', '2026-04-10 17:30', 7200000000000, 'Therapiezentrum Balance', 8),
    ('DO 17:30 Sicherer Ort', '2026-04-17 17:30', 7200000000000, 'Therapiezentrum Balance', 8),
    ('DO 17:30 Sicherer Ort', '2026-04-24 17:30', 7200000000000, 'Therapiezentrum Balance', 8),
    ('DO 17:30 Sicherer Ort', '2026-05-01 17:30', 7200000000000, 'Therapiezentrum Balance', 8);

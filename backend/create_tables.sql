-- Drop the tables if they already exist
DROP TABLE IF EXISTS verify;
DROP TABLE IF EXISTS birth_certificate;
DROP TABLE IF EXISTS individual;
DROP TABLE IF EXISTS agent;
DROP TABLE IF EXISTS city_hall;
DROP TABLE IF EXISTS region;

-- Create the region table
CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    region_name VARCHAR(100) NOT NULL
);

INSERT INTO region(region_name) VALUES ('Adamaoua'), ('Centre'), ('Est'), ('Extrême nord'), ('Littoral'), ('Ngaoundéré'), ('Nord'), ('Nord-Ouest'), ('Ouest'), ('Sud-Ouest');

-- Create the city_hall table
CREATE TABLE city_hall (
    id SERIAL PRIMARY KEY,
    city_hall_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    po_box VARCHAR(50),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    region_id INT REFERENCES region(id) NOT NULL
);
INSERT INTO CITY_HALL(city_hall_name, address, region_id) VALUES ('Mairie de Yaoundé III', NULL, 2), ('Mairie de Yaoundé VI', NULL, 2);


-- Create the agent table
CREATE TABLE agent (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    city_hall_id INT REFERENCES city_hall(id) NOT NULL
);

-- Create the individual table
CREATE TABLE individual (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    login VARCHAR(50) UNIQUE,
    password VARCHAR(100)
);

-- Create the birth_certificate table
CREATE TABLE birth_certificate (
    id SERIAL PRIMARY KEY,
    bc_uid VARCHAR(50) UNIQUE,
    birth_date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100),
    father_full_name VARCHAR(200),
    mother_full_name VARCHAR(200) NOT NULL,
    birth_place VARCHAR(200) NOT NULL,
    sex CHAR(1) NOT NULL,
    bc_file_path VARCHAR(255) NOT NULL,
    agent_id INT REFERENCES agent(id) NOT NULL
);

-- Create the verify table
CREATE TABLE verify (
    individual_id INT REFERENCES individual(id) NOT NULL,
    bc_id INT REFERENCES birth_certificate(id) NOT NULL,
    verification_date DATE,
    PRIMARY KEY (individual_id, bc_id)
);

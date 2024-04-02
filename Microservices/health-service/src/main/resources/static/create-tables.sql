DROP DATABASE atya_nidan;

CREATE DATABASE IF NOT EXISTS atya_nidan;
USE atya_nidan;

CREATE TABLE IF NOT EXISTS State (
	state_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    primary key (state_id)
);

CREATE TABLE IF NOT EXISTS District (
	district_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    state_id int NOT NULL,
    primary key (district_id)
);

ALTER TABLE District
ADD FOREIGN KEY (state_id) REFERENCES State(state_id);

CREATE TABLE IF NOT EXISTS Taluka (
	taluka_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    district_id int NOT NULL,
    primary key (taluka_id)
);

ALTER TABLE Taluka
ADD FOREIGN KEY (district_id) REFERENCES District(district_id);

CREATE TABLE IF NOT EXISTS User (
	user_id int AUTO_INCREMENT,
    phone_number varchar(10) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE,
    role ENUM('SuperAdmin', 'Admin', 'Doctor', 'FieldWorker') NOT NULL,
    primary key (user_id)
);

CREATE TABLE IF NOT EXISTS Admin (
	admin_id int,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    home_address varchar(100) NOT NULL,
    office_address varchar(100) NOT NULL,
    languages_known varchar(50) DEFAULT "Hindi",
    district_id int NOT NULL UNIQUE,
    dob date,
    photo blob,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    primary key (admin_id)
);

ALTER TABLE Admin
ADD FOREIGN KEY (admin_id) REFERENCES User(user_id);

ALTER TABLE Admin
ADD FOREIGN KEY (district_id) REFERENCES District(district_id);

CREATE TABLE IF NOT EXISTS Field_Worker (
	field_worker_id int,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    home_address varchar(100) NOT NULL,
    office_address varchar(100) NOT NULL,
    nearest_railway_station varchar(100),
    languages_known varchar(50) DEFAULT "Hindi",
    taluka_id int NOT NULL,
    dob date,
    available bit DEFAULT 0,
    photo blob,
	gender ENUM('Male', 'Female', 'Other') NOT NULL,
	blood_group varchar(10),
	aadhar_number varchar(12),
    substitute_id int,
    primary key (field_worker_id)
);

ALTER TABLE Field_Worker
ADD FOREIGN KEY (field_worker_id) REFERENCES User(user_id);

ALTER TABLE Field_Worker
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);

ALTER TABLE Field_Worker
ADD FOREIGN KEY (substitute_id) REFERENCES Field_Worker(field_worker_id);

CREATE TABLE IF NOT EXISTS Specialisation (
	specialisation_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(100),
    primary key (specialisation_id)
);

CREATE TABLE IF NOT EXISTS Doctor (
	doctor_id int,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    home_address varchar(100) NOT NULL,
    hospital_address varchar(100) NOT NULL,
    nearest_railway_station varchar(100),
    specialisation_id int NOT NULL,
    languages_known varchar(50) DEFAULT "Hindi",
    taluka_id int NOT NULL,
    dob date,
    photo blob,
	gender ENUM('Male', 'Female', 'Other') NOT NULL,
	blood_group varchar(10),
	aadhar_number varchar(12),
    primary key (doctor_id)
);

ALTER TABLE Doctor
ADD FOREIGN KEY (doctor_id) REFERENCES User(user_id);

ALTER TABLE Doctor
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);

ALTER TABLE Doctor
ADD FOREIGN KEY (specialisation_id) REFERENCES Specialisation(specialisation_id);

CREATE TABLE IF NOT EXISTS Patient(
    patient_id int AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    home_address varchar(100) NOT NULL,
    phone_number varchar(10) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE,
    taluka_id int NOT NULL,
    dob date,
    blood_group varchar(10),
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    abha_id int NOT NULL,
    primary key (patient_id)
);

ALTER TABLE Patient
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);

CREATE TABLE IF NOT EXISTS Visit(
    visit_id int AUTO_INCREMENT,
    patient_id int NOT NULL,
    doctor_id int NOT NULL,
    field_worker_id int NOT NULL,
    is_follow_up_completed bit,
    visit_date date,
    diagnosis_id int,
    form_title varchar(100),
    primary key (visit_id)
);

ALTER TABLE Visit
ADD FOREIGN KEY (patient_id) REFERENCES Patient(patient_id);

ALTER TABLE Visit
ADD FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id);

ALTER TABLE Visit
ADD FOREIGN KEY (field_worker_id) REFERENCES Field_Worker(field_worker_id);

CREATE TABLE IF NOT EXISTS Form_Skeleton(
    form_skeleton_id int AUTO_INCREMENT,
    title varchar(100) NOT NULL UNIQUE,
    date_of_creation date NOT NULL,
    is_default bit default 0,
    xsd_file blob NOT NULL,
    specialisation_id int NOT NULL,
    primary key (form_skeleton_id)
);

ALTER TABLE Form_Skeleton
ADD FOREIGN KEY (specialisation_id) REFERENCES Specialisation(specialisation_id);

ALTER TABLE Visit
ADD FOREIGN KEY (form_title) REFERENCES Form_Skeleton(title);

CREATE TABLE IF NOT EXISTS Form_Skeleton_Normal_Values (
    form_skeleton_normal_values_id int AUTO_INCREMENT,
    normal_values_id int,
    form_skeleton_id int,
    primary key (form_skeleton_id, normal_values_id)
);

-- ALTER TABLE Form_Skeleton_Normal_Values ADD FOREIGN KEY (normal_values_id) REFERENCES NormalValues(normalValuesId);

ALTER TABLE Form_Skeleton_Normal_Values
    ADD FOREIGN KEY (form_skeleton_id) REFERENCES Form_Skeleton(form_skeleton_id);

CREATE TABLE IF NOT EXISTS ICD10_Code (
    code_id int AUTO_INCREMENT,
    code varchar(100),
    description varchar(100),
    primary key (code_id)
);

CREATE TABLE IF NOT EXISTS Languages_Known (
    field_worker_id int NOT NULL,
    language1 varchar(10) NOT NULL,
    language2 varchar(10),
    language3 varchar(10),
    primary key (field_worker_id)
);

ALTER TABLE Languages_Known
ADD FOREIGN KEY (field_worker_id) REFERENCES Field_Worker(field_worker_id);



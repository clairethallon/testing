CREATE TABLE "tasks"(
	id sequence primary key,
	person_assigned text, 
	task_assigned text,
	date_assigned text,
	completed boolean
	);
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "project_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "description" varchar(1024);--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" varchar(32) DEFAULT 'todo';--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" varchar(16) DEFAULT 'medium';
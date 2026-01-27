CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`plan` enum('free','pro') NOT NULL DEFAULT 'free',
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`status` enum('active','cancelled','pending') NOT NULL DEFAULT 'active',
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usageLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` date NOT NULL,
	`count` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `usageLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usageLog` ADD CONSTRAINT `usageLog_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
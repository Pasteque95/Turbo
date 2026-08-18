/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `provisionalLicenseAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `DrivingSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `startLocation` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endLocation` VARCHAR(191) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `distanceKm` DOUBLE NOT NULL,
    `trafficLevel` VARCHAR(191) NOT NULL,
    `guideComment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DrivingSession` ADD CONSTRAINT `DrivingSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

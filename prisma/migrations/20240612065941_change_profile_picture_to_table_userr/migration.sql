/*
  Warnings:

  - You are about to drop the column `profilePicture` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `profilePicture`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `profilePicture` VARCHAR(191) NULL;

/*
  Warnings:

  - You are about to drop the column `accountId` on the `verification` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_verification" ("createdAt", "expiresAt", "id", "identifier", "updatedAt", "value") SELECT "createdAt", "expiresAt", "id", "identifier", "updatedAt", "value" FROM "verification";
DROP TABLE "verification";
ALTER TABLE "new_verification" RENAME TO "verification";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

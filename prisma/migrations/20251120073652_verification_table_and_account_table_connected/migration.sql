/*
  Warnings:

  - Added the required column `accountId` to the `verification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "verification_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_verification" ("createdAt", "expiresAt", "id", "identifier", "updatedAt", "value") SELECT "createdAt", "expiresAt", "id", "identifier", "updatedAt", "value" FROM "verification";
DROP TABLE "verification";
ALTER TABLE "new_verification" RENAME TO "verification";
CREATE UNIQUE INDEX "verification_accountId_key" ON "verification"("accountId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

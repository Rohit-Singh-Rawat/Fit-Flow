/*
  Warnings:

  - You are about to drop the `_Downvotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Upvotes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Downvotes" DROP CONSTRAINT "_Downvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Downvotes" DROP CONSTRAINT "_Downvotes_B_fkey";

-- DropForeignKey
ALTER TABLE "_Upvotes" DROP CONSTRAINT "_Upvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_Upvotes" DROP CONSTRAINT "_Upvotes_B_fkey";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_Downvotes";

-- DropTable
DROP TABLE "_Upvotes";

-- CreateTable
CREATE TABLE "_QuestionsUpvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionsDownvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnswersUpvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnswersDownvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionsUpvotes_AB_unique" ON "_QuestionsUpvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionsUpvotes_B_index" ON "_QuestionsUpvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionsDownvotes_AB_unique" ON "_QuestionsDownvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionsDownvotes_B_index" ON "_QuestionsDownvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnswersUpvotes_AB_unique" ON "_AnswersUpvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_AnswersUpvotes_B_index" ON "_AnswersUpvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnswersDownvotes_AB_unique" ON "_AnswersDownvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_AnswersDownvotes_B_index" ON "_AnswersDownvotes"("B");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsUpvotes" ADD CONSTRAINT "_QuestionsUpvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsUpvotes" ADD CONSTRAINT "_QuestionsUpvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsDownvotes" ADD CONSTRAINT "_QuestionsDownvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsDownvotes" ADD CONSTRAINT "_QuestionsDownvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswersUpvotes" ADD CONSTRAINT "_AnswersUpvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswersUpvotes" ADD CONSTRAINT "_AnswersUpvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswersDownvotes" ADD CONSTRAINT "_AnswersDownvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswersDownvotes" ADD CONSTRAINT "_AnswersDownvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

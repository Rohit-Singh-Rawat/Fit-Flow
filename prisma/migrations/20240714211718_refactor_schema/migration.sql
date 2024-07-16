/*
  Warnings:

  - You are about to drop the column `createdOn` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `_AnswersDownvotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnswersUpvotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionsDownvotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionsUpvotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnswersDownvotes" DROP CONSTRAINT "_AnswersDownvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnswersDownvotes" DROP CONSTRAINT "_AnswersDownvotes_B_fkey";

-- DropForeignKey
ALTER TABLE "_AnswersUpvotes" DROP CONSTRAINT "_AnswersUpvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnswersUpvotes" DROP CONSTRAINT "_AnswersUpvotes_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsDownvotes" DROP CONSTRAINT "_QuestionsDownvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsDownvotes" DROP CONSTRAINT "_QuestionsDownvotes_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsUpvotes" DROP CONSTRAINT "_QuestionsUpvotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsUpvotes" DROP CONSTRAINT "_QuestionsUpvotes_B_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "createdOn",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_AnswersDownvotes";

-- DropTable
DROP TABLE "_AnswersUpvotes";

-- DropTable
DROP TABLE "_QuestionsDownvotes";

-- DropTable
DROP TABLE "_QuestionsUpvotes";

-- CreateTable
CREATE TABLE "_QuestionUpvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionDownvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedQuestions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnswerUpvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnswerDownvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionUpvotes_AB_unique" ON "_QuestionUpvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionUpvotes_B_index" ON "_QuestionUpvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionDownvotes_AB_unique" ON "_QuestionDownvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionDownvotes_B_index" ON "_QuestionDownvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedQuestions_AB_unique" ON "_SavedQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedQuestions_B_index" ON "_SavedQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnswerUpvotes_AB_unique" ON "_AnswerUpvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_AnswerUpvotes_B_index" ON "_AnswerUpvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnswerDownvotes_AB_unique" ON "_AnswerDownvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_AnswerDownvotes_B_index" ON "_AnswerDownvotes"("B");

-- CreateIndex
CREATE INDEX "Question_title_idx" ON "Question"("title");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "_QuestionUpvotes" ADD CONSTRAINT "_QuestionUpvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionUpvotes" ADD CONSTRAINT "_QuestionUpvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionDownvotes" ADD CONSTRAINT "_QuestionDownvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionDownvotes" ADD CONSTRAINT "_QuestionDownvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedQuestions" ADD CONSTRAINT "_SavedQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedQuestions" ADD CONSTRAINT "_SavedQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerUpvotes" ADD CONSTRAINT "_AnswerUpvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerUpvotes" ADD CONSTRAINT "_AnswerUpvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerDownvotes" ADD CONSTRAINT "_AnswerDownvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerDownvotes" ADD CONSTRAINT "_AnswerDownvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

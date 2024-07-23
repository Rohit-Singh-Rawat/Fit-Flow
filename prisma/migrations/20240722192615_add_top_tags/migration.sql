-- CreateTable
CREATE TABLE "_UserTopTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserTopTags_AB_unique" ON "_UserTopTags"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTopTags_B_index" ON "_UserTopTags"("B");

-- AddForeignKey
ALTER TABLE "_UserTopTags" ADD CONSTRAINT "_UserTopTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTopTags" ADD CONSTRAINT "_UserTopTags_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

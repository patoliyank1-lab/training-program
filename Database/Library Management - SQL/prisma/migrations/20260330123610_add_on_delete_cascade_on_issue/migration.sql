-- DropForeignKey
ALTER TABLE "issue" DROP CONSTRAINT "issue_bookId_fkey";

-- DropForeignKey
ALTER TABLE "issue" DROP CONSTRAINT "issue_userId_fkey";

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue" ADD CONSTRAINT "issue_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

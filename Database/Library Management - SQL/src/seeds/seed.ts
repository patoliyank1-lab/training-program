import { Categories, Role } from "../../generated/prisma/enums.js";
import { prisma } from "../config/database-connection.js";
import { hashPassword } from "../utils/password.js";

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Clean existing data ───────────────────────────────────────────────────
  await prisma.issue.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ─────────────────────────────────────────────────────────────────
  const usersData: {
    name: string;
    email: string;
    password: string;
    role: Role;
    borrowedBooks: number;
    loginStatus: boolean;
  }[] = [
    // Admins
    {
      name: "Alice Carter",
      email: "alice.carter@library.com",
      password: await hashPassword("Password@123"),
      role: Role.ADMIN,
      borrowedBooks: 0,
      loginStatus: false,
    },
    // Librarians
    {
      name: "Bob Thompson",
      email: "bob.thompson@library.com",
      password: await hashPassword("Password@123"),
      role: Role.LIBRARIAN,
      borrowedBooks: 0,
      loginStatus: false,
    },
    {
      name: "Carol Nguyen",
      email: "carol.nguyen@library.com",
      password: await hashPassword("Password@123"),
      role: Role.LIBRARIAN,
      borrowedBooks: 0,
      loginStatus: true,
    },
    // Regular Users
    {
      name: "David Patel",
      email: "david.patel@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 2,
      loginStatus: false,
    },
    {
      name: "Eva Müller",
      email: "eva.muller@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 1,
      loginStatus: true,
    },
    {
      name: "Frank Okafor",
      email: "frank.okafor@yahoo.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 3,
      loginStatus: false,
    },
    {
      name: "Grace Kim",
      email: "grace.kim@hotmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 0,
      loginStatus: false,
    },
    {
      name: "Henry Zhao",
      email: "henry.zhao@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 1,
      loginStatus: true,
    },
    {
      name: "Iris Santos",
      email: "iris.santos@outlook.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 2,
      loginStatus: false,
    },
    {
      name: "James Osei",
      email: "james.osei@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 0,
      loginStatus: false,
    },
    {
      name: "Karen Williams",
      email: "karen.williams@yahoo.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 1,
      loginStatus: true,
    },
    {
      name: "Liam Brown",
      email: "liam.brown@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 2,
      loginStatus: false,
    },
    {
      name: "Mia Tanaka",
      email: "mia.tanaka@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 0,
      loginStatus: false,
    },
    {
      name: "Noah Fernandez",
      email: "noah.fernandez@outlook.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 3,
      loginStatus: true,
    },
    {
      name: "Olivia Chen",
      email: "olivia.chen@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 1,
      loginStatus: false,
    },
    {
      name: "Peter Adeyemi",
      email: "peter.adeyemi@hotmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 0,
      loginStatus: false,
    },
    {
      name: "Quinn Larsson",
      email: "quinn.larsson@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 2,
      loginStatus: true,
    },
    {
      name: "Rachel Dubois",
      email: "rachel.dubois@yahoo.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 1,
      loginStatus: false,
    },
    {
      name: "Sam Ito",
      email: "sam.ito@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 0,
      loginStatus: false,
    },
    {
      name: "Tina Kovacs",
      email: "tina.kovacs@outlook.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 1,
      loginStatus: true,
    },
    {
      name: "Uma Reddy",
      email: "uma.reddy@gmail.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 2,
      loginStatus: false,
    },
    {
      name: "Victor Mensah",
      email: "victor.mensah@yahoo.com",
      password: await hashPassword("Password@123"),
      role: Role.USER,
      borrowedBooks: 0,
      loginStatus: false,
    },
  ];

  const createdUsers = await Promise.all(
    usersData.map((u) => prisma.user.create({ data: u })),
  );
  console.log(`✅ Created ${createdUsers.length} users`);

  // ─── Books ─────────────────────────────────────────────────────────────────
  const booksData: {
    title: string;
    author: string;
    published: Date;
    category: Categories;
    isAvailable: boolean;
    price: number;
    charge: number;
    copies: number;
  }[] = [
    // FICTION
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      published: new Date("1925-04-10"),
      category: Categories.FICTION,
      isAvailable: true,
      price: 12.99,
      charge: 0.5,
      copies: 4,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      published: new Date("1960-07-11"),
      category: Categories.FICTION,
      isAvailable: true,
      price: 14.99,
      charge: 0.5,
      copies: 5,
    },
    {
      title: "1984",
      author: "George Orwell",
      published: new Date("1949-06-08"),
      category: Categories.FICTION,
      isAvailable: false,
      price: 11.99,
      charge: 0.5,
      copies: 3,
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      published: new Date("1932-01-01"),
      category: Categories.FICTION,
      isAvailable: true,
      price: 13.49,
      charge: 0.5,
      copies: 4,
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      published: new Date("1951-07-16"),
      category: Categories.FICTION,
      isAvailable: true,
      price: 10.99,
      charge: 0.5,
      copies: 6,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      published: new Date("1997-06-26"),
      category: Categories.FICTION,
      isAvailable: true,
      price: 19.99,
      charge: 1.0,
      copies: 8,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      published: new Date("1988-01-01"),
      category: Categories.FICTION,
      isAvailable: false,
      price: 14.0,
      charge: 0.75,
      copies: 5,
    },
    // NON-FICTION
    {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      published: new Date("2011-01-01"),
      category: Categories.NON_FICTION,
      isAvailable: true,
      price: 17.99,
      charge: 1.0,
      copies: 6,
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      published: new Date("2018-10-16"),
      category: Categories.NON_FICTION,
      isAvailable: true,
      price: 16.99,
      charge: 1.0,
      copies: 7,
    },
    {
      title: "The Power of Now",
      author: "Eckhart Tolle",
      published: new Date("1997-01-01"),
      category: Categories.NON_FICTION,
      isAvailable: true,
      price: 13.99,
      charge: 0.75,
      copies: 4,
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      published: new Date("2011-10-25"),
      category: Categories.NON_FICTION,
      isAvailable: false,
      price: 18.99,
      charge: 1.0,
      copies: 3,
    },
    {
      title: "Educated",
      author: "Tara Westover",
      published: new Date("2018-02-20"),
      category: Categories.NON_FICTION,
      isAvailable: true,
      price: 15.49,
      charge: 0.75,
      copies: 5,
    },
    // SCIENCE
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      published: new Date("1988-04-01"),
      category: Categories.SCIENCE,
      isAvailable: true,
      price: 14.99,
      charge: 0.75,
      copies: 5,
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      published: new Date("1976-01-01"),
      category: Categories.SCIENCE,
      isAvailable: true,
      price: 13.5,
      charge: 0.75,
      copies: 4,
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      published: new Date("1980-10-12"),
      category: Categories.SCIENCE,
      isAvailable: false,
      price: 16.0,
      charge: 1.0,
      copies: 3,
    },
    {
      title: "The Gene: An Intimate History",
      author: "Siddhartha Mukherjee",
      published: new Date("2016-05-17"),
      category: Categories.SCIENCE,
      isAvailable: true,
      price: 17.99,
      charge: 1.0,
      copies: 4,
    },
    {
      title: "Silent Spring",
      author: "Rachel Carson",
      published: new Date("1962-09-27"),
      category: Categories.SCIENCE,
      isAvailable: true,
      price: 12.99,
      charge: 0.5,
      copies: 3,
    },
    // HISTORY
    {
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      published: new Date("1997-03-01"),
      category: Categories.HISTORY,
      isAvailable: true,
      price: 15.99,
      charge: 0.75,
      copies: 5,
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      published: new Date("1947-06-25"),
      category: Categories.HISTORY,
      isAvailable: true,
      price: 10.99,
      charge: 0.5,
      copies: 6,
    },
    {
      title: "The Second World War",
      author: "Winston Churchill",
      published: new Date("1948-01-01"),
      category: Categories.HISTORY,
      isAvailable: false,
      price: 22.99,
      charge: 1.5,
      copies: 2,
    },
    {
      title: "Homo Deus",
      author: "Yuval Noah Harari",
      published: new Date("2015-09-04"),
      category: Categories.HISTORY,
      isAvailable: true,
      price: 18.49,
      charge: 1.0,
      copies: 4,
    },
    // BIOGRAPHY
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      published: new Date("2011-10-24"),
      category: Categories.BIOGRAPHY,
      isAvailable: true,
      price: 19.99,
      charge: 1.0,
      copies: 5,
    },
    {
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      published: new Date("1994-11-01"),
      category: Categories.BIOGRAPHY,
      isAvailable: true,
      price: 17.49,
      charge: 1.0,
      copies: 4,
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      published: new Date("1947-06-25"),
      category: Categories.BIOGRAPHY,
      isAvailable: false,
      price: 10.99,
      charge: 0.5,
      copies: 3,
    },
    {
      title: "Leonardo da Vinci",
      author: "Walter Isaacson",
      published: new Date("2017-10-17"),
      category: Categories.BIOGRAPHY,
      isAvailable: true,
      price: 21.99,
      charge: 1.25,
      copies: 4,
    },
    {
      title: "Becoming",
      author: "Michelle Obama",
      published: new Date("2018-11-13"),
      category: Categories.BIOGRAPHY,
      isAvailable: true,
      price: 18.99,
      charge: 1.0,
      copies: 6,
    },
    // TECHNOLOGY
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      published: new Date("2008-08-11"),
      category: Categories.TECHNOLOGY,
      isAvailable: true,
      price: 29.99,
      charge: 1.5,
      copies: 5,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      published: new Date("1999-10-20"),
      category: Categories.TECHNOLOGY,
      isAvailable: true,
      price: 27.99,
      charge: 1.5,
      copies: 4,
    },
    {
      title: "Design Patterns",
      author: "Gang of Four",
      published: new Date("1994-10-21"),
      category: Categories.TECHNOLOGY,
      isAvailable: false,
      price: 34.99,
      charge: 2.0,
      copies: 3,
    },
    {
      title: "The Innovators",
      author: "Walter Isaacson",
      published: new Date("2014-10-07"),
      category: Categories.TECHNOLOGY,
      isAvailable: true,
      price: 19.99,
      charge: 1.0,
      copies: 4,
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      published: new Date("2014-09-16"),
      category: Categories.TECHNOLOGY,
      isAvailable: true,
      price: 16.99,
      charge: 1.0,
      copies: 5,
    },
    {
      title: "The Phoenix Project",
      author: "Gene Kim",
      published: new Date("2013-01-10"),
      category: Categories.TECHNOLOGY,
      isAvailable: true,
      price: 24.99,
      charge: 1.25,
      copies: 4,
    },
    // PHILOSOPHY
    {
      title: "Meditations",
      author: "Marcus Aurelius",
      published: new Date("0180-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: true,
      price: 9.99,
      charge: 0.5,
      copies: 6,
    },
    {
      title: "Thus Spoke Zarathustra",
      author: "Friedrich Nietzsche",
      published: new Date("1883-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: true,
      price: 11.99,
      charge: 0.5,
      copies: 4,
    },
    {
      title: "The Republic",
      author: "Plato",
      published: new Date("0375-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: false,
      price: 10.5,
      charge: 0.5,
      copies: 3,
    },
    {
      title: "Critique of Pure Reason",
      author: "Immanuel Kant",
      published: new Date("1781-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: true,
      price: 13.99,
      charge: 0.75,
      copies: 3,
    },
    {
      title: "Being and Time",
      author: "Martin Heidegger",
      published: new Date("1927-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: true,
      price: 15.99,
      charge: 0.75,
      copies: 3,
    },
    {
      title: "The Art of War",
      author: "Sun Tzu",
      published: new Date("0500-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: true,
      price: 8.99,
      charge: 0.5,
      copies: 7,
    },
    {
      title: "Beyond Good and Evil",
      author: "Friedrich Nietzsche",
      published: new Date("1886-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: true,
      price: 11.5,
      charge: 0.5,
      copies: 4,
    },
    {
      title: "Man's Search for Meaning",
      author: "Viktor Frankl",
      published: new Date("1946-01-01"),
      category: Categories.PHILOSOPHY,
      isAvailable: false,
      price: 12.99,
      charge: 0.75,
      copies: 5,
    },
  ];

  const createdBooks = await Promise.all(
    booksData.map((b) => prisma.book.create({ data: b })),
  );
  console.log(`✅ Created ${createdBooks.length} books`);

  // ─── Issues ────────────────────────────────────────────────────────────────
  // Pick only users with role USER for issuing books
  const regularUsers = createdUsers.filter((u) => u.role === Role.USER);

  const now = new Date();
  const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);

  const issuesData: {
    userId: number;
    bookId: number;
    issueDate: Date;
    returnDate: Date | null;
    isReturned: boolean;
    charge: number;
  }[] = [
    // Returned issues
    {
      userId: regularUsers[0].id,
      bookId: createdBooks[0].id,
      issueDate: daysAgo(30),
      returnDate: daysAgo(16),
      isReturned: true,
      charge: 7.0,
    },
    {
      userId: regularUsers[1].id,
      bookId: createdBooks[5].id,
      issueDate: daysAgo(25),
      returnDate: daysAgo(11),
      isReturned: true,
      charge: 14.0,
    },
    {
      userId: regularUsers[2].id,
      bookId: createdBooks[7].id,
      issueDate: daysAgo(20),
      returnDate: daysAgo(10),
      isReturned: true,
      charge: 10.0,
    },
    {
      userId: regularUsers[3].id,
      bookId: createdBooks[12].id,
      issueDate: daysAgo(18),
      returnDate: daysAgo(4),
      isReturned: true,
      charge: 10.5,
    },
    {
      userId: regularUsers[4].id,
      bookId: createdBooks[17].id,
      issueDate: daysAgo(15),
      returnDate: daysAgo(1),
      isReturned: true,
      charge: 10.5,
    },
    {
      userId: regularUsers[5].id,
      bookId: createdBooks[21].id,
      issueDate: daysAgo(14),
      returnDate: daysAgo(7),
      isReturned: true,
      charge: 7.0,
    },
    {
      userId: regularUsers[6].id,
      bookId: createdBooks[26].id,
      issueDate: daysAgo(12),
      returnDate: daysAgo(5),
      isReturned: true,
      charge: 10.5,
    },
    {
      userId: regularUsers[7].id,
      bookId: createdBooks[31].id,
      issueDate: daysAgo(10),
      returnDate: daysAgo(3),
      isReturned: true,
      charge: 3.5,
    },
    {
      userId: regularUsers[8].id,
      bookId: createdBooks[35].id,
      issueDate: daysAgo(9),
      returnDate: daysAgo(2),
      isReturned: true,
      charge: 3.5,
    },
    {
      userId: regularUsers[9].id,
      bookId: createdBooks[36].id,
      issueDate: daysAgo(8),
      returnDate: daysAgo(1),
      isReturned: true,
      charge: 3.5,
    },
    // Active (not yet returned) issues
    {
      userId: regularUsers[0].id,
      bookId: createdBooks[1].id,
      issueDate: daysAgo(7),
      returnDate: null,
      isReturned: false,
      charge: 3.5,
    },
    {
      userId: regularUsers[1].id,
      bookId: createdBooks[8].id,
      issueDate: daysAgo(6),
      returnDate: null,
      isReturned: false,
      charge: 6.0,
    },
    {
      userId: regularUsers[2].id,
      bookId: createdBooks[13].id,
      issueDate: daysAgo(5),
      returnDate: null,
      isReturned: false,
      charge: 3.75,
    },
    {
      userId: regularUsers[3].id,
      bookId: createdBooks[18].id,
      issueDate: daysAgo(4),
      returnDate: null,
      isReturned: false,
      charge: 2.0,
    },
    {
      userId: regularUsers[4].id,
      bookId: createdBooks[22].id,
      issueDate: daysAgo(3),
      returnDate: null,
      isReturned: false,
      charge: 3.0,
    },
    {
      userId: regularUsers[5].id,
      bookId: createdBooks[27].id,
      issueDate: daysAgo(3),
      returnDate: null,
      isReturned: false,
      charge: 4.5,
    },
    {
      userId: regularUsers[6].id,
      bookId: createdBooks[32].id,
      issueDate: daysAgo(2),
      returnDate: null,
      isReturned: false,
      charge: 1.0,
    },
    {
      userId: regularUsers[7].id,
      bookId: createdBooks[37].id,
      issueDate: daysAgo(2),
      returnDate: null,
      isReturned: false,
      charge: 1.5,
    },
    {
      userId: regularUsers[8].id,
      bookId: createdBooks[3].id,
      issueDate: daysAgo(1),
      returnDate: null,
      isReturned: false,
      charge: 0.5,
    },
    {
      userId: regularUsers[9].id,
      bookId: createdBooks[9].id,
      issueDate: daysAgo(1),
      returnDate: null,
      isReturned: false,
      charge: 0.75,
    },
    {
      userId: regularUsers[10].id,
      bookId: createdBooks[24].id,
      issueDate: daysAgo(1),
      returnDate: null,
      isReturned: false,
      charge: 1.0,
    },
    {
      userId: regularUsers[11].id,
      bookId: createdBooks[39].id,
      issueDate: daysAgo(1),
      returnDate: null,
      isReturned: false,
      charge: 0.75,
    },
  ];

  const createdIssues = await Promise.all(
    issuesData.map((i) => prisma.issue.create({ data: i })),
  );
  console.log(`✅ Created ${createdIssues.length} issues`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

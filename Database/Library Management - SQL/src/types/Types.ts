export interface UserType {
  name: string;
  email: string;
  password: string;
}

export interface BookType {
  title: string;
  author: string;
  published: string;
  category:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "TECHNOLOGY"
    | "PHILOSOPHY";
  price: string;
  charge: string;
  copies: number;
}

export interface IssueType {
  bookId: string;
  returnDate: string;
  charge: string;
}

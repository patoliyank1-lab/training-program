// // Basic Types

// let name: string = "Alice";
// let age: number = 30;
// let tags: string[] = ["ui", "backend"];
// let coord: [number, number] = [40.7128, -74.0060];
// let maybe: undefined | string = undefined;


// // Object Types, Interfaces & Type Aliases
// interface User {
//     readonly id: string;
//     name: string;
//     email?: string;
// }
// type Point = { x: number; y: number };


// // Functions & Signatures

// function add(a: number, b: number): number { return a + b; }
// const greet = (name: string = "Guest"): string => `Hi ${name}`;
// type Mapper = (s: string) => string;


// // Union, Intersection & Literal Types
// type ID = string | number;
// type Admin = User & { role: 'admin' };
// type Size = 'S' | 'M' | 'L';



// // Enums & Const Assertions
// enum Role { User = "USER", Admin = "ADMIN" }
// const COLORS = ['red', 'blue'] as const; // readonly tuple


// // Generics
// function identity<T>(arg: T): T { return arg; }
// const str = identity<string>('JOHN')
// interface ApiResponse<T> { data: T; error?: string; }
// function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
// }

// const demo = {
//     name: "string",
//     other: (num: number): number => {
//         let age: number = num;
//         console.log(num);
//         return age;
//     }

// }

// console.log(demo.other(45));
// console.log(demo['name']);

// console.log(pluck(demo, "other"))


// // Utility Types


// // Partial<Type> is a TypeScript utility type that transforms all properties of a given type T into optional properties.

// interface a {
//     name: string;
//     age: number;
// }

// const num: Partial<a> = {};

// console.log(num)

// // Required<Type> utility type creates a new type by making all properties of an existing type mandatory

// interface Person {
//     name?: string;
//     age?: number;
//     address?: string;
// }

// const person: Required<Person> = {
//     name: 'John',
//     age: 30,
//     address: '123 Main St.',
// }; // This is valid

// // const invalidPerson: Required<Person> = {
// //       name: 'Jane',
// // }; // This is invalid because age and address are missing



// // Readonly<Type>
// interface Person2 {
//     name?: string;
//     age?: number;
//     address?: string;
// }

// const person2: Person = {
//     name: 'John',
//     age: 30,
//     address: '123 Main St.',
// }; // This is valid

// const invalidPerson: Readonly<Person> = {
//     name: 'Jane',
// }; // This is invalid because age and address are missing

// person.name = "v";


// // Pick<T, K>
// interface Person3 {
//     name: string;
//     age: number;
//     location?: string;
// }

// const bob: Pick<Person3, 'name'> = {
//     name: 'Bob',
//     // `Pick` has only kept name, so age and location were removed from the type and they can't be defined here
// };

// console.log(bob.name);


// // Omit<T, K>

// interface Person4 {
//     name: string;
//     age: number;
//     location?: string;
// }

// const bob2: Omit<Person4, 'age' | 'location'> = {
//     name: "User"
//     // `Omit` has removed age and location from the type and they can't be defined here
// };

// // Record<K, T>
// const nameAgeMap: Record<string, object | string | number> = {
//     veR: "",
//     temp: {
//         varName: '',
//         fun(name: string): string {
//             return "ver";
//         }
//     },
//     name: 21,
//     Bob: 25,
// };

// console.log(nameAgeMap);


// // Define a function that returns a string
// function greet2(name: number): number {
//     return name;
// }

// // Use ReturnType<Type> to capture
// // the return type of the function
// type GreetReturnType = ReturnType<typeof greet2>;

// // Create a variable with the return type
// const greeting: GreetReturnType = 10;
// console.log(greeting);


// // Advanced Types — Conditional & Mapped Types  

// type X = boolean;
// type A = number;
// type B = String;

// type Foo<T> = T extends X ? A : B

// const demoVer: Foo<boolean> = 57;


// console.log(typeof demoVer);


// // Classes, Inheritance & Access Modifiers

// class Person5 {
//     protected age : number = 64;
//     constructor(public name: string) { }
//     greet() { return `Hi ${this.name}`; }
// }
// class Employee extends Person5 {
//     constructor(name: string, 
//     public id: number) 
//     {
//          super(name) 
//         this.age = 45;    
//     }
// }


// const employee =  new Employee("John" , 456);

// let name: string = "Alice";
// let age: number = 30;
// let tags: string[] = ["ui", "backend"];
// let coord: [number, number] = [40.7128, -74.0060];
// let maybe: undefined | string = undefined;

// interface User {
// readonly id: string;
// name: string;
// email?: string;
// }
// type Point = { x: number; y: number };

// function add(a: number, b: number): number { return a + b; }
// const greet = (name: string = "Guest"): string => `Hi ${name}`;
// type Mapper = (s: string) => string;

// function identity<T>(arg: T): T { return arg; }
// interface ApiResponse<T> { data: T; error?: string; }
// function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
// }

// const demo = {
//     name :"string",
//     other : (num:number): number => {
//         let age : number = num;
//         console.log(num);
//         return age;
//     }

// }

// console.log(demo.other(45));
// console.log(demo['name']);

// console.log(pluck(demo , "other"))

// Partial<Type> is a TypeScript utility type that transforms all properties of a given type T into optional properties.

// interface a {
//     name : string;
//     age: number;
// }

// const num :Partial<a> = {};

// console.log(num)

// Required<Type> utility type creates a new type by making all properties of an existing type mandatory

// interface Person {
//       name?: string;
//       age?: number;
//       address?: string;
// }

// const person: Required<Person> = {
//       name: 'John',
//       age: 30,
//       address: '123 Main St.',
// }; // This is valid

// const invalidPerson: Required<Person> = {
//       name: 'Jane',
// }; // This is invalid because age and address are missing

// Readonly<Type>

// interface Person {
//       name?: string;
//       age?: number;
//       address?: string;
// }

// const person: Person = {
//       name: 'John',
//       age: 30,
//       address: '123 Main St.',
// }; // This is valid

// const invalidPerson: Readonly<Person> = {
//       name: 'Jane',
// }; // This is invalid because age and address are missing

// person.name = "v";

// invalidPerson.name = "k";

// Pick<T, K>

// interface Person {
//   name: string;
//   age: number;
//   location?: string;
// }

// const bob: Pick<Person, 'name'> = {
//   name: 'Bob',
//   location: "s",
//   // `Pick` has only kept name, so age and location were removed from the type and they can't be defined here
// };

// // Omit<T, K>

// interface Person {
//   name: string;
//   age: number;
//   location?: string;
// }

// const bob: Omit<Person, 'age' | 'location'> = {
//   name: 'Bob'
//   // `Omit` has removed age and location from the type and they can't be defined here
// };

// Record<K, T>
// const nameAgeMap : Record<string , object | string | number> = {
//     veR : "",
//     temp : {
//         varName : '',
//         fun(name: string):string{
//             return "ver";
//         }
//     }, 
//   name: 21,
//   Bob: 25,
// };

// console.log(nameAgeMap);


// // Define a function that returns a string
// function greet(name: number): number {
//     return name;
// }

// // Use ReturnType<Type> to capture
// // the return type of the function
// type GreetReturnType = ReturnType<typeof greet>;

// // Create a variable with the return type
// const greeting: GreetReturnType = 10;

// // Outputs: "Hello, GeeksforGeeks!"
// console.log(greeting);


// const a = true;


// interface type2 {
//     city: string
// }

// interface type3 {
//     pincode : number
// }

 
// type ver3<type1> = type1 extends (type1 | type2) ? "type2": "type3";


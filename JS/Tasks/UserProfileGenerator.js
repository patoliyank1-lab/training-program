class User {
    name;
    age;
    email;
    _id;
    constructor(name, age, email) {
        this.name = name.toUpperCase(); // Convert name to uppercase
        this.age = age;
        this.email = email;
        this._id = this.IdGen(10);
    }

    // Generate User ID
    IdGen(length) {
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;

        return Math.floor(Math.random() * (max - min) + min)
    }

    // Print User Details
    PrintUser() {
        console.log(`_id   : ${this._id}`)
        console.log(`Name  : ${this.name}`)
        console.log(`Age   : ${this.age}`)
        console.log(`Email : ${this.email}`)
    }
}


let user;

let arg = process.argv.slice(2);

if (arg.length < 3) {
    // Argument count validation
    console.log("Please provide name, age, and email as command-line arguments.");
    console.log("Example: node UserProfileGenerator.js John 25 john@example.com");

} else if (!(/^[a-zA-Z]+$/.test(arg[0])) || arg[0].length > 20 || arg[0] === "" ) {
    // Name validation
    console.log("Please provide a valid name and Name must be smaller than 20 characters.");
    console.log("Example: node UserProfileGenerator.js John 25 john@example.com");

} else if (!(!isNaN(arg[1]) || arg[1] >= 0 || arg[1] <= 100)) {
    // Age validation
    console.log("Please provide a valid age between 0 and 100.");
    console.log("Example: node UserProfileGenerator.js John 25 john@example.com");

} else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(arg[2])) || arg[2].length > 50 || email === "" ) {
    // Email validation
    console.log("Please provide a valid email address and Email must be smaller than 50 characters.");
    console.log("Example: node UserProfileGenerator.js John 25 john@example.com");

} else {

    user = new User(arg[0], arg[1], arg[2]);   // Create User Object
    user.PrintUser() // Print User Details

}


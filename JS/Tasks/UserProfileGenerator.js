// User Data
const UserData = [
  {
    _id: 6782957737,
    name: 'Emily',
    age: 29,
    email: 'emily@gmail.com',
    isActive: true,
    address: {
      city: 'New York',
      state: 'NY',
      country: 'USA'
    }
  },
  {
    _id: 3006256981,
    name: 'Michael',
    maidenName: '',
    age: 36,
    email: 'michael@gmail.com',
    isActive: true,
    address: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA'
    }
  },
  {
    _id: 4729336095,
    name: 'Sophia',
    age: 43,
    email: 'sophia@gmail.com',
    isActive: false,
    address: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    }
  },
  {
    _id: 4107330510,
    name: 'James',
    age: 46,
    email: 'james@gmail.com',
    isActive: true,
    address: {
      city: 'Dallas',
      state: 'TX',
      country: 'USA'
    }
  },
  {
    _id: 9573145061,
    name: 'Emma',
    age: 31,
    email: 'emma@gmail.com',
    isActive: false,
    address: {
      city: 'Seattle',
      state: 'WA',
      country: 'USA'
    }
  },
  {
    _id: 7669076967,
    name: 'Olivia',
    age: 23,
    email: '',
    isActive: true,
    address: {
      city: 'Austin',
      state: 'TX',
      country: 'USA'
    }
  },
  {
    _id: 9459396996,
    name: 'Emily',
    age: 29,
    email: 'emily@gmail.com',
    isActive: true,
    address: {
      city: 'Boston',
      state: 'MA',
      country: 'USA'
    }
  },
  {
    _id: 3504714177,
    name: 'Michael',
    age: 36,
    email: 'michael@gmail.com',
    isActive: false,
    address: {
      city: 'Denver',
      state: 'CO',
      country: 'USA'
    }
  },
  {
    _id: 9060631538,
    name: 'Sophia',
    age: 43,
    email: 'sophia@gmail.com',
    isActive: true,
    address: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    }
  },
  {
    _id: 7846414326,
    name: 'James',
    age: 46,
    email: 'james@gmail.com',
    isActive: true,
    address: {
      city: 'Phoenix',
      state: 'AZ',
      country: 'USA'
    }
  },
  {
    _id: 9743729261,
    name: 'Emma',
    age: 31,
    email: 'emma@gmail.com',
    isActive: false,
    address: {
      city: 'Portland',
      state: 'OR',
      country: 'USA'
    }
  },
  {
    _id: 3604954402,
    name: 'Olivia',
    age: 23,
    email: 'olivia@gmail.com',
    isActive: true,
    address: {
      city: 'Miami',
      state: 'FL',
      country: 'USA'
    }
  }
]



//addUser(user) function
Array.prototype.addUser = function (user) {
  this.push(user);
  return this;
}



//getUserById(id) function
Array.prototype.getUserById = function (userId) {
  return this.find((user) => user._id == userId)
}



//getAdults() function
Array.prototype.getAdults = function () {
  return this.filter((user) => user.age >= 18)
}



// getAverageAge() function
Array.prototype.getAverageAge = function () {
  let sumOfAge = this.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.age
  }, 0);
  return (sumOfAge / this.length).toFixed(2)
}



// getAverageAge() function
Array.prototype.isAdult = function (UserId) {
  if(user = this.getUserById(UserId)){
     return (user.age >= 18 ? true : false)
  }
  
  console.error("Enter Valid ID.")
  return null
}


Array.prototype.getUserStats = function () {
let numberOfUser = this.length;

let numberOfAdults = this.filter((user)=> user.age > 18).length;
let numberOfMinors = this.filter((user)=> user.age <= 18).length;

let averageAgeUSer = this.getAverageAge()


console.log(`
  number Of User : ${numberOfUser} 
  number Of Adults : ${numberOfAdults} 
  number Of Minors : ${numberOfMinors} 
  average Age of all user: ${averageAgeUSer} 
  `)
} 


Array.prototype.searchUsersByName = function(keyword) {
  return this.filter((e) => e.name.toLowerCase().includes(keyword.toLowerCase()))
}



// User Class 
class User {
  _id;
  name;
  age;
  email;
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

    let userId;
    
    do {
    userId =  Math.floor(Math.random() * (max - min) + min);
  } while (UserData.getUserById(userId));


    return userId
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
let userDetails = [];
// userDetails = process.userDetails.slice(2);

// get choices from user;
let choices;
choices = prompt(`
    Enter 1:   addUser(user)
    Enter 2:   getUserById(id)
    Enter 3:   getAdults()
    Enter 4:   getAverageAge()
  `)


// This is for addUser(user)
if (choices == 1) {

  userDetails[0] = prompt("Please provide name");
  userDetails[1] = Number(prompt("Please provide age"));
  userDetails[2] = prompt("Please provide email");

  if (userDetails.length < 3) {
    // userDetails count validation
    console.log("Please provide name, age, and email.");

  } else if (!(/^[a-zA-Z]+$/.test(userDetails[0])) || userDetails[0].length > 20 || userDetails[0] === "") {
    // Name validation
    console.log("Please provide a valid name and Name must be smaller than 20 characters.");

  } else if (!(!isNaN(userDetails[1]) || userDetails[1] >= 0 || userDetails[1] <= 100)) {
    // Age validation
    console.log("Please provide a valid age between 0 and 100.");

  } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails[2])) || userDetails[2].length > 50 || userDetails[2] === "") {
    // Email validation
    console.log("Please provide a valid email address and Email must be smaller than 50 characters.");

  } else {
    user = new User(userDetails[0], userDetails[1], userDetails[2]);   // Create User Object
    UserData.addUser(user)
    console.log(`User successfully added
      user Details: ${JSON.stringify(user)}`);
  }



} else if (choices == 2) {  // this is for getUserById(id)
  let UserID = prompt("Enter User ID.");
  let user = UserData.getUserById(Number(UserID));

  user === undefined ? console.log("Enter Valid UserID or User not be found.") : console.log(user);



} else if (choices == 3) { // this is for getAdults()

  console.log(UserData.getAdults());



} else if (choices == 4) {  // this is for getAverageAge()

  alert(`Average Age of all Users : ${UserData.getAverageAge()}`);


  
} else {  // Else
  alert("Enter Valid Number.")
}
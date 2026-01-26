import { User } from "./User.js";

//addUser(user) function
Array.prototype.addUser = function ({
  firstName,
  age,
  email,
  address: { country, state, city },
  ip,
}) {
  if (
    !/^[a-zA-Z]+$/.test(firstName) ||
    firstName.length > 20 ||
    firstName === ""
  ) {
    // Name validation
    return "Please provide a valid name and Name must be smaller than 20 characters.";
  } else if (!(age <= 100 && age >= 0)) {
    // Age validation
    return "Please provide a valid age between 0 and 100.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 50 ||
    email === ""
  ) {
    // Email validation
    return "Please provide a valid email address and Email must be smaller than 50 characters.";
  } else if (country === "") {
    // country validation
    return "Please Select Country.";
  } else if (state === "") {
    // state validation
    return "Please Select state.";
  } else if (city === "") {
    // country validation
    return "Please Select city.";
  }

  const IsAPIdata = ip === undefined ? false : true;

  const newUser = new User(
    firstName,
    age,
    email,
    city,
    state,
    country,
    IsAPIdata,
  );
  // console.log(newUser);
  if (typeof newUser !== "string") {
    this.push(newUser);
  }

  return newUser;
};

//getUserById(id) function
Array.prototype.getUserById = function (userId) {
  return this.find((user) => user.id == userId);
};

//getAdults() function
Array.prototype.getAdults = function () {
  return this.filter((user) => user.age >= 18);
};

// getAverageAge() function
Array.prototype.getAverageAge = function () {
  let sumOfAge = this.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.age;
  }, 0);
  return (sumOfAge / this.length).toFixed(2);
};

// getAverageAge() function
Array.prototype.isAdult = function (UserId) {
  if ((user = this.getUserById(UserId))) {
    return user.age >= 18 ? true : false;
  }

  console.error("Enter Valid ID.");
  return null;
};

Array.prototype.getUserStats = function () {
  let numberOfUser = this.length;

  let numberOfAdults = this.filter((user) => user.age > 18).length;
  let numberOfMinors = this.filter((user) => user.age <= 18).length;

  let averageAgeUSer = this.getAverageAge();

  console.log(`
  number Of User : ${numberOfUser} 
  number Of Adults : ${numberOfAdults} 
  number Of Minors : ${numberOfMinors} 
  average Age of all user: ${averageAgeUSer} 
  `);
};

// Search Username
Array.prototype.searchUsersByName = function (keyword) {
  return this.filter((e) =>
    e.firstName.toLowerCase().includes(keyword.toLowerCase()),
  );
};

//getUserById(id) function
Array.prototype.getUserById = function (userId) {
  return this.find((user) => user.id == userId);
};

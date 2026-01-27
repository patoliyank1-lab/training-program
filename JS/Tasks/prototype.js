import { User } from "./User.js";

//addUser(user) function
Array.prototype.addUser = function ({
  id,
  firstName,
  age,
  email,
  address: { country, state, city },
  ip,
}) {
  const set = new Set();
  if (
    !/^[a-zA-Z]+$/.test(firstName) ||
    firstName.length > 20 ||
    firstName === ""
  ) {
    // Name validation
    set.add("nameError");
  }
  // console.log(typeof age);
  
  if (!(age <= 100 && age >= 0) || age === "" ) {
    // Age validation 
    set.add("ageError");
  }
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 50 ||
    email === ""
  ) {
    // Email validation
    set.add("emailError");
  }
  if (country === "") {
    // country validation
    set.add("countryError");
  }
  if (state === "") {
    // state validation
    set.add("stateError");
  }
  if (city === "") {
    // country validation
    set.add("cityError");
  }
  if(isHaveEmail(email)){

    set.add("haveEmail")
    
  }

  if (set.size === 0) {
    const IsAPIdata = ip === undefined ? false : true;

    const newUser = new User(
      id,
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

    set.add(newUser);
  }

  return [...set];
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

//deleteUserById(id) function
Array.prototype.deleteUserById = function (Dataset,userId) {
return Dataset.filter((user)=> user.id != userId)
}


function isHaveEmail(email){
  const data = JSON.parse(localStorage.getItem("allUserData"));
  return !(data.find((user) => user.email == email) === undefined)
}

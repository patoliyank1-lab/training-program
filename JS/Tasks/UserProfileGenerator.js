//address Class for nested Object
class address {
  city;
  state;
  country;

  constructor(city, state, country) {
    this.city = city;
    this.state = state;
    this.country = country;
  }
}

// User Class
class User {
  id;
  firstName;
  age;
  email;
  isActive;
  address;
  constructor(name, age, email, city, state, country) {
    this.id = this.IdGen(10);
    this.firstName = name.toUpperCase(); // Convert name to uppercase
    this.age = age;
    this.email = email;
    this.isActive = false;
    this.address = new address(city, state, country);
  }

  // Generate User ID
  IdGen(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    let userId;

    do {
      userId = Math.floor(Math.random() * (max - min) + min);
    } while (UserData.getUserById(userId));

    return userId;
  }

  // Print User Details
  PrintUser() {
    console.log(this);
  }
}

// User Data
let UserData = [
  {
    id: 6782957737,
    firstName: "Emily",
    age: 29,
    email: "emily@gmail.com",
    isActive: true,
    address: {
      city: "New York",
      state: "NY",
      country: "USA",
    },
  },
  {
    id: 3006256981,
    firstName: "Michael",
    maidenName: "",
    age: 16,
    email: "michael@gmail.com",
    isActive: true,
    address: {
      city: "Chicago",
      state: "IL",
      country: "USA",
    },
  },
  {
    id: 4729336095,
    firstName: "Sophia",
    age: 43,
    email: "sophia@gmail.com",
    isActive: false,
    address: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
  },
  {
    id: 4107330510,
    firstName: "James",
    age: 46,
    email: "james@gmail.com",
    isActive: true,
    address: {
      city: "Dallas",
      state: "TX",
      country: "USA",
    },
  },
  {
    id: 9573145061,
    firstName: "Emma",
    age: 11,
    email: "emma@gmail.com",
    isActive: false,
    address: {
      city: "Seattle",
      state: "WA",
      country: "USA",
    },
  },
  {
    id: 7669076967,
    firstName: "Olivia",
    age: 23,
    email: "",
    isActive: true,
    address: {
      city: "Austin",
      state: "TX",
      country: "USA",
    },
  },
  {
    id: 9459396996,
    firstName: "Emily",
    age: 29,
    email: "emily@gmail.com",
    isActive: true,
    address: {
      city: "Boston",
      state: "MA",
      country: "USA",
    },
  },
  {
    id: 3504714177,
    firstName: "Michael",
    age: 36,
    email: "michael@gmail.com",
    isActive: false,
    address: {
      city: "Denver",
      state: "CO",
      country: "USA",
    },
  },
  {
    id: 9060631538,
    firstName: "Sophia",
    age: 13,
    email: "sophia@gmail.com",
    isActive: true,
    address: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
  },
  {
    id: 7846414326,
    firstName: "James",
    age: 46,
    email: "james@gmail.com",
    isActive: true,
    address: {
      city: "Phoenix",
      state: "AZ",
      country: "USA",
    },
  },
  {
    id: 9743729261,
    firstName: "Emma",
    age: 31,
    email: "emma@gmail.com",
    isActive: false,
    address: {
      city: "Portland",
      state: "OR",
      country: "USA",
    },
  },
  {
    id: 3604954402,
    firstName: "Olivia",
    age: 23,
    email: "olivia@gmail.com",
    isActive: true,
    address: {
      city: "Miami",
      state: "FL",
      country: "USA",
    },
  },
];

//addUser(user) function
Array.prototype.addUser = function (name, age, email, country, state, city) {

  console.log(city, state, country)

  if (!/^[a-zA-Z]+$/.test(name) || name.length > 20 || name === "") {
    // Name validation
    return "Please provide a valid name and Name must be smaller than 20 characters.";
  } else if (!(age <= 100 && age >= 0) ) {
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
    return "Please Select Country."
  } else if (state === "") {
    // state validation
    return "Please Select state."
  } else if (city === "") {
    // country validation
    return "Please Select city."
  }



  const newUser = new User(name, age, email, city, state, country);

  this.push(newUser);

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



// Generate unique ID
const IdGen = function (length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    let userId;

    do {
      userId = Math.floor(Math.random() * (max - min) + min);
    } while (UserData.getUserById(userId));

    return userId;
};



// fetch data from api and marge both arrays 
async function fetchData(params) {
  try{

    const Data = await fetch("https://dummyjson.com/users")

    let data = await Data.json();
    UserData = [...UserData, ...data.users]

    // change id of Api fetch User
    UserData.map((element) => {
      element.id = element.id < 1000 ? IdGen(10) : element.id;
    })
    console.log(UserData)

    return UserData;
  } catch (err){
console.error(err)
  };
};


{
// // get choices from user;
// let choices;
// choices = prompt(`
//     Enter 1:   addUser(user)
//     Enter 2:   getUserById(id)
//     Enter 3:   getAdults()
//     Enter 4:   getAverageAge()
//   `);

//   // This is for addUser(user)
// if (choices == 1) {

//   UserData.addUser(
//     prompt("Please provide name"),
//     Number(prompt("Please provide age")),
//     prompt("Please provide email"),
//     prompt("Please provide city"),
//     prompt("Please provide state"),
//     prompt("Please provide country"),
//   );

// } 
// // this is for getUserById(id)
// else if (choices == 2) {
//   let UserID = prompt("Enter User ID.");
//   let user = UserData.getUserById(Number(UserID));

//   user === undefined
//     ? console.log("Enter Valid UserID or User not be found.")
//     : console.log(user);    
// } 
//   // this is for getAdults()
// else if (choices == 3) {

//   console.log(UserData.getAdults());
  
  
  
// }
// // this is for getAverageAge()
//  else if (choices == 4) {

//   alert(`Average Age of all Users : ${UserData.getAverageAge()}`);
// } 
// // Else
// else {
//   alert("Enter Valid Number.")
// }

}

// print all users in webpage
const renderUser = async function (UserData = [] , fetch_data) {
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";
if(fetch_data){
  UserData = await fetchData();
}
console.log(UserData)
  UserData.map((element) => {
    const user = document.createElement("tr");
    user.className = `border-b hover:bg-gray-50 user-id-${element.id}`;
    user.innerHTML = `
    <td class="px-4 py-3">${element.id}</td>
          <td class="px-4 py-3">${element.firstName}</td>
          <td class="px-4 py-3">${element.age}</td>
          <td class="px-4 py-3">${element.email}</td>
          <td class="px-4 py-3">${element.address.city}</td>
          <td class="px-4 py-3">${element.address.state}</td>
          <td class="px-4 py-3">${element.address.country}</td>
          <td class="px-4 py-3 text-center">
          <button data-user-id="${element.id}" class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md">
          Delete
          </button>
          </td>
          <td class="px-4 py-3">${element.ip === undefined ? "Local" : "API" }</td>
          `;

    tbody.appendChild(user);
  });
  
  deleteFunction();
};


renderUser([] ,true);

// Delete User
async function deleteFunction() {
  const deleteUser = document.querySelectorAll("[data-user-id]");

  deleteUser.forEach((e) => {
    e.addEventListener("click", (e) => {
      const userId = e.target.dataset.userId;
      // console.log(userId)

      UserData = UserData.filter((user) => user.id != userId);
      // console.log(UserData)
      renderUser(UserData);
    });
  });
}

//Add User
const addUser = document.getElementById("add-user");


// click event on add user button
addUser.addEventListener("click", (e) => {
 
 
  //show form on click add user button
  showForm();


const Submit = document.getElementById("Submit");
const Cancel = document.getElementById("Cancel");


// Submit Button Logic
Submit.addEventListener("click", () => {

  // get all input values
  const input = document.querySelectorAll("input");
  const select = document.querySelectorAll('select');


// create new user using addUser(...)
  const newUser = UserData.addUser(
    input[0].value,
    input[1].value,
    input[2].value,
    select[0].value,
    select[1].value,
    select[2].value,
  );


  // checking Error in form
  if (typeof newUser !== "string") {

    input.forEach((e) => e.value = '' );
    closeForm();
    renderUser(UserData);
    errorDiv.classList.add("hidden");


  } 
  // If have Error then show Error Massage
  else {
    const errorDiv = document.getElementById("errorDiv");
    errorDiv.innerText = newUser;
    errorDiv.classList.remove("hidden");
  }
});

// cancel button
Cancel.addEventListener("click", closeForm);


// function for display form
function showForm() {
  const userForm = document.getElementById("form");
  userForm.classList.remove("collapse");
}


// function for close form
function closeForm() {
  const userForm = document.getElementById("form");
  userForm.classList.add("collapse");
}


});


//Highlight Adults
const highlightAdults = document.getElementById("highlight-adults");


// click event on Highlight Adults button
highlightAdults.addEventListener("click", (element) => {
  const tr = document.querySelectorAll("tr");
  tr.forEach(function (element) {
    element.children[2].innerText > 18 ? element.classList.add("bg-red-100") : null;
  });
});

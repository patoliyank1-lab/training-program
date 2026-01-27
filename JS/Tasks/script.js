import { getUserData } from './User.js'
import "./prototype.js";


//localstorage for all Users Data
let allUserData = JSON.parse(localStorage.getItem("allUserData"));
if (!allUserData) {
  localStorage.setItem("allUserData", JSON.stringify([]));
  allUserData = [];
}

//localstorage for new Users Data
let newUserList = JSON.parse(localStorage.getItem("newUserList"));
if (!newUserList) {
  localStorage.setItem("newUserList", JSON.stringify([]));
  newUserList = [];
}

//Store users in a Map (key = userId).
function UsersInMap(Data) {
  let map = new Map();
  Data.map((user) => {
    map.set(user.email, user);
  });

  console.log(map);
  return map;
}

//Maintain a Set of unique emails.
function SetOfEmail(Data) {
  let set = new Set();

  Data.map((user) => {
    set.add(user.email);
  });

  console.log(set);
  return set;
}


// print all users in webpage
async function renderUser(userData = [] , fetch_data = false, highlightAdults = false) {
  let isLoaded=false;

  const tbody = document.querySelector("tbody");
  
  tbody.innerHTML = "";
  if (fetch_data) {
    userData = await getUserData();
    isLoaded=true;
  }
  if(isLoaded){
    document.getElementById('loader').classList.add('hidden')
  }
  userData.map((element) => {
    const user = document.createElement("tr");
    user.className = `border-b hover:bg-gray-50 user-id-${element.id}`;

    if (highlightAdults) {
      element.isAdult ? user.classList.add("bg-green-100") : null;
    }
    user.innerHTML = `
    <td class="px-4 py-3">${element.id}</td>
          <td class="px-4 py-3">${element.firstName}</td>
          <td class="px-4 py-3">${element.age}</td>
          <td class="px-4 py-3">${element.email}</td>
          <td class="px-4 py-3">${element.address.city}</td>
          <td class="px-4 py-3">${element.address.state}</td>
          <td class="px-4 py-3">${element.address.country}</td>
          <td class="px-4 py-3 text-center">
          <button id="delete" data-user-id="${element.id}" class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md" >
          Delete
          </button>
          </td>
          <td class="px-4 py-3">${!element.IsAPIdata ? "Local" : "API"}</td>
          `;

    tbody.appendChild(user);
  });
  deleteFunction();
};

renderUser([], true);

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
    const select = document.querySelectorAll("select");

    let temp = {
      firstName: input[0].value,
      age: input[1].value,
      email: input[2].value,
      address: {
        country: select[0].value,
        state: select[1].value,
        city: select[2].value,
      },
    };

    // create new user using addUser(...)
    const newUser = allUserData.addUser(temp);

    const nameError = document.getElementById("nameError");
    const ageError = document.getElementById("ageError");
    const emailError = document.getElementById("emailError");
    const countryError = document.getElementById("countryError");
    const stateError = document.getElementById("stateError");
    const cityError = document.getElementById("cityError");

    nameError.classList.add("hidden");
    ageError.classList.add("hidden");
    emailError.classList.add("hidden");
    countryError.classList.add("hidden");
    stateError.classList.add("hidden");
    cityError.classList.add("hidden");

    if (newUser.find((element) => element === "nameError")) {
      nameError.classList.remove("hidden");
    }

    if (newUser.find((element) => element === "ageError")) {
      ageError.classList.remove("hidden");
    }

    if (newUser.find((element) => element === "emailError")) {
      emailError.classList.remove("hidden");
    }

    if (newUser.find((element) => element === "countryError")) {
      countryError.classList.remove("hidden");
    }

    if (newUser.find((element) => element === "stateError")) {
      stateError.classList.remove("hidden");
    }
    if (newUser.find((element) => element === "cityError")) {
      cityError.classList.remove("hidden");
    }  
    if (newUser.find((element) => element === "haveEmail")) {
      emailError.classList.remove("hidden");
      emailError.innerHTML = "Email is already registered discord."
      console.log(emailError.innerHTML);
    }
    
    // checking Error in form
    if (typeof newUser[0] === "object") {
      input.forEach((e) => (e.value = ""));
      closeForm();

      const ltData = JSON.parse(localStorage.getItem("allUserData"));
      ltData.push(newUser[0]);
      newUserList.push(newUser[0])
      localStorage.setItem("allUserData", JSON.stringify(ltData));
      localStorage.setItem("newUserList", JSON.stringify(newUserList));
      renderUser(ltData);
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
  renderUser(allUserData, false, true);
});

// Refresh Button
const Refresh = document.getElementById("refresh");

Refresh.addEventListener("click", (element) => {
  localStorage.setItem("allUserData", JSON.stringify([]));
  localStorage.setItem("newUserList", JSON.stringify([]));
  renderUser([], true);
});

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

function deleteFunction(){
  const deleteButton = document.querySelectorAll('#delete');
  // console.log(deleteButton);
  
  deleteButton.forEach((button) => {
    button.addEventListener('click' , async (element) => {
      allUserData = await allUserData.deleteUserById(allUserData, button.dataset.userId)
      newUserList = await newUserList.deleteUserById(newUserList, button.dataset.userId)
      localStorage.setItem("allUserData", JSON.stringify(allUserData))
      localStorage.setItem("newUserList", JSON.stringify(newUserList))
      renderUser(allUserData,false)
    })
  })
}



// reload on update on localstorage 

document.addEventListener("storage",() => {
renderUser([], true);
})
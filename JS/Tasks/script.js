import { JSONData }  from './JSONData.js';
import "./prototype.js"


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


//Store users in a Map (key = userId).

function UsersInMap (Data){
  let map = new Map();
  Data.map((user)=>{
    map.set(user.email, user)
  })

  console.log(map)
  return map;
}



//Maintain a Set of unique emails.

function SetOfEmail(Data){
  let set = new Set();

  Data.map((user)=>{
    set.add(user.email)
  })

  console.log(set)
    return set;
}

//Convert all users in User class type
function changeInUser(Data){
 let updatedData = []
  Data.forEach((user) => {
    // console.log(user)  ;
    const newUser = updatedData.addUser(user);

  })
  return updatedData;
}


let UserData = [];

// fetch data from api and marge both arrays 
async function fetchData() {
  try{

    const Data = await fetch("https://dummyjson.com/users")
    
    let data = await Data.json();
    UserData = changeInUser([...JSONData, ...data.users]);
    UsersInMap(UserData);
    SetOfEmail(UserData);
    
    // changeInUser(data.users)
    // change id of Api fetch User
    UserData.map((element) => {
      element.id = element.id < 1000 ? IdGen(10) : element.id;
    })

    return UserData;
  } catch (err){
console.error(err)
  };
};


// print all users in webpage
const renderUser = async function (userData = [] , fetch_data) {
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";
if(fetch_data){
  userData = await fetchData();
}
  UserData = userData;
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
          <td class="px-4 py-3">${!element.IsAPIdata ? "Local" : "API" }</td>
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

      UserData = UserData.filter((user) => user.id != userId);
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

let temp ={firstName:input[0].value,
   age:input[1].value,
    email:input[2].value,
     address:{
      country:select[0].value,
       state:select[1].value,
        city:select[2].value
      }}


// create new user using addUser(...)
  const newUser = UserData.addUser(temp);

  // newUser.PrintUser();
  // console.log(newUser.getEmailDomain());
  


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



// Refresh Button
const Refresh = document.getElementById('refresh');

Refresh.addEventListener('click' , (element) => {
renderUser([] ,true);
})



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

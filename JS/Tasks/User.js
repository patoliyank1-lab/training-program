import { JSONData } from "./JSONData.js";
import './prototype.js'

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
export class User {
  id;
  firstName;
  age;
  email;
  isActive;
  address;
  isAdult;
  IsAPIdata;
  EmailDomain;
  constructor(name, age, email, city, state, country, IsAPIdata) {
    this.id = this.IdGen(10);
    this.firstName = name.toUpperCase(); // Convert name to uppercase
    this.age = age;
    this.email = email;
    this.isActive = false;
    this.address = new address(city, state, country);
    this.isAdult = this.isAdultFun();
    this.IsAPIdata = IsAPIdata;
    this.EmailDomain = this.getEmailDomain()
  }

  // Generate User ID
  IdGen(length) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    let userId;

    do {
      userId = Math.floor(Math.random() * (max - min) + min);
    } while (JSONData.getUserById(userId));

    return userId;
  }

  
  //isAdult() function
  isAdultFun(){
    return this.age > 18 ?  true : false;
  }

  //getEmailDomain() function
  getEmailDomain(){
    return this.email.split('@')[1];
  }

  // Print User Details
  PrintUser() {
    console.log(this);
  }
}




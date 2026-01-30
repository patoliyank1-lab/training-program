import { loadData, storeData } from "./io.js";
import type { Contact } from "./types.js";
import { ContactStore } from './store.js';

const commands: string[] = process.argv;

const data = Promise.resolve(loadData('./data/contact.json'))
let contactStore :ContactStore;

data.then((value) => {
  
  contactStore = new ContactStore(value);
  



const indexOfAdd: number = commands.indexOf("--add");
const indexOfList: number = commands.indexOf("--list");
const indexOfRemove: number = commands.indexOf("--remove");

if (indexOfAdd === 2) {
  
  let newContact: Contact  = { id: "", name: "", email: "" };
  
  const indexOfName: number = commands.indexOf("--name");
  const indexOfEmail: number = commands.indexOf("--email");
  
  if (indexOfName !== -1) {
    const userName: string | undefined = commands[indexOfName + 1];
    if (userName === undefined) {
      console.log("provide Name");
    } else {
      if (
        !/^[a-zA-Z]+$/.test(userName) ||
        userName.length > 20 ||
        userName === ""
      ) {
        // Name validation
        console.log("Enter Valid Name.");
      } else {
        newContact.name = userName;
      }
    }
  }
  
  if (indexOfEmail !== -1) {
    const userEmail: string | undefined = commands[indexOfEmail + 1];
    if (userEmail === undefined) {
      console.log("provide Email");
    } else {
      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail) ||
        userEmail.length > 50 ||
        userEmail === ""
      ) {
        // Email validation
        console.log("Enter Valid Email.");
      } else {
        newContact.email = userEmail;
      }
    }
  }
  
  if (newContact.name !== "" && newContact.email !== "") {
    (async () => {
      const isHave = contactStore.IsHaveEmail(newContact.email);
      
      if (!isHave){
        newContact.id = IdGen(10);
        contactStore.add(newContact);
      } 
      else console.log("This Email is already in contact List.")
    })();
  }
} else if (indexOfList === 2) {
  const data = contactStore.list();
  data.forEach((user) => {
    console.log(`
      ================================
      Id    =  ${user.id}
      Name  =  ${user.name}
      Email =  ${user.email}
      ================================
      `);
    });
} else if (indexOfRemove === 2) {
    const indexOfId = commands.indexOf("--id");
    const id : string | undefined = commands[indexOfId + 1];
    if(id !== undefined ){ 
      contactStore.remove(id)
    }
} else {
  console.log(`
Please enter correct command.
    command list:
            npm run dev -- --add  --name "Alice" --email "a@x.com"
            npm run dev -- --list
            npm run dev -- --remove --id 12345
        `);
}

function IdGen(length: number): string {
  const data = contactStore.list();

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  let userId: number;

  do {
    userId = Math.floor(Math.random() * (max - min) + min);
  } while (data.find((user) => Number(user.id) === userId));

  return userId.toString() as string;
}

})

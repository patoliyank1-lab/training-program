import type { User } from "../Type";

function getData(): User[] {

    const data = localStorage.getItem('userList');
    if (!data) {
        localStorage.setItem('userList', JSON.stringify([]));
        return [];
    }
    const DATA = JSON.parse(data);

    return DATA;
}

function storeData(fullName: string, email: string, number: string, username: string, password: string): void {



    const userList = getData();
    const newUser = {
        id: idGen(10),
        fullName: fullName,
        email: email,
        number: number,
        username: username,
        password: password,
        createdAt: new Date().toISOString(),
    }

    const isHaveEmail = findUserByEmail(email)
    const isHaveUsername = findUserByUsername(username)
    if(!isHaveEmail && !isHaveUsername){   


        userList.push(newUser);
        localStorage.setItem('userList', JSON.stringify(userList));
        setCurrentUser(newUser)
    }


    function idGen(length: number) {
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;

        let id: number;

        do {
            id = Math.floor(Math.random() * (max - min) + min);
        } while (userList.find((user: User) => Number(user.id) === id));

        return id.toString();
    }
}


function findUserByEmail(email:string){
    let users = getData();
    users = users.filter((user) => user.email === email)
    return users.length === 0 ? false : true;
}

function findUserByUsername(username:string){
    let users = getData();
    users = users.filter((user) => user.username === username)
    return users.length === 0 ? false : true;
}


function getUserByUsername(username:string){
     const users = getData();
   return users.filter((user) => user.username === username)
    

}

function getUserById(id:string){
     const users = getData();
   return users.filter((user) => user.id === id)[0]
    

}


function getCurrentUser() {

    const data = localStorage.getItem('currentUser');

    if(data) {
        return JSON.parse(data);
    }

    return undefined;
}

function removeCurrentUser(){
    localStorage.removeItem('currentUser')
}

function setCurrentUser (user:User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
}

export {storeData, getData, findUserByEmail, findUserByUsername, getUserByUsername, getCurrentUser, removeCurrentUser, setCurrentUser, getUserById}
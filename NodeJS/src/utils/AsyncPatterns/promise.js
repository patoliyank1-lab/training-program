import { fakeAPi } from "./fakeApi.js";

export const promiseRouteForFAkeApi = (req, res) => {
    Promise.resolve(fakeAPi).then((value) => {
        return res.send(value)
    })
}

// resolve api using Promise
export const promiseRouteForApi = (req, res) => {
    Promise.resolve(fetch('https://dummyjson.com/users?delay=1000'))
    .then(value => value.json())
    .then((value) => {
         console.log(value);
        return res.send(value)
    })
}
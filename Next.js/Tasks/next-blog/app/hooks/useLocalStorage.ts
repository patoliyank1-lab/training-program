
export function setItem(key:string, value:unknown){
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key:string, initialValue:unknown){

    const value = localStorage.getItem(key);
    if(value){
        return JSON.parse(value)
    }
    setItem(key, initialValue);
    return initialValue;
}
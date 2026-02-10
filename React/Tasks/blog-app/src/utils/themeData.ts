export function storeTheme (theme:string){
    localStorage.setItem('Theme', JSON.stringify(theme));
}

export function getTheme (){
    const data = localStorage.getItem('Theme');
    let theme: string = 'dark';

    if (!data) {
        localStorage.setItem('Theme', JSON.stringify([]));
        return 'dark';
    }
    theme = JSON.parse(data)
    return theme;
}

export function storeSearchHistory(keyword: string) {
    const searchHistory: string[] = getSearchHistory();
    searchHistory.push(keyword);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
};


export function getSearchHistory(): string[] {
    const data = localStorage.getItem('searchHistory');
    let searchHistory: string[] = [];

    if (!data) {
        localStorage.setItem('searchHistory', JSON.stringify([]));
        return [];
    }
    searchHistory = JSON.parse(data)
    return searchHistory;
};


export function rmFromHistory(keyword:string){
    let history = getSearchHistory();
    history = history.filter((key) => key !== keyword);
    localStorage.setItem('searchHistory', JSON.stringify(history));
    return history;
}


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
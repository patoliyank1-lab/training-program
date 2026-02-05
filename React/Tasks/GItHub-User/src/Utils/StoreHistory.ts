
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
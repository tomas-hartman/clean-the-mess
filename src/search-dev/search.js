import { inputData } from './input-data.js';

const input = "deník Respekt vězení gaza";
// const input = "deník";

const replaceLetters = (match, _offset, _string) => {
    const before = "žščřďťňáéíóúíůäëöüľĺŕě".split("");
    const after = "zscrdtnaeiouiuaeoullre".split("");
    const index = before.indexOf(match);

    return after[index];
}

/**
 * 
 * @param {string} string
 * @returns {array} 
 */
const standardize = (string) => {
    try {
        let output = string.toLowerCase();
        output = output.replace(/[žščřďťňáéíóúíůäëöüľĺŕě]/g, replaceLetters);
        output = output.split(" "); // vymyslet více rozdělovačů
    
        return output;
    } catch(err){
        console.error(err);
        return [];
    }
}

/**
 * Returns clean url without params
 * @returns
 */
const cleanUrl = (url) => {
    // new URL(url) => url.origin + url.pathname
}

const search = (data, input) => {
    // standardize data
    let stdInput = standardize(input);
    let output = [];

    const performSearch = (data, stdInput) => {
        output = data.filter((item) => {
            const title = standardize(item.title);
            const url = cleanUrl(item.url);
            const string = url + " " + title;
    
            if(stdInput.length > 1){
                performSearch.call(this, output, stdInput);
                stdInput.shift();
            } else if(string.includes(stdInput[0])){
                return true;
            }
        });
    }
    performSearch(data, stdInput);

    return output;
}

// const found = search(inputData, input);


/// Technical implementation
/// @todo make this async
const inputElm = document.querySelector("#search-input");

inputElm.addEventListener("keyup", (event) => {
    console.log(event.target.value);
    const found = search(inputData, event.target.value);
    console.log(found);
})
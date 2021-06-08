// import { inputData } from './input-data.js';

const { PerformanceObserver, performance } = require('perf_hooks');
const inputData = require("./input-data-big");

const input = "de N ze m k po m a l";

const perfTest = [];



// MAIN FUNCTION
const search = (data, input) => {     
    const replaceLetters = (match, _offset, _string) => {
        const before = "žščřďťňáéíóúíůäëöüľĺŕě".split("");
        const after = "zscrdtnaeiouiuaeoullre".split("");
        const index = before.indexOf(match);
    
        return after[index];
    }

    /**
     * Returns clean url without params
     * @returns {array}
     */
    const cleanUrl = (url) => {
        try {
            const urlObj = new URL(url); // -> zjistit, co udělají about:debugging a další! || performance?
            const protocol = `${urlObj.protocol}//`;

            let output = urlObj.href.substring(protocol.length) // -> "code.visualstudio.com/blogs/2020/05/06/github-issues-integration"
            output = output.split(/\W/); // performance? // ignore special chars / . - etc.

            return output;
        } catch(err){
            console.error(err);
            return [];
        }
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
            output = output.split(/\W/); // ignore special characters
            output = output.filter(item => item !== ""); // ignore empty strings (from special chars etc.)
        
            return output;
        } catch(err){
            console.error(err);
            return [];
        }
    }

    // standardize data
    let stdInput = standardize(input); // @todo ignore non word chars /\W/
    let output = [];

    /**
     * ALGORITHM 1
     * @avgSpeed 23 ms
     */
    const performSearch1 = (data, stdInput) => {
        const master = [data];

        for(let i = 0; i < stdInput.length; i++){
            const output = master[master.length - 1].filter((item) => {
                const title = standardize(item.title);
                const url = cleanUrl(item.url);
                const string = url + "," + title;

                if(string.includes(stdInput[i])) return true;
            });

            master.push(output);
            // console.log(stdInput);
            // console.log(master);
        }

        output = master[master.length - 1];
    }

    /**
     * ALGORITHM 2
     * @avgSpeed 3,1 ms
     */
    const performSearch = (data, stdInput) => {
        output = data.filter((item) => {
            const title = standardize(item.title);
            const url = cleanUrl(item.url);
            const string = url + "," + title;

            // console.log(string);
            // console.log(stdInput);
    
            // Currently working well and is the fastest
            // Working with output might be a nice performance booster
            // Would need to save found to state and reinitiate search again from the state
            if(stdInput.length === 1 && string.includes(stdInput[0])) return true; 
            for(let i=0;i<stdInput.length;i++){
                if(!string.includes(stdInput[i])){
                    break;
                }
                if(i === stdInput.length-1){
                    return true;
                }
            }

            // OLD ALGORITHM DO NOT DELETE YET
            /*if(stdInput.length > 1){
                performSearch.call(this, output, stdInput); // v případě, že je všechno v pohodě, hledám dál v outputu
                stdInput.shift(); // this is the cause of the bug -- it only allows searching one string
            } else if(string.includes(stdInput[0])){ // this part will be required to repeat for each from stdInput
                return true;
            } */
        });
    }

    /**
     * ALGORITHM 1 v.2
     * @avgSpeed 21,7 ms
     */
    const performSearch3 = (data, stdInput) => {
        let master = data;

        for(let i = 0; i < stdInput.length; i++){
            const output = master.filter((item) => {
                const title = standardize(item.title);
                const url = cleanUrl(item.url);
                const string = url + "," + title;

                if(string.includes(stdInput[i])) return true;
            });

            master = output;
            // console.log(stdInput);
            // console.log(master);
        }

        output = master;
    }
    performSearch(data, stdInput);

    return output;
}

for(let i = 0; i<1000; i++){
    const perfBefore = performance.now();
    const result = search(inputData, input);
    const perfAfter = performance.now();

    perfTest.push(perfAfter-perfBefore);
}

let testResult = 0;
perfTest.forEach(test => {
    testResult = testResult + test;
});

const finalAvgSpeed = testResult / perfTest.length; 

console.log(finalAvgSpeed);

import { Tabs } from "webextension-polyfill";

const REPLACABLE_CHARS = {
  before: 'žščřďťňáéíýóúíůäëïöüľĺŕćńóśźěığçşţâêîôûàèùąęįųłżőűãõåøķīāūßė',
  after: 'zscrdtnaeiyouiuaeioullrcnoszeigcstaeiouaeuaeiulzouaoaokiauße',
}

const replaceLetters = (match: string) => {
  const before = REPLACABLE_CHARS.before.split('');
  const after = REPLACABLE_CHARS.after.split('');
  const index = before.indexOf(match);

  return after[index];
}

/**
 *
 * @param {string} string
 * @returns {array}
 */
const standardize = (input: string) => {
  try {
    const regex = new RegExp(`[${REPLACABLE_CHARS.before}]`, 'g');
    let output = input.toLowerCase();
    output = output.replace(
      // /[žščřďťňáéíýóúíůäëïöüľĺŕćńóśźěığçşţâêîôûàèùąęįųłżőűãõåøķīāūßė]/g,
      regex,
      replaceLetters,
    );
    
    // output = output.split(/\W/); // ignore special characters
    // output = output.split(/[\[\]<>!?:@#\$%\^\&*\)\(+=._-\s\,“„'"]/); // other, more general

    let outputArr = output.split(/[^\wß]/); // ignore special characters except ß
    outputArr = outputArr.filter((item) => item !== ''); // ignore empty strings (from special chars etc.)

    return outputArr;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 * Returns clean url without params
 * @returns {array}
 */
const cleanUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const protocol = `${urlObj.protocol}//`;

    if (protocol.includes('http')) {

      // -> "code.visualstudio.com/blogs/2020/05/06/github-issues-integration"
      let output = urlObj.href.substring(protocol.length);
      let outputArr = output.split(/\W/); // performance? // ignore special chars / . - etc.
      outputArr = outputArr.filter((cell) => cell !== '');

      return outputArr;
    }
    const output = standardize(url);
    return output;
  } catch (err) {
    const output = standardize(url);
    console.info('Url could not be parsed, standardized as a string instead');
    return output;
  }
}

/**
 * Second algorithm, avg. 203 items / 3.2 s
 * @todo input is string or string[] ??
 * @param {array} data __tabs__
 * @param {array} stdInput array of strings, received from standardize()
 */
const perform = (data: Tabs.Tab[], input: string) => {
  const stdInput = standardize(input); // @todo ignore non word chars /\W/
  const output = data.filter((item) => {
    // TODO title, url handle ""
    const title = standardize(item.title || "");
    const url = cleanUrl(item.url || "");
    const string = `${url},${title}`;

    if (stdInput.length === 1 && string.includes(stdInput[0])) return true;
    for (let i = 0; i < stdInput.length; i += 1) {
      if (!string.includes(stdInput[i])) {
        break;
      }
      if (i === stdInput.length - 1) {
        return true;
      }
    }
  });

  return output;
}


/**
 * @todo Load this from external module!
 * search.perform() initiates the search
 * @param {array} data __tabs__ general array with all
 * @param {string} input
 */

// search.perform() initiates the search
export const search = {
  perform
};

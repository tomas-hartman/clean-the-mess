/**
 * @todo Load this from external module!
 * search.perform() initiates the search
 * @param {array} data __tabs__ general array with all
 * @param {string} input
 */

// search.perform() initiates the search
export const search = {
  lettersToReplace: {
    before: 'žščřďťňáéíýóúíůäëïöüľĺŕćńóśźěığçşţâêîôûàèùąęįųłżőűãõåøķīāūßė',
    after: 'zscrdtnaeiyouiuaeioullrcnoszeigcstaeiouaeuaeiulzouaoaokiauße',
  },

  replaceLetters(match, _offset, _string) {
    const before = search.lettersToReplace.before.split('');
    const after = search.lettersToReplace.after.split('');
    const index = before.indexOf(match);

    return after[index];
  },

  /**
     * Returns clean url without params
     * @returns {array}
     */
  cleanUrl(url) {
    try {
      // -> zjistit, co udělají about:debugging a další! || performance?
      const urlObj = new URL(url);
      const protocol = `${urlObj.protocol}//`;

      if (protocol.includes('http')) {
        // -> "code.visualstudio.com/blogs/2020/05/06/github-issues-integration"
        let output = urlObj.href.substring(protocol.length);
        output = output.split(/\W/); // performance? // ignore special chars / . - etc.
        output = output.filter((cell) => cell !== '');

        return output;
      }
      const output = this.standardize(url);
      return output;
    } catch (err) {
      const output = this.standardize(url);
      console.info('Url could not be parsed, standardized as a string instead');
      return output;
    }
  },

  /**
     *
     * @param {string} string
     * @returns {array}
     */
  standardize(string) {
    try {
      const regex = new RegExp(`[${search.lettersToReplace.before}]`, 'g');
      let output = string.toLowerCase();
      output = output.replace(
        // /[žščřďťňáéíýóúíůäëïöüľĺŕćńóśźěığçşţâêîôûàèùąęįųłżőűãõåøķīāūßė]/g,
        regex,
        this.replaceLetters,
      );
      // output = output.split(/\W/); // ignore special characters
      // output = output.split(/[\[\]<>!?:@#\$%\^\&*\)\(+=._-\s\,“„'"]/); // other, more general
      output = output.split(/[^\wß]/); // ignore special characters except ß
      output = output.filter((item) => item !== ''); // ignore empty strings (from special chars etc.)

      return output;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  /**
     * Second algorithm, avg. 203 items / 3.2 s
     * @param {array} data __tabs__
     * @param {array} stdInput array of strings, received from standardize()
     */
  perform(data, input) {
    const stdInput = this.standardize(input); // @todo ignore non word chars /\W/
    const output = data.filter((item) => {
      const title = this.standardize(item.title);
      const url = this.cleanUrl(item.url);
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
  },
};

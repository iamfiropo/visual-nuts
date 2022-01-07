const fs = require('fs');

const data = fs.readFileSync('../data.json', 'utf8');
const parsedData = JSON.parse(data);


function countriesAndLanguages(list) {

  // The number of countries in the world
  let noOfCountries = list.length;

  const { languageMap, languageMapMaxValue, ...rest } = helperFunc(list);

  const mostCommonLanguages = mostCommonOfficialLang(languageMap, languageMapMaxValue)

  return { noOfCountries, mostCommonLanguages, ...rest };
}

function helperFunc(list) {
  let languagesMaxLength = 0;
  let highestOfficialLanguages = 0;
  let highestOfficialLanguagesCountry = '';
  let allOfficialLanguagesCount = 0
  let languageMapMaxValue = 0
  let languageMap = {};
  let mostLanguagesCountry = '';

  for (let item of list) {  
      item.languages.forEach(language => {
      // The country with the most official languages, where they officially speak German (de)
      if (language === 'de') {
        if (language.length > languagesMaxLength) {
          mostLanguagesCountry = item.country;
          languagesMaxLength = language.length;
        }
      }

      !languageMap[language] ? languageMap[language] = 1 : ++languageMap[language];

      // This keep track of the most common official language(s) to avoid extra loop
      if (languageMap[language] > languageMapMaxValue) languageMapMaxValue = languageMap[language]
      
      // Counts all the official languages spoken in the listed countries
      allOfficialLanguagesCount++
    })

    // The country with the highest number of official languages
    if (item.languages.length > highestOfficialLanguages) {
      highestOfficialLanguages = item.languages.length;
      highestOfficialLanguagesCountry = item.country;
    }
  }

  return {
    mostLanguagesCountry,
    allOfficialLanguagesCount,
    highestOfficialLanguagesCountry,
    languageMapMaxValue,
    languageMap
  }
}

// The most common official language(s), of all countries
function mostCommonOfficialLang(languageMap, languageMapMaxValue) {
  const mostCommonLanguages = [];

  for (let [key, value] of Object.entries(languageMap)) {
    if (value === languageMapMaxValue) mostCommonLanguages.push(key);
  }

  return mostCommonLanguages
}

console.log(countriesAndLanguages(parsedData))
/**
 * Perform data mapping from source record to destination record. Fields available in the source record are: 
 * 
 * $.firstname, $.surname, $.gender
 * $.born, $.bornCity, $.bornCountry, $.bornCountryCode
 * $.died, $.diedCity, $.diedCountry, $.diedCountryCode
 * $.prizes[].category, $.prizes[].motivation, $.prizes[].year
 */

module.exports = $ => ({
    name: $.firstname + ' ' + $.surname,
    born: $.bornCity + ', ' + $.bornCountry,
    category: $.prizes[0].category,
    year: $.prizes[0].year,
    motivation: $.prizes[0].motivation,
    ageWhenAwarded: $.born ? +$.prizes[0].year - +$.born.substring(0, 4) : -1
});

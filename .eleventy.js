//const site = require('./src/_data/site.json');

module.exports = function(eleventyConfig) {

  //const { DateTime } = require("luxon");
  var moment = require('moment-timezone');

  eleventyConfig.addPassthroughCopy('./src/style.css');
  eleventyConfig.addPassthroughCopy('./src/assets');

  /* eleventyConfig.addFilter("postHour", (dateObj) => {  
     return DateTime.fromFormat(dateObj,'dd/MM/yyyy HH:mm', { locale: 'pt-br' }).toLocaleString(DateTime.TIME_24_SIMPLE);    
   });*/
  /*eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromFormat(dateObj,'dd/MM/yyyy HH:mm', { locale: 'pt-br' }).toLocaleString(DateTime.DATE_SHORT);    
  });*/

  eleventyConfig.addFilter("postHour", (dateObj) => {
    return moment(dateObj).tz('America/Sao_Paulo').format('HH:mm');
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return moment(dateObj).tz('America/Sao_Paulo').format('DD/MM/yyyy');
  });

  //https://daily-dev-tips.com/posts/creating-a-custom-eleventy-filter/
  eleventyConfig.addFilter('exibir', function(array, limit) {
    return array.slice(array.length-limit);
  });

  /*eleventyConfig.addCollection("sortByDate5", function(collectionApi) {
    return collectionApi.getAll().sort(function(a, b) {
      return b.date - a.date;
    });
  });*/
  /*eleventyConfig.addCollection("sortByDate5", function(collection) {
    return collection.getAll().sort(function(a, b) {
      return b.date - a.date;
    });
  });*/
  /*eleventyConfig.addCollection("sortPalestas", function(collection, limit) {
    let now = new Date();
    //let count = 0;
    return collection.getAll().sort(function(a, b) {
      return b.date > a.date && b.date >= now;
    });
  });*/
  eleventyConfig.addCollection("sortPalestas", function(collection) {
    let now = new Date();
    //let count = 0;
    return collection.getAll().sort(function(a, b) {
      return b.date > a.date && b.date >= now;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}
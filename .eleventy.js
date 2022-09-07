//const site = require('./src/_data/site.json');

module.exports = function(eleventyConfig) {

  //const { DateTime } = require("luxon");
  const now = new Date();
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
  eleventyConfig.addFilter("aPartirDeHoje", function(collection) {
    return collection.filter(function(item) {      
      return item.date >= now;
    });
  });  
  //https://daily-dev-tips.com/posts/creating-a-custom-eleventy-filter/
  eleventyConfig.addFilter("exibir", function(collection, limit) {
    return collection.slice(0, limit);
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}
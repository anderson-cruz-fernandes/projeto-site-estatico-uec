//const site = require('./src/_data/site.json');
//const del = require('del');

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
      return new Date(item.date) >= now;
    });
  });  
  //https://daily-dev-tips.com/posts/creating-a-custom-eleventy-filter/
  eleventyConfig.addFilter("exibir", function(collection, limit) {
    return collection.slice(0, limit);
  });
  eleventyConfig.addFilter("ehTercaFeira", function(collection) {
    return collection.filter(function(item) {      
      return new Date(item.date).getDay() === 2;
    });
  });
  eleventyConfig.addFilter("ehQuintaFeira", function(collection) {
    return collection.filter(function(item) {
      return new Date(item.date).getDay() === 4;
    });
  });
  eleventyConfig.addFilter("ehSabado", function(collection) {
    return collection.filter(function(item) {      
      return new Date(item.date).getDay() === 6;
    });
  });
  eleventyConfig.addFilter("existePalestra", function(collection) {
    return collection.filter(function(item) {      
      return item.length != 0;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}
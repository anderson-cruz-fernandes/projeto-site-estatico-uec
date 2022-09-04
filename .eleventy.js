const site = require('./src/_data/site.json');

module.exports = function(eleventyConfig) {

  const { DateTime } = require("luxon");
  
  eleventyConfig.addPassthroughCopy('./src/style.css');
  eleventyConfig.addPassthroughCopy('./src/assets');

  eleventyConfig.addFilter("postHour", (dateObj) => {  
    return DateTime.fromFormat(dateObj,'dd/MM/yyyy HH:mm', { locale: 'pt-br' }).toLocaleString(DateTime.TIME_24_SIMPLE);    
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromFormat(dateObj,'dd/MM/yyyy HH:mm', { locale: 'pt-br' }).toLocaleString(DateTime.DATE_SHORT);    
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}
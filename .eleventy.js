//const site = require('./src/_data/site.json');
//const del = require('del');
var paginaInicialPalestrantes = '';
module.exports = function(eleventyConfig) {
  
  const now = new Date();
  var moment = require('moment-timezone');

  eleventyConfig.addPassthroughCopy('./src/style.css');
  eleventyConfig.addPassthroughCopy('./src/assets');

  eleventyConfig.addFilter("currentYear", function() {
    return new Date().getFullYear();
  });

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

  eleventyConfig.addFilter("setPaginaInicialPalestrantes", function(collection, pageNumber) {    
    return collection.filter(function(item) {
        //console.log('item_date = ' + new Date(item.date).toISOString())
        //console.log('now = ' + now.toISOString())
        //console.log('resultado do If = ' + ((new Date(item.date) >= now) && (paginaInicialPalestrantes === '')))
        //console.log('paginaInicialPalestrantes = ' + (paginaInicialPalestrantes === ''))
        //console.log('paginaInicialPalestrantes = ' + paginaInicialPalestrantes)
        //console.log('pageNumber = ' + (pageNumber))
        
        if ((new Date(item.date) >= now) && (paginaInicialPalestrantes === '')) {           
          paginaInicialPalestrantes = (pageNumber).toString();
          //console.log('ACHOU PÁGINA INICIAL!! -> ' + (pageNumber).toString())
        }
      return true;    
    });
  });

  eleventyConfig.addShortcode("urlPalestras", () => '/palestras/'+paginaInicialPalestrantes);

  eleventyConfig.addPassthroughCopy('src/_redirects');
  eleventyConfig.addPassthroughCopy('src/_headers');
  //eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/feed');
  
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    passthroughFileCopy: true,
  };
}
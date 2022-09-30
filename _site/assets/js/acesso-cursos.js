let token = ""
$.get('/acesso', {contentType: "application/x-www-form-urlencoded"}, (response) => {
  token = encodeURIComponent(response);
  $.get('/_redirect', {token: token}, (response) => {
          if(response == "OK"){
              window.location.href = "https://www.sympla.com.br/meeting-room/" + token;
          }
  })
})

/*https://stackoverflow.com/a/51854096*/
/*
const userAction = async () => {
  const response = await fetch('http://example.com/movies.json');
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
}
*/

/*
const userAction = async () => {
  const response = await fetch('http://example.com/movies.json', {
    method: 'POST',
    body: myBody, // string or object
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
}
*/
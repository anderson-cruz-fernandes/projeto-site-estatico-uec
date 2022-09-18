let token = ""
$.get('/acesso', {contentType: "application/x-www-form-urlencoded"}, (response) => {
  token = encodeURIComponent(response);
  $.get('/_redirect', {token: token}, (response) => {
          if(response == "OK"){
              window.location.href = "https://www.sympla.com.br/meeting-room/" + token;
          }
  })
})
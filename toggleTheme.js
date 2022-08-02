function toggleTheme(){
    var theme = document.getElementById('css-file');

    if (theme.getAttribute('href') == "style.css"){
      theme.setAttribute('href', "dark.css");
    }else{
      theme.setAttribute('href', "style.css");
    }
  }
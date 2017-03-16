export default function myModule() {
  var rawTemplate = document.getElementById("entry-template").innerHTML;
  var petsContainer = document.getElementById("entry");
  var scrollTimeout;
  var pageNumber=0;
  function createHTML(petsData) {
    var PAGE_SIZE=3;
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    var pageProjects = petsData.projects.slice(from, to);
    pageNumber++;
    var newData = {};
    newData.projects=pageProjects;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(newData);
    petsContainer.insertAdjacentHTML("beforeEnd", ourGeneratedHTML);
  }

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      if(  $(window).scrollTop() + $(window).height() >= $(document).height() - 200){
        $.ajax({
          type: "GET",
          url: "../json/projects.json",
        }).done(function(data) {
          createHTML(data);
        });
      }
    },100)
  })

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','../json/projects.json');
    ourRequest.onload = function() {
      if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var data = JSON.parse(ourRequest.responseText);
        createHTML(data);
      } else {
        console.log("We connected to the server, but it returned an error.");
      }
    };

    ourRequest.onerror = function() {
      console.log("Connection error");
    };

    ourRequest.send();

}



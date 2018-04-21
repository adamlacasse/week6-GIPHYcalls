$(document).ready(function() {

  $("body").on("click", ".animal-button", function(){    
    event.preventDefault();
    var searchTerm = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oj1rH7fHQGbu1lwdH0WZcAmP0c7lI23V&q=" + searchTerm + "&limit=10"
    ajaxCall(searchTerm, queryURL); 
    console.log("clicked an .animal-button with the value: " + searchTerm);
  });

  $("body").on("click", ".ajaxImage", function(){         
    if ($(this).attr("value") == "animated"){
      $(this).attr("src", $(this).attr("srcS"));
      $(this).attr("value", "still");
    } else {
      $(this).attr("src", $(this).attr("srcA"));
      $(this).attr("value", "animated");
    }
  });

  $("#clear").on("click", function(){
    event.preventDefault();     
    $("#images").empty();
  });

  $("#addAnimal").on("click", function() {
    event.preventDefault();  
    var animal = $("#inputAnimal").val();
    var animalButton = document.createElement('button');
    animalButton.className = "btn btn-info animal-button";
    animalButton.value = animal;
    animalButton.innerHTML = `${animal}`;
    $("#animal-button").append(animalButton);
    $("#inputAnimal").val('');
  }); 

  function ajaxCall(searchTerm, queryURL){
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        
      for (i = 0; i < response.data.length; i++){
        var giphyResponse = {stURL: response.data[i].images.fixed_height_still.url,
                              anURL: response.data[i].images.fixed_height.url}        
        var animalImage = $("<img>");
        animalImage.attr("src", giphyResponse.anURL);
        animalImage.attr("srcA", giphyResponse.anURL);
        animalImage.attr("srcS", giphyResponse.stURL);
        animalImage.attr("alt", "returned image");
        animalImage.attr("value", "animated");
        animalImage.attr("class", "ajaxImage");
        animalImage.attr("title", "you chose: " + searchTerm);
        $("#images").prepend(animalImage);     
      }
    }); 
  } 
  
  }); 
  
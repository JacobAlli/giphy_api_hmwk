
var sports = ["Basketball", "football", "baseball", "soccer", "rugby", "olympic curling", "hockey", "cycling", "swimming", "track"];

var populateButtons = () => {

    for( i=0; i < sports.length - 1; i++ ){
        var button = $("<button>");
        button.addClass("btn");
        button.addClass("btn-primary");
        button.addClass("giphy-button");
        button.attr("data-name", sports[i]);
        button.html(sports[i]);
        $(".button-section").append(button);
    };
};

var displayGif = function(){
    var searchQuery = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);

        for(i=0; i<10; i++){
            var newGif = $('<img>');
            var newP = $('<p>');
            newGif.addClass('gif');
            newGif.attr("animate-status", "still");
            newGif.attr("still-url", response.data[i].images.fixed_height_small_still.url);
            newGif.attr("animate-url", response.data[i].images.fixed_height_small.url);
            newGif.attr('src', response.data[i].images.fixed_height_small_still.url);
            newP.html(response.data[i].rating);
            var newDiv = $('<div>');
            newDiv.addClass('col-md-3');
            newDiv.addClass('newGif');
            newDiv.append(newGif);
            newDiv.append(newP);
            $(".gif-section").prepend(newDiv);


        }
    });
};

var animateGif = function(){
    if($(this).attr("animate-status") === "still"){
        $(this).attr('src', $(this).attr("animate-url"));
        $(this).attr("animate-status", "animate");
    }
};

var deAnimateGif = function(){
    if($(this).attr("animate-status") === "animate"){
        $(this).attr('src', $(this).attr("still-url"));
        $(this).attr("animate-status", "still");
    }
}

var addToButtonList = function(){
    var newButton = $('<button>');
    newButton.addClass("btn");
    newButton.addClass("btn-primary");
    newButton.addClass("giphy-button");
    newButton.attr("data-name", $('input').val().trim());
    newButton.html($('input').val().trim());
    $(".button-section").append(newButton);

}

$(document).ready(function(){
    $(document).on("click", ".giphy-button", displayGif);
    $(document).on("mouseover", ".gif", animateGif);
    $(document).on("mouseout", ".gif", deAnimateGif);
    $(document).on("click", ".submit-button", addToButtonList);
});

populateButtons();


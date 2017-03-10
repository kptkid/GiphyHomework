window.onload=start;
var topics = ["It's Always Sunny in Philadelphia", "Rick and Morty", "Dexter", "Breaking Bad", "Nathan for You", "Tim and Eric Awesome Show, Great Job!"];
function start () {
    for (var i=0; i<topics.length; i++) {
        var button = $("<button>");
        button.attr("data-show", topics[i]);
        button.text(topics[i]);
        button.addClass("btn btn-primary btowns");
        $("#buttons").append(button);
    }
}
$("#buttonsSearch").on("click", "button", function() {
      var show = $(this).attr("data-show");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=dc6zaTOxFJmzC&limit=10";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage.attr({"src": results[i].images.fixed_height_still.url, "data-state": "still", "data-still": results[i].images.fixed_height_still.url, "data-animate": results[i].images.fixed_height.url});
            $(gifImage).addClass("gif");
            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
});
$("#gifs-appear-here").on("click", "img", function() {
      var state= $(this).attr("data-state");      
      if (state=="still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
$("#hookerFucker").on("click", function(event){
    event.preventDefault();
    topics.push($("#hookedFucker").val().trim());
    var btn = $("<button>");
    btn.attr("data-show", $("#hookedFucker").val().trim());
    btn.text($("#hookedFucker").val().trim());
    btn.addClass("btn btn-primary btowns");
    $("#buttons").append(btn);
    $("#hookedFucker").val("");    
});
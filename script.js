$(document).ready(function() {
  $("#search-button").on("click", function() {
    var searchValue = $("#search-value").val();

    // clear input box
    $("#search-value").val("");

    
    searchWeather(searchValue);
  });



  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  
  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=759b95c1ac9359556e284c83c7faa744&units=imperial",
      dataType: "json",
      success: function(data) {
        console.log(data);
       
      
        //create history link for this search
        var history = [];

        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));
          $(".history").val(localStorage.getItem("history"));
    
          makeRow(searchValue);
        }
        
        // clear any old content
        $("#today").empty();
        $("#forecast1").empty();
        $("#forecast2").empty();
        $("#forecast3").empty();
        $("#forecast4").empty();
        $("#forecast5").empty();
        
        // create html content for current weather
        var currentDay = moment().format("ddd MMM DD");
        var cardTitle = $("<h5>").text("Today: " + currentDay);
        var title = $("<h1>").addClass("card-title").text(data.name);
        var card = $("<div>").addClass("card border-primary bg-light").css("border-width", "thick");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp.toFixed() + " °F");
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png").width("100").height("100");
        
        
        // merge and add to page
        title.append(img);
        cardBody.append(cardTitle, title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);
        

        // call follow-up api endpoints
        getForecast(searchValue);

        //getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }
  
//5 Day Forecast
  
  function getForecast(searchValue) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=759b95c1ac9359556e284c83c7faa744&units=imperial",
      dataType: "json"
    })
      .then (function(response) {
        console.log(response);
        
        //Day1
        var dayF = moment(response.list[7].dt_txt).format("ddd MMM DD");
        var titleF = $("<h5>").addClass("card-title").text(dayF);
        var cardF = $("<div>").addClass("card mb-2 bg-primary text-white");
        var humidF = $("<p>").addClass("card-text").text("Humidity: " + response.list[7].main.humidity + "%");
        var tempF = $("<p>").addClass("card-text").text("Temperature: " + response.list[7].main.temp.toFixed() + " °F");
        var cardBodyF= $("<div>").addClass("card-body");
        var imgF = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[7].weather[0].icon + ".png");

        titleF.append(imgF);
        cardBodyF.append(titleF, tempF, humidF);
        cardF.append(cardBodyF);
        $("#forecast1").append(cardF);
        
        //Day2
        var dayF = moment(response.list[15].dt_txt).format("ddd MMM DD");
        var titleF = $("<h5>").addClass("card-title").text(dayF);
        var cardF = $("<div>").addClass("card mb-2 bg-primary text-white");
        var humidF = $("<p>").addClass("card-text").text("Humidity: " + response.list[15].main.humidity + "%");
        var tempF = $("<p>").addClass("card-text").text("Temperature: " + response.list[15].main.temp.toFixed() + " °F");
        var cardBodyF= $("<div>").addClass("card-body");
        var imgF = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[15].weather[0].icon + ".png");

        titleF.append(imgF);
        cardBodyF.append(titleF, tempF, humidF);
        cardF.append(cardBodyF);
        $("#forecast2").append(cardF);

        //Day3
        var dayF = moment(response.list[23].dt_txt).format("ddd MMM DD");
        var titleF = $("<h5>").addClass("card-title").text(dayF);
        var cardF = $("<div>").addClass("card mb-2 bg-primary text-white");
        var humidF = $("<p>").addClass("card-text").text("Humidity: " + response.list[23].main.humidity + "%");
        var tempF = $("<p>").addClass("card-text").text("Temperature: " + response.list[23].main.temp.toFixed() + " °F");
        var cardBodyF= $("<div>").addClass("card-body");
        var imgF = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[23].weather[0].icon + ".png");

        titleF.append(imgF);
        cardBodyF.append(titleF, tempF, humidF);
        cardF.append(cardBodyF);
        $("#forecast3").append(cardF);

        //Day4
        var dayF = moment(response.list[31].dt_txt).format("ddd MMM DD");
        var titleF = $("<h5>").addClass("card-title").text(dayF);
        var cardF = $("<div>").addClass("card mb-2 bg-primary text-white");
        var humidF = $("<p>").addClass("card-text").text("Humidity: " + response.list[31].main.humidity + "%");
        var tempF = $("<p>").addClass("card-text").text("Temperature: " + response.list[31].main.temp.toFixed() + " °F");
        var cardBodyF= $("<div>").addClass("card-body");
        var imgF = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[31].weather[0].icon + ".png");

        titleF.append(imgF);
        cardBodyF.append(titleF, tempF, humidF);
        cardF.append(cardBodyF);
        $("#forecast4").append(cardF);

        //Day5
        var dayF = moment(response.list[39].dt_txt).format("ddd MMM DD");
        var titleF = $("<h5>").addClass("card-title").text(dayF);
        var cardF = $("<div>").addClass("card mb-2 bg-primary text-white");
        var humidF = $("<p>").addClass("card-text").text("Humidity: " + response.list[39].main.humidity + "%");
        var tempF = $("<p>").addClass("card-text").text("Temperature: " + response.list[39].main.temp.toFixed() + " °F");
        var cardBodyF= $("<div>").addClass("card-body");
        var imgF = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[39].weather[0].icon + ".png");

        titleF.append(imgF);
        cardBodyF.append(titleF, tempF, humidF);
        cardF.append(cardBodyF);
        $("#forecast5").append(cardF);


      }
  )}
});

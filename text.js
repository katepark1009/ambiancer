class Text{
  constructor(){
    this.articles = [];
    this.newsDataSuccess = this.newsDataSuccess.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }
  getNewsData(query, day=30, month=4, year=2019){
    let formattedDate = year+"-"+month+"-"+day;
    let formattedQuery = {
      happy:["puppy","pizza"],
      sad:["dead","accident"],
      chill:["cafe","vacation"],
      hype:["party","intense"],
      romantic:["love","flower"],
      confident:["business","skydiving"]
    }
    let randomIndex = Math.floor(Math.random()*formattedQuery[query].length);
    let search = formattedQuery[query][randomIndex];
    let ajaxOptions = {
      url: 'https://newsapi.org/v2/everything',
      method: 'get',
      dataType: 'json',
      data:{
        q: search,
        from: formattedDate,
        sortBy: "popularity",
        language: "en",
        apiKey: "5e6556e5beed49609afc392ff37eb5b6"
      },
      success: this.newsDataSuccess,
      error: function(){ console.log("An error happened.");}
    }
    $.ajax(ajaxOptions);
  }
  getPoems(query){
    let formattedQuery = {
      happy:["puppy"],
      sad:["dead"],
      chill:["cafe"],
      hype:["party"],
      romantic:["love"],
      confident:["business"]
    }
    let randomIndex = Math.floor(Math.random()*formattedQuery[query].length);
    let search = formattedQuery[query][randomIndex];
    let url = "http://poetrydb.org/lines/"+search;
    let ajaxOptions = {
      url: url,
      method: 'get',
      dataType: 'json',
      success: this.poemSuccess,
      error: function(){ console.log("An error happened.");}
    }
    $.ajax(ajaxOptions);
  }
  newsDataSuccess(response){
    $(".article-title").empty();
    $(".article-author").empty();
    console.log("articles:",response);
    console.log("articles.content:",response.articles[0].content);
    this.articles = response.articles;
    let randomIndex;
    while(response.articles.length > 0){
      randomIndex = Math.floor(Math.random()*response.articles.length);
      let article = response.articles.splice(randomIndex,1)[0];
      if(article.content){
        this.articles.push(article);
        let articleTitle = $("<p>").text(article.title);
        let firstBr = $("<br>");
        let secondBr = $("<br>");
        articleTitle.on("click",this.handleTitleClick);
        $(".news-feed").append(articleTitle).append(firstBr).append(secondBr);
      }
      else{

      }
    }
  }
  poemSuccess(response){
    $(".poem-title").empty();
    $(".poem-author").empty();
    console.log("poems:",response);
    this.poems = response;
    let randomIndex = Math.floor(Math.random()*response.length);
    var poemTitle = $("<p>").text(response[randomIndex].title);
    var poemAuthor = $("<p>").text("Author: "+response[randomIndex].author);
    $(".poem-title").append(poemTitle);
    $(".poem-author").append(poemAuthor);
    // var postString = response[randomIndex].lines;
    // console.log('postString :', postString);
    // while(postString.length<0) {
    //   for(var i = 0; i < postString.length; i++) {
    //     var newLine = $('<p>').text(postString[i]);
    //     if(postString[i] === "") {
    //       newLine = $('<br>');
    //     }
    //     $('.poem-text').append(newLine)
    //   }
    // }
    var preString = "";
    var postString = response[randomIndex].lines.join(" ");
    var semiIndex = postString.indexOf(";");
    var periodIndex = postString.indexOf(".");
    var commaIndex = postString.indexOf(",");
    preString += postString;
    postString = preString;
    preString = "";
    while(periodIndex > -1){
      preString += postString.substring(0,periodIndex+1);
      postString = postString.substring(periodIndex+1,postString.length);
      postString = postString.split("");
      postString.unshift("<br><br>");
      postString = postString.join("");
      periodIndex = postString.indexOf(".");
    }
    preString += postString;
    postString = preString;
    preString = "";
    while(commaIndex > -1){
      preString += postString.substring(0,commaIndex+1);
      postString = postString.substring(commaIndex+1,postString.length);
      postString = postString.split("");
      postString.unshift("<br><br>");
      postString = postString.join("");
      commaIndex = postString.indexOf(",");
    }
    preString += postString;
    $(".poem-text").html("<p class='text'>"+preString+"</p>");
  }
  handleTitleClick(event){
   $(".section2").empty();
   let title = $(event.target).text();
   let chosenArticle;
   for(let article of this.articles){
     if(article.title === title){
       chosenArticle = article;
       break;
     }
   }
   let textIndex = chosenArticle.content.indexOf("[+");
   let formattedText = chosenArticle.content.substring(0,textIndex);
   let row1 = $("<div>").addClass("row1 row");
   let row2 = $("<div>").addClass("row2 row");
   let row3 = $("<div>").addClass("row3 row");
   let row4 = $("<div>").addClass("row4 row");
   let articleAuthor = $("<div>").addClass("col-12 article-author").text(chosenArticle.author);
   let articleInfo = $("<div>").addClass("col-12 mini-div article-info");
   let articleText = $("<div>").addClass("col-12 mini-div article-text").text(formattedText);
   let articleTitle = $("<div>").addClass("col-12 article-title").text(chosenArticle.title);
   $(".section2").append(row1).append(row2);
   $(".row1").append(articleInfo);
   $(".article-info").append(row3).append(row4);
   $(".row3").append(articleTitle);
   $(".row4").append(articleAuthor);
   $(".row2").append(articleText);
 }
}

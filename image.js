
class Images {
    constructor() {
      this.url;
      this.api_KEY;
      this.images = [];
      this.randomImage;
      if(presentationMode){
        this.ambience = {
          'happy': ['puppy'],
          'sad': ['rainy'],
          'motivated': ['motivational'],
          'chill': ['adventurous'],
          'romantic': ['wedding'],
          'hype': ['hiphop']
        }
      }
      else{
        this.ambience = {
          'happy': ['happy', 'puppy'],
          'sad': ['gloomy', 'rainy'],
          'motivated': ['successful', 'motivational'],
          'chill': ['ambience', 'adventurous'],
          'romantic': ['rose', 'wedding'],
          'hype': ['hiphop','rapper']
        }
      }
      this.randomImages = this.randomImages.bind(this);
    }
    getImages(mood) { //getting images from pixbay using .getJSON
      this.api_KEY = keys.images;
      var random = 0;
      if(!presentationMode){
        random = Math.random() < 0.5 ? 1 : 0;
      }
      this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent(this.ambience[mood][random]);
      $.getJSON(this.url, data => {
        if (parseInt(data.totalHits) > 0) {
          this.images = data.hits.map( hit => hit.largeImageURL );
          this.randomImages();
        } else {
          handleError();
        }
      });
    }
    randomImages() { // pick random 4 images and set those as a background for each sections
      var newImageArray = [];
      for (var i = 0; i < 5; i++) {
        this.random = Math.floor(Math.random() * this.images.length);
        this.randomImage = this.images.splice(this.random, 1);
        newImageArray.push(this.randomImage);
      }
      for( var i = 0; i < 5; i++){
        var section = $('.section'+i);
        section.css('background-image', `url(${newImageArray[i]})`);
      }
      this.images=[];
    }
  }

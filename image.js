
class Images {
    constructor() {
      this.api_KEY = "12346261-e063da4b76d894b5549aed673";
      this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent('baloon');
      this.images = [];
      this.ramdom;
      this.randomImage;
      this.newDiv;
      this.ambience = {
          'happy': ['happy', 'puppy'],
          'sad': ['gloomy', 'rainy'],
          'motivated': ['successful', 'motivational'],
          'chill': ['ambience', 'adventurous'],
          'romantic': ['rose', 'wedding'],
          'hype': ['urban','city']
      }
      this.randomImages = this.randomImages.bind(this);
    }
    getImages(mood) {
        var random = Math.random() < 0.5 ? 1 : 0;
        console.log('random mood-image search keyword :', this.ambience[mood][random]);
        this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent(this.ambience[mood][random]);
      $.getJSON(this.url, data => {
        if (parseInt(data.totalHits) > 0) {
          $.each(data.hits, (i, hit) => {
            this.images.push(hit.largeImageURL);
          });
          console.log("images array:", this.images);
          this.randomImages();
        } else {
          console.log("No hits");
        }
      })
    }
    randomImages() {
      var newImageArray = [];
      for (var i = 0; i < 4; i++) {
        this.random = Math.floor(Math.random() * this.images.length);
        this.randomImage = this.images.splice(this.random, 1);
        newImageArray.push(this.randomImage);
      }
      $('.section1').css("background-image", "url(" + newImageArray[0] + ")");
      $('.section2').css("background-image", "url(" + newImageArray[1] + ")");
      $('.section3').css("background-image", "url(" + newImageArray[2] + ")");
      $('.section4').css("background-image", "url(" + newImageArray[3] + ")");    
      this.images=[]; 
    }
  }

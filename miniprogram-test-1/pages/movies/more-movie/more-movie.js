// pages/movies/more-movie/more-movie.js
Page({

  data: {
    navigateTitle:"",
  },

  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    console.log(category);
  },

  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success:function(){

      }
    })
  }

  
})
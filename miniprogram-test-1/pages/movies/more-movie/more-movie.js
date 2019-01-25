var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
    movies:{},
    navigateTitle: "",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },
  onLoad: function(options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        //注意，这里是假数据，数据有限，我就少获取下，每次7条（默认20条）
        var dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters?count=7";
        break;
      case "即将上演":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?count=7";
        break;
      case "豆瓣Top250":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/top250?count=7";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
  },

  onScrollLower:function(event){
    var nextUrl = this.data.requestUrl + "&start="+this.data.totalCount;
    util.http(nextUrl,this.processDoubanData)
  },

  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.converToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovie;
    this.data.totalCount += 7;
    if(!this.data.isEmpty){
      totalMovie = this.data.movies.concat(movies);
    }else{
      totalMovie = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovie
    })
  },

  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }


})
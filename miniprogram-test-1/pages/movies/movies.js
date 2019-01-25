var util = require('../../utils/util.js'); 
var app=getApp();

Page({

  data: {
    inTheaters:{},//注意，这里要写这个啊，不然绑定的时候，就会出错，这是个坑
    comingSoon:{},
    top250:{}
  },

  onLoad: function (options) {
    var inTheatersUrl  = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上演");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");

  },

  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })

  },

  getMovieListData:function(url,settedKey,categoryTitle){
    var that = this;
    wx.request({
      url: url,
      method:"GET",
      header:{
        "Content-Type":""
      },
      success:function(data){
        that.processDoubanData(data.data, settedKey, categoryTitle);
      },
      fail:function(){

      },
      complete:function(){

      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0,6)+"...";
      }
      var temp= {
        stars:util.converToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }

    var readyData={};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData)

  }

})


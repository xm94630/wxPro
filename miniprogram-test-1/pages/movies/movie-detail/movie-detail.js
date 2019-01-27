import {Movie} from "../movie-detail/class/Movie.js";
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    movie:{}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase+"/v2/movie/subject/"+movieId;

    var movie = new Movie(url);
    //注意这里用箭头函数绑定正确的上下文
    movie.getMovieData( (movie)=>{
      this.setData({
        movie: movie
      })
    })
  },

  //注意，这个功能在本地不能看！需要真机环境
  viewMoviePostImg:function(e){
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
}) 
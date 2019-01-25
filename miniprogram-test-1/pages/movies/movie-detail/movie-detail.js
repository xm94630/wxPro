var app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    movie:{}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase+"/v2/movie/subject/"+movieId;
    util.http(url,this.processDoubanData);
  },
  processDoubanData:function(data){
    if(!data){
      return;
    }
    var director={
      avatar:"",
      name:"",
      id:""
    }
    if(data.directors[0]!=null){
      if (data.directors[0].avatars!=null){
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie={
      movieImg:data.images?data.images.large:"",
      country:data.title,
      title:data.title,
      originaltitle:data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comment_count,
      year:data.year,
      genres:data.genres.join('、'),
      stars:util.convertToStarsArray(data.rating.stars),
      score:data.rating.average,
      director:director,
      casts: util.convertToCastString(data.casts),
      castInfo: util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    console.log(movie)
    this.setData({
      movie:movie
    })
  }
})
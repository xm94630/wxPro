var myData = require("../../../data/data.js")
var app = getApp();
Page({
  data:{
    isPlayingMusic:false
  },
  onLoad: function(opts) {
    
    var globalData = app.globalData;
    var id = opts.id;
    
    this.setData({
      id: id,
      postData: myData.postList[id],
    })


    //老版本，这个是可以用的（同步代码）。现在不行了
    //this.data.postData = myData.postList[id];

    var postCollected = wx.getStorageSync("postCollected");
    if (postCollected) {
      var collect = postCollected[id];
      this.setData({
        collected: collect
      })
    } else {
      postCollected = {}
      //postCollected[id] = false;
      wx.setStorageSync("postCollected", postCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === id){
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor()
  },

  setMusicMonitor(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.id;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  onCollectionTap: function (event) {

    var id = this.data.id;
    var postCollected = wx.getStorageSync("postCollected");
    var collect = postCollected[id];
    //切换
    collect = !collect;
    postCollected[id] = collect
    //更新缓存
    wx.setStorageSync("postCollected", postCollected)
    //更新数据
    this.setData({
      collected: collect
    })

    wx.showToast({
      title: collect?"收藏成功":"取消成功"
    })

  },
  onShowTap:function(){
    wx.showActionSheet({
      itemList: ["分享到微博","分享到微信"],
      success:function(res){
        var index = res.tapIndex;
        wx.showToast({
          title: '还不支持哦'
        })
      }
    })
  },

  onMusicTap:function(event){
    var postData = this.data.postData
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.stopBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }

  }

})
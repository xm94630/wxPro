var postData = require("../../data/data.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts_key: postData.postList
    })

  },

  onPostTap:function(event){
    var id = event.currentTarget.dataset.postid;
    console.log(id)
    wx.navigateTo({
      url: '/pages/posts/posts-detail/posts-detail',
    })
  }

})
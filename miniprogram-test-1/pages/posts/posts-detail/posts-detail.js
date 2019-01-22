var myData = require("../../../data/data.js")
Page({
  onLoad:function(opts){
    var id = opts.id;

    //老版本，这个是可以用的（同步代码）。现在不行了
    //this.data.postData = myData.postList[id];
    
    this.setData({
      postData: myData.postList[id]
    })
  }
})
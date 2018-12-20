// pages/water/water.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '北京', value:"北京密云古北口",check:true },
      { name: '河北', value:"河北石家庄港南水库"},
      { name: '天津', value:"天津果河桥"},

    ],
    newsItem: [ ],
    place:"北京",
    ph1:"",
    hid1:true,
    hid2: true,
    hid3: true
   },
  convey1: function (e) {
    var that = this;
    that.setData({
      place: e.detail.value,
    })
  },
  yes: function () {
    var that = this;//保存一下，this对象
    wx.request({
      url: 'http://web.juhe.cn:8080/environment/water/river?river=海河流域&key=2ac711a16c826be7cedd7985b969ef0f',

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.result[0]);
        //在这个地方 使用前面保存下来的this对象self
        that.setData({ newsItem: res.data.result[0] });
      }
    })
    if (that.data.place == "北京")
      that.setData({
        hid1:false
      })
    else if (that.data.place == "天津")
      that.setData({
        hid2: false
      })
    else if (that.data.place == "河北")
      that.setData({
        hid3: false
      })
   
  },
  next:function(){
    wx.navigateTo({
      url: '/pages/new2/new2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
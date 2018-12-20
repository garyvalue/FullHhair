// pages/ziliao/ziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'man', value: '生理男', checked: 'true'  },
      { name: 'woman', value: '生理女' },
      ],
     sex:"man",
    
  },
  radioChange: function (e) {
   
      if(e.detail.value=="woman")
      this.setData({
       sex:"woman"
      })
      if(e.detail.value=="man")
      this.setData({
        sex:"man",
      })

    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
 
next:function(){
if(this.data.sex=="woman")
wx.navigateTo({
  url: '/pages/nv/nv',
});
if(this.data.sex=="man")
wx.navigateTo({
  url: '/pages/nan/nan',
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
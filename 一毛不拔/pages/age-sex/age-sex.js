// pages/ziliao/ziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'man', value: '生理男' },
      { name: 'woman', value: '生理女'},
      ],
     sex:"",
     age:'',
     age_score:"60"
    
  },
  radioChange: function (e) {
   
      if(e.detail.value=='woman')
      this.setData({
       sex:'woman'
      })
      else if(e.detail.value=='man')
      this.setData({
        sex:'man'
      })
      console.log(this.data.sex)
      var that=this;
      var sex=that.data.sex;
      wx.setStorageSync("sex", that.data.sex)

    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
 
next:function(){
wx.navigateTo({
  url: '/pages/nv/nv',
});

},
//年龄的评分标准（瞎写的，还未科学求证）
age:function(e){
  var that=this;
  that.setData({
    age: e.detail.value,
  })
  if (that.data.age <= 30)
  that.setData({
    age_score:70+(30-that.data.age)*0.7,
  })
  else if (that.data.age <= 50 && that.data.age>30)
    that.setData({
      age_score: 50 + (50 - that.data.age) * 0.7,
    })
  else if (that.data.age <= 70 && that.data.age > 50)
    that.setData({
      age_score: 30 + (70 - that.data.age) * 0.7,
    })
    else
    that.setData({
      age_score:30,
    })
  var age_score = that.data.age_score;
  wx.setStorageSync("age_score", that.data.age_score)
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
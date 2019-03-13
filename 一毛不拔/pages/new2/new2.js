// start.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1: "水根据自身硬度分为软水和硬水。有研究表明水的硬度",
    text2:"在100mg / L到150mg / L",
    text3:"之间时对身体最好,过低导致身体缺少钙镁离子，摄入硬度过高的水会影响脾胃消化，也会经过血液循环系统来到肾脏，加重肾脏负担同样也会造成脱发。",

    opacity: 0.4,
    disabled: true,
    threshold: 0,
    items: [
      { name: 'up', value: '高于门限报警', checked: 'ture' },
      { name: 'down', value: '低于门限报警' },
    ]
  },
   getDataFromOneNet: function () {
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'http://api.heclouds.com/devices/504597015/datapoints?datastream_id=TDS&limit=15',
      header: {
        'api-key': "goi7mdUHOUKZHYb8DyW823WSfHE="
      },
      success: function (res) {
        console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.TDS = res.data.data

        console.log(app.globalData.TDS)
        //跳转到天气页面，根据拿到的数据绘图
        wx.navigateTo({
          url: '/pages/new3/new3',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  change: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
      })
    } else {
      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
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

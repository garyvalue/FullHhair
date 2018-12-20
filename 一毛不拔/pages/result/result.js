// pages/result/result.js
var myCharts = require("../../dasange/gege.js")//引入一个绘图的插件
var RadarChart_result = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
  bald:"",
  gene1:"",
  shuizhi:"",
  fazhi:"",
  gene:"",
  score:''
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
self.setData({
  gene1: wx.getStorageSync('result'),
  shuizhi: Math.ceil(wx.getStorageSync('shuizhi')),
  fazhi: Math.ceil(wx.getStorageSync('fazhi')),
  gene: Math.ceil(wx.getStorageSync('gene')),
  score: Math.ceil(wx.getStorageSync('gene') * 0.4 + Math.ceil(wx.getStorageSync('shuizhi')) * 0.3 + Math.ceil(wx.getStorageSync('fazhi'))*0.3),
})
console.log(self.data.gene)
  RadarChart_result = new myCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ["基因", "水质","发质"],
      series: [{
        name: '综合情况',
        data: [this.data.gene, this.data.shuizhi, this.data.fazhi]
      }],
      width: 400,
      height: 300,
      extra: {
        radar: {
          max: 100
        }
      }
    })

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
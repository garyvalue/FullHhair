var myCharts = require("../../san/gege.js")//引入一个绘图的插件
var lineChart_TDS = null

var app = getApp()

Page({
  data: {
    a:0,
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up'
  },

  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },

  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var humidity = [];
    var light = [];
    var tempe = [];

    var length = app.globalData.TDS.count
    console.log(length)
    for (var i = 0; i<length; i++) {

      categories.push(app.globalData.TDS.datastreams[0].datapoints[i].at.slice(11, 19));
      humidity.push(app.globalData.TDS.datastreams[0].datapoints[i].value);

    }
    return {
      categories: categories.reverse(),

      TDS: humidity.reverse(),
    }
  },

  onLoad: function () {
    var wheatherData = this.convert();

    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    //新建湿度图表
    lineChart_TDS = new myCharts({
      canvasId: 'TDS',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'TDS',
        data: wheatherData.TDS,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'TDS(%)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 55
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });


  },

radioChange: function (e) {
  //保存报警规则到当前页面的数据
  if (e.detail.value != "") {
    this.setData({
      rule: e.detail.value
    })
  }
  console.log(this.data.rule)
},

send: function () {
  var that = this
  //取得门限数据和报警规则
  var thres = this.data.threshold
  var Rule = this.data.rule

  //调用百度天气API



  //温度高于设置的门限值
    if (this.data.threshold >300) {
      var that = this;
      that.setData({
        a: 100 - that.data.threshold / 3.4
              })
      //规则为高于门限报警，于是报警
      wx.showModal({
        title: '警告！！此水不适合引用。',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
           wx.navigateTo({
             url: '/pages/start/start',
           })


          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.navigateTo({
              url: '/pages/start/start',
            })
          }

        }
      })
    }
    //规则为低于门限报警，于是不报警
    else if (this.data.threshold > 250) {
      var that = this;
      that.setData({
        a: 100 - that.data.threshold / 3.4
      })
      wx.showModal({
        title: '警告！水质极差',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/start/start',
            })
            var shuizhi=that.data.a;
            console.log(shuizhi)
            wx.setStorageSync('shuizhi',that.data.a);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    //温度低于设置的门限值
    else if (that.data.threshold > 230) {
      //规则为高于门限报警，于是不报警
      var that = this;
      that.setData({
        a: 100 - that.data.threshold / 3.4
      })

      wx.showModal({
        title: '警告！水质差',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/start/start',
            })
            var shuizhi = that.data.a;
            console.log(shuizhi)
            wx.setStorageSync('shuizhi', that.data.a);

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (this.data.threshold > 140) {
      var that = this;
      that.setData({
        a: 100-that.data.threshold /5.75
      })
      wx.showModal({
        title: '提示：水质合格',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/start/start',
            })
            var shuizhi = that.data.a;
            console.log(shuizhi)
            wx.setStorageSync('shuizhi', that.data.a);


          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    //规则为低于门限报警，于是报警
    else if (this.data.threshold > 30) {
      var that = this;
      that.setData({
        a: 100 - that.data.threshold /3.4
      })
      wx.showModal({
        title: '还行还行，水质良',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')

            wx.navigateTo({
              url: '/pages/start/start',
            })
            var shuizhi = that.data.a;
            console.log(shuizhi)
            wx.setStorageSync('shuizhi', that.data.a);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (this.data.threshold >= 0) {
      var that = this;
      that.setData({
        a: 50+that.data.threshold / 3.4
      })
      wx.showModal({
        title: '注意：矿物质含量较少',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/start/start',
            })
            var shuizhi = that.data.a;
            console.log(shuizhi)
            wx.setStorageSync('shuizhi', that.data.a);

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
   


  },

  fail: function (res) {
    console.log("fail!!!")
  },

  complete: function (res) {
    console.log("end")
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

})
var myCharts = require("../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_FSR = null

var app = getApp()

Page({
  data: {
    a: "",
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
    hid: true,
    items: [
      { name: 'up', value: '高于门限报警', checked: 'ture' },
      { name: 'down', value: '低于门限报警' },
    ]
  },

  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },

  next:function(){
    wx.navigateTo({
      url: '/pages/new/new'
    })
  },

  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var humidity = [];
    var light = [];
    var tempe = [];

    var length = app.globalData.FSR.count
    console.log(length)
    for (var i = 0; i < length; i++) {

      categories.push(app.globalData.FSR.datastreams[0].datapoints[i].at.slice(11, 19));
      humidity.push(app.globalData.FSR.datastreams[0].datapoints[i].value);

    }
    return {
      categories: categories.reverse(),

      FSR: humidity.reverse()
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

    var wheatherData = this.convert();

    //新建湿度图表
    lineChart_FSR = new myCharts({
      canvasId: 'FSR',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'FSR',
        data: wheatherData.FSR,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'FSR (%)',
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
    if (this.data.threshold > 620) {

      var that = this;
      that.setData({
        a: that.data.threshold * 0.16
      })
      //规则为高于门限报警，于是报警
      wx.showModal({
        title: '你的头发太优秀了，无懈可击',
        content: "97分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })



          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    //规则为低于门限报警，于是不报警
    else if (this.data.threshold > 550) {
      var that = this;
      that.setData({
        a: that.data.threshold * 0.15
      })
      wx.showModal({
        title: '太棒了！发质优秀！',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })

            var fazhi = that.data.a;
            wx.setStorageSync('fazhi', that.data.a)

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    //温度低于设置的门限值
    else if (this.data.threshold > 530) {
      var that = this;
      that.setData({
        a: that.data.threshold * 0.16
      })

      wx.showModal({
        title: '不错，发质优良',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })

            var fazhi = that.data.a;
            wx.setStorageSync('fazhi', that.data.a)

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (that.data.threshold > 500) {
      var that = this;
      that.setData({
        a: that.data.threshold * 0.16
      })

      wx.showModal({
        title: '发质良好，要保持住哦',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })

            var fazhi = that.data.a;
            wx.setStorageSync('fazhi', that.data.a)

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (that.data.threshold > 450) {
      var that = this;
      that.setData({
        a: that.data.threshold * 0.16
      })

      wx.showModal({
        title: '发质基本合格，加油哦',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })

            var fazhi = that.data.a;
            wx.setStorageSync('fazhi', that.data.a)

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (that.data.threshold > 375) {
      var that = this;
      that.setData({
        a: that.data.threshold * 0.16
      })

      wx.showModal({
        title: '发质及格，该采取措施啦',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })

            var fazhi = that.data.a;
            wx.setStorageSync('fazhi', that.data.a)

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (that.data.threshold > 200) {
      var that = this;
      that.setData({
        a: that.data.threshold * 0.16
      })

      wx.showModal({
        title: '警报！发质极差',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })

            var fazhi = that.data.a;
            wx.setStorageSync('fazhi', that.data.a)

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (that.data.threshold > 0) {
      var that = this;
      that.setData({
        a: that.data.threshold * 0.16
      })

      wx.showModal({
        title: '没救了，byr秃吧秃吧',
        content: Math.ceil(that.data.a / 1) + "分",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/result/result',
            })
            var fazhi = that.data.a;
            wx.setStorageSync('fazhi', that.data.a)
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

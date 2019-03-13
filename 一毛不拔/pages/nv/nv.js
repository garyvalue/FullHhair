// pages/nv/nv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '秃', value: "秃" },
      { name: '不秃', value: "不秃" }

    ],
    father:"秃",
    mother:"秃",
    f_pa:"秃",
    f_ma: "秃",
    m_pa: "秃",
    m_ma: "秃",
    input: '',
    gene:'',
    result:'糟糕，你可能会秃😭',
    hid:true,
    sex:"",
  },
  next:function(){
    var that=this;
  wx.navigateTo({
    url: '/pages/introduce-water/introduction-water',
  })
    var result = that.data.result;
    wx.setStorageSync('result', that.data.result);
    var gene = that.data.gene;
    wx.setStorageSync('gene', that.data.gene);
  },
  convey5:function(e) {
    var that = this;
    that.setData({
      father: e.detail.value,
    });
  },
  convey6: function (e) {
    var that = this;
    that.setData({
     mother: e.detail.value,
    })
  }, 
  convey1: function (e) {
    var that = this;
    that.setData({
      f_pa: e.detail.value,
    })
  }, 
  convey2: function (e) {
    var that = this;
    that.setData({
      f_ma: e.detail.value,
    })
  },
  convey3: function (e) {
    var that = this;
    that.setData({
      m_pa: e.detail.value,
    })
  },
  convey4: function (e) {
    var that = this;
    that.setData({
      m_ma: e.detail.value,
    })
  },

  result:function(){
    var that = this;
    that.setData({
      sex:wx.getStorageSync("sex")
    })
    console.log(that.data.sex)
    if(that.data.sex=="woman"){

    if(that.data.father=="不秃"){
    that.setData({
      result:"恭喜你呀，从基因来看，你不会秃啊！",
      gene:100
    })
    }//爸爸不秃顶
    //爸爸秃，妈妈也秃
    else if (that.data.father == "秃"&&that.data.mother=="秃"){
     if(that.data.f_pa=="秃"&&that.data.f_ma=="不秃")
       that.setData({
         result:"诶呀，你有66.7%的可能秃头，要小心哦",
         gene:33.3
       })
     
     else if (that.data.f_pa == "秃" && that.data.f_ma == "秃"){
          that.setData({
           result: "诶呀，你有87.5%的可能秃头，要小心哦",
           gene:12.5
         }) 
   }
     else if (that.data.f_pa == "不秃") {
       that.setData({
         result: "诶呀，你有50%的可能秃头，要小心哦",
         gene:50
       })
     }
    }


   //爸爸秃，妈妈不秃
     else if (that.data.father == "秃" && that.data.mother == "不秃"){
      //爷爷秃，奶奶不秃
      if(that.data.f_pa=="秃"&&that.data.f_ma=="不秃"){
        //外公秃，外婆不秃
        if(that.data.m_pa == "秃" && that.data.m_ma == "不秃"){
          that.setData({
            result:"诶呀，你有28.5 % 的秃头可能，还行还行",
            gene:71.5
          })
        }
        //外公秃，外婆秃
        else if (that.data.m_pa == "秃" && that.data.m_ma == "秃") {
          that.setData({
            result: "诶呀，你有33.3% 的秃头可能，还行还行",
            gene:66.7
          })
        }
        //外公不秃，外婆不秃
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "不秃") {
          that.setData({
            result: "诶呀，你有8.3% 的秃头可能，还行还行",
            gene:91.7
          })
        }
        //外公不秃。外婆秃
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "秃") {
          that.setData({
            result: "诶呀，你有33.3% 的秃头可能，还行还行",
            gene:66.7
          })
        }
      }
  
    //爷爷秃，奶奶秃
      if (that.data.f_pa == "秃" && that.data.f_ma == "秃") {
        if (that.data.m_pa == "秃" && that.data.m_ma == "不秃") {
          that.setData({
            result: "诶呀，你有37.5% 的秃头可能，还行还行",
            gene:62.5
          })
        }
        else if (that.data.m_pa == "秃" && that.data.m_ma == "秃") {
          that.setData({
            result: "诶呀，你有43.7% 的秃头可能，还行还行",
            gene:56.3
          })
        }
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "不秃") {
          that.setData({
            result: "诶呀，你有10.9% 的秃头可能，还行还行",
            gene:89.1
          })
        }
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "秃") {
          that.setData({
            result: "诶呀，你有43.7% 的秃头可能，要注意哟",
            gene:56.3
          })
        }
      }
      //爷爷不秃
 else if(that.data.f_pa=="不秃"){
        if (that.data.m_pa == "秃" && that.data.m_ma == "不秃") {
          that.setData({
            result: "诶呀，你有21.4% 的秃头可能，还行还行",
            gene:78.6
          })
        }
        else if (that.data.m_pa == "秃" && that.data.m_ma == "秃") {
          that.setData({
            result: "诶呀，你有25% 的秃头可能，还行还行",
            gene:75
          })
        }
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "不秃") {
          that.setData({
            result: "诶呀，你有6.25% 的秃头可能，还行还行",
            gene:93.75
          })
        }
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "秃") {
          that.setData({
            result: "诶呀，你有25% 的秃头可能，要注意",
            gene:75
          })
        }

      }

    }
    }
    else if(that.data.sex=="man"){
      //妈妈秃，爸爸不秃 
      if (that.data.mother == "秃")
        that.setData({
          result: "糟糕，从基因上看，你秃头的概率是100%，要好好爱护头发啊",
          gene: 0,
        })
      //妈妈不秃，爸爸不秃
      else if (that.data.mother == "不秃" && that.data.father == "不秃") {
        if (that.data.m_pa == "秃" && that.data.m_ma == "不秃")
          that.setData({
            result: "从基因看，你秃头的概率是42.9%，要注意啊",
            gene: 57.1,
          })
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "秃")
          that.setData({
            result: "从基因看，你秃头的概率是50%，要注意啊",
            gene: 50,
          })
        else if (that.data.m_pa == "秃" && that.data.m_ma == "秃")
          that.setData({
            result: "从基因看，你秃头的概率是87.5%，要注意啊",
            gene: 12.5,
          })
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "不秃")
          that.setData({
            result: "从基因看，你秃头的概率是12.5%，要注意啊",
            gene: 87.5
          })
      }
      //爸爸秃，妈不秃
      else if (that.data.mother == "不秃" && that.data.father == "秃") {
        if (that.data.m_pa == "秃" && that.data.m_ma == "不秃") {
          if (that.data.f_pa == "秃" && that.data.f_ma == "不秃")
            that.setData({
              result: "从基因看，你秃头的概率是88.6%，要注意啊",
              gene: 11.4
            })
          else if (that.data.f_pa == "不秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是71.4%，要注意啊",
            gene: 28.6
          })
          else if (that.data.f_pa == "秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是92.8%，珍惜相聚的时光",
            gene: 7.3
          })
          else if (that.data.f_pa == "不秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是71.4%，要注意啊",
            gene: 28.6
          })
        }
        else if (that.data.m_ma == "秃") {
          if (that.data.f_pa == "秃" && that.data.f_ma == "不秃")
            that.setData({
              result: "从基因看，你秃头的概率是90%，要注意啊",
              gene: 10,
            })
          else if (that.data.f_pa == "不秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是75%，要注意啊",
            gene: 25,
          })
          else if (that.data.f_pa == "秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是93.8%，要注意啊",
            gene: 6.2,
          })
          else if (that.data.f_pa == "不秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是75%，要注意啊",
            gene: 25
          })
        }
        //
        else if (that.data.m_pa == "不秃" && that.data.m_ma == "不秃") {
          if (that.data.f_pa == "秃" && that.data.f_ma == "不秃")
            that.setData({
              result: "从基因看，你秃头的概率是82.5%，要注意啊",
              gene: 17.5
            })
          else if (that.data.f_pa == "不秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是56.3%，要注意啊",
            gene: 43.7
          })
          else if (that.data.f_pa == "秃" && that.data.f_ma == "秃") that.setData({
            result: "从基因看，你秃头的概率是89.1%，要注意啊",
            gene: 10.9
          })
          else if (that.data.f_pa == "不秃" && that.data.f_ma == "不秃") that.setData({
            result: "从基因看，你秃头的概率是56.3%，要注意啊",
            gene: 43.7
          })
        }
      }
      
    }

    wx.showModal({
      title: '提示',
      content: that.data.result,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/introduce-water/introduction-water',
          })
          var result = that.data.result;
          wx.setStorageSync('result', that.data.result);
          var gene = that.data.gene;
          wx.setStorageSync('gene', that.data.gene);
          console.log('用户点击确定')
          console.log(that.data.sex)
        } 
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
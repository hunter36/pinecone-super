<template>
  <div id="app">
    <div class="box">
        <div class="card views">
          <div class="titleBar" v-show="cards">卡片</div>
          <div class="cBody" v-for="(item, index) in cards" v-show="index < cardLimitNumber">
            <div class="cImg" :style="{backgroundImage: 'url(http://211.138.112.132:2704/serverimages/' + item.facestyle + ')'}">
              <div class="cTop">
                <dl>
                  <dt><div class="cLogo" :style="{backgroundImage: 'url(http://211.138.112.132:2704/serverimages/' + item.clog + ')'}"></div></dt>
                  <dd>
                    <h3>{{item.typename}}</h3>
                    <p>{{item.card_merchant.companyname}}</p>
                  </dd>
                </dl>
                <div class="credit">
                  <p>您的预估额度为</p>
                  <h2><b>￥</b>{{item.predict}}<span>.00</span></h2>
                </div>
              </div>
              <div class="line"></div>
              <div class="cBottom">
                <div class="cTips">
                  <p><i><img src="../../assets/img/付.png"></i>支付方式<span>{{item.maintype == 0 ? "通用支付" : item.maintype == 1 ? "信用支付" : "分期支付"}}</span></p>
                  <p><i><img src="../../assets/img/条件.png"></i>申请条件<span>{{item.condition}}</span></p>
                  <p><i><img src="../../assets/img/地址.png"></i>适用范围<span>{{item.range}}</span></p>
                  <p><i><img src="../../assets/img/期限.png"></i>有效期限<span>{{item.card_type_contract.cpLoseType == 0 ? item.card_type_contract.cp11Losemaxuse + "次": item.card_type_contract.cp10Loseexplen + "天"}}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="button" @click="switchLoadCard">{{cardTab}}</div>
        </div>
        <div class="store views">
          <div class="titleBar" v-show="store">门店</div>
          <div class="sBody">
            <ul>
              <li v-for="(item, index) in store" v-show="index < storeLimitNumber">
                <div class="sImg" :style="{backgroundImage: 'url(http://211.138.112.132:2704/serverimages/' + item.shopphotos + ')'}"></div>
                <h1>{{item.shopname}}</h1>
                <p>{{item.address}}<span>&lt;230m</span></p>
              </li>
              <li class="block"></li>
            </ul>
          </div>
          <div class="button" @click="switchLoadStore">{{storeTab}}</div>
        </div>
        <div class="eshop views">
          <div class="titleBar">电商</div>
          <div class="eBody" v-for="(item, index) in eshop" v-show="index < eshopLimitNumber">
            <div class="eBanner" :style="{backgroundImage: 'url(http://211.138.112.132:2704/serverimages/' + item.elog + ')'}"></div>
            <div class="eMessage">
              <div>
                <h3>{{item.shopname}}</h3>
                <p>{{item.shopcomm}}</p>
              </div>
              <div class="toDetails">查看详情</div>
            </div>
          </div>
          <div class="button" @click="switchLoadEShop">{{eshopTab}}</div>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Md5 from 'md5';
  export default {
    data () {
      let cardFlag = false
      let cardTab = "查看更多"
      let cardLength
      let cardLimitNumber = 2
      let storeFlag = false
      let storeTab = "查看更多"
      let storeLength
      let storeLimitNumber = 2
      let eshopFlag = false
      let eshopTab = "查看更多"
      let eshopLength
      let eshopLimitNumber = 2
      let cards = []
      let store = []
      let eshop = []
      let orders_status
      return {
        cardFlag, 
        cardTab,
        cardLength,
        cardLimitNumber,
        storeFlag,
        storeTab,
        storeLength,
        storeLimitNumber,
        eshopFlag,
        eshopTab,
        eshopLength,
        eshopLimitNumber,
        cards,
        store,
        eshop,
        orders_status
      }
    },
    mounted(){
      this.getData("二月九日");
    },
    methods: {
        switchLoadCard: function(){
            this.cardLimitNumber == 2 ? this.cardLimitNumber = this.cardLength : this.cardLimitNumber = 2;
            this.cardFlag = !this.cardFlag;
            this.cardFlag ? this.cardTab = "收起列表" : this.cardTab = "查看更多";
        },
        switchLoadStore: function(){
            this.storeLimitNumber == 2 ? this.storeLimitNumber = this.storeLength : this.storeLimitNumber = 2;
            console.log(this.storeLimitNumber);
            this.storeFlag = !this.storeFlag;
            this.storeFlag ? this.storeTab = "收起列表" : this.storeTab = "查看更多";
        },
        switchLoadEShop: function(){
            this.eshopLimitNumber == 2 ? this.eshopLimitNumber = this.eshopLength : this.eshopLimitNumber = 2;
            this.eshopFlag = !this.eshopFlag;
            this.eshopFlag ? this.eshopTab = "收起列表" : this.eshopTab = "查看更多";
        },
        sendAjax : function(req){
            axios({
                method: 'post',
                url: '/ldo',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                params: {
                    'requestjson': req
                }
            })
                .then((res) => {
                    console.log(res);
                    // console.log(res.data.pageList[0].market_typeList);
                    // console.log(res.data.pageList[0].merchant_shops[0]);
                    // console.log(res.data.pageList[0].merchant_e_shops);
                    this.cards = res.data.pageList[0].market_typeList;
                    this.cardLength = this.cards.length;
                    this.store = res.data.pageList[0].merchant_shops;
                    this.storeLength = this.store.length;
                    this.eshop = res.data.pageList[0].merchant_e_shops;
                    this.eshopLength = this.eshop.length;
                })
                .catch((err) => {
                    console.log(err);
                }
            );
        },
        getData : function(keyword){
            let str = "Api_APP_CardTypeMerchantShop_Search_A5_Request" + "64x64" + keyword;
            let signValue = Md5(str);
            let baseObj = {
                "apiId" : "Api_APP_CardTypeMerchantShop_Search_A5_Request",
                "clog" : "64x64",
                "keyWord" : keyword
            };
            let req = JSON.stringify(baseObj);
            this.sendAjax(req);
        }
    }
  }
</script>

<style lang="postcss">
*{
    margin: 0;
    padding: 0;
  }
  h1{
    font-size: 20px;
    color: rgb(5, 110, 234);
  }
  .box{
    width: 100%;
    background: #F0F2F5;
    display: flex;
    flex-direction: column;
  }
  .box .views{
    width: 100%;
    margin-top: 0.2rem;
    background: #fff;
  }
  .titleBar{
    height: .6rem;
    font-size: .26rem;
    color: #666666;
    line-height: .6rem;
    text-align: center;
    border-bottom: 1px solid #ECECEC;
    background: url(../../assets/img/标头线.png) no-repeat center center;
    background-size: 100%; 
  }
  .cBody{
    box-sizing: border-box;
    padding: 0 0.3rem 0;
  }
  .button{
    width: 100%;
    height: .7rem;
    font-size: .24rem;
    color: #F9A724;
    border-top: 1px solid #ECECEC;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cImg{
    height: 2.74rem;
    box-sizing: border-box;
    background-size: 100%;
    padding: 0 0.28rem; 
    margin: .4rem 0;
    border-bottom: 1px solid #ECECEC;
    display: flex;
    flex-direction: column;
  }
  .cImg .cTop{
    box-sizing: border-box;
    padding: .28rem 0;
    height: 1.52rem;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
  .cTop dl{
    font-size: 0;
    display: flex;
    justify-content: space-between;
  }
  .cTop dl dd{
    font-size: .28rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #fefefe;
    margin-left: .28rem;
  }
  .cTop dl dd h3{
    margin: 0;
    padding: 0;
    font-size: .34rem;
    font-weight: normal;
  }
  .cTop dl dd p{
    margin: 0;
    padding: 0;
  }
  .cTop .credit{
    text-align: right;
    font-size: .2rem;
    color: #fff;
  }
  .credit p{
    color: rgba(255,255,255,.8);
  }
  .credit h2{
    font-size: .48rem;
    font-weight: normal;
  }
  .credit h2 b{
    font-size: .3rem;
  }
  .cBottom{
    height: 1.19rem;
    padding: .21rem 0 .3rem;
    box-sizing: border-box;
  }
  .cTips{
    font-size: .22rem;
    color: rgba(255,255,255,.8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .cTips p{
    display: block;
    box-sizing: border-box;
    padding-left: .32rem;
    position: relative;
    width: 50%;
    overflow: hidden;
    margin-top: .08rem;
  }
  .cTips p i{
    display: inline-block;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -0.11rem;
    width: .22rem;
    height: .22rem;
  }
  .cTips p i img{
    width: 100%;
  }
  .cTips p span{
    margin-left: .32rem;
  }
  .line{
    width: 100%;
    height: 1px;
    background: rgba(255,255,255,0.35);
  }
  .cTop dl dt{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cLogo{
    width: .75rem;
    height: .75rem;
    background-size: 100%; 
    border-radius: 50%;
  }
  .eshop{
    margin-bottom: .6rem;
  }
  .sBody{
    width: 100%;
    box-sizing: border-box;
    padding: .19rem .1rem .21rem;
    height: auto;
  }
  .sBody ul{
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .sBody ul li{
    list-style: none;
    box-sizing: border-box;
    padding: .1rem;
    padding-bottom: .2rem; 
    width: 3.6rem;
    height: 4.2rem;
    margin-bottom: .1rem;
    border: 1px solid #ECECEC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .sBody ul .block{
    height: 0;
    border: none;
    margin: 0;
    padding: 0;
  }
  .sBody ul li .sImg{
    width: 3.4rem;
    height: 2.26rem;
    margin: 0 auto .3rem;
    background-size: 100%;
  }
  .sBody ul li h1{
    font-size: .28rem;
    color: #333;
    flex: 1;
  }
  .sBody ul li p{
    font-size: .24rem;
    color: #666;
    display: flex;
    justify-content: space-between;
  }
  .eBody{
    width: 100%;
    margin-bottom: .1rem;
  }
  .eBanner{
    width: 100%;
    height: 2.53rem;
    background-size: 100%;
  }
  .eMessage{
    height: 1.12rem;
    box-sizing: border-box;
    padding: .2rem .3rem;
    display: flex;
    justify-content: space-between;
  }
  .eMessage h3{
    font-size: .28rem;
    color: #333;
    margin-bottom: .2rem;
  }
  .eMessage p{
    font-size: .22rem;
    color: #999;
  }
  .toDetails{
    font-size: .26rem;
    color: #F9A724;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

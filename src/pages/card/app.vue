<template>
  <div id="app">
    <div class="box">
    <div id="detail-top">
        <div class="cardBox" :style="{backgroundImage: 'url(http://211.138.112.132:2704/serverimages/' + bgimg + ')'}">
            <div class="logoBox">
                <div class="img">
                    <img src="../../assets/img/logo@2x.png" alt="加载中...">   
                </div>
                <div class="logo-right">
                    <div>
                        <span class="shopping-card">{{baseMsg.typename}}</span>
                        <span class="limit">您的预估额度为</span>
                    </div>
                    <div>
                        <span class="company">{{baseMsg.aidname}}</span>
                        <span class="money"><span class="dollar">¥</span>{{baseMsg.predict  }}</span>
                    </div>
                </div>
            </div>   
            <div class="line"></div>
            <div class="join">
                <a href="">
                    进入查看使用范围
                    <img src="../../assets/img/jinru@2x.png" alt="进入">
                </a>
            </div>
        </div>
      </div>
      <div id="detail-main">
            <div>
              <span>卡产品编号</span>
              <span>{{baseMsg.number}}</span>
            </div>
             <div>
              <span>发卡方</span>
              <span>{{baseMsg.aidname}}</span>
            </div>
            <div>
                <span>支付方式</span>
                <span v-if="baseMsg.maintype==0">通用信用支付卡</span>
                <span v-if="baseMsg.maintype==1">信用支付专项卡</span>
                <span v-if="baseMsg.maintype==2">分期支付专项卡</span>
            </div>
            <div>
                <span>申请条件</span>
                <span>{{baseMsg.condition}}</span>
            </div>
            <div>
                <span>有效期</span>
                <span v-if="indate==0">{{indateVal1}}次</span>
                <span v-if="indate==1">{{indateVal2}}天</span>
            </div>
            <div>
                <span>卡片应用场景</span>
                <span>{{baseMsg.useCard}}</span>
            </div>
            <section class="wrop">
                <p>应用范围</p>
                <p>{{baseMsg.range}}</p>
            </section>
            <section class="wrop">
                <p>卡片介绍</p>
                <p>{{baseMsg.profiles}}</p>
            </section>
          
      </div>
      <div class="btn">
          立即申请
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'md5';
  export default {
    data () {
      return {
        baseMsg: {},
        indate:1,
        indateVal1:"",
        indateVal2:"",
        bgimg:""
      }
    },
    mounted(){
      let obj = {
        loginaid : "14280420180212162446",
        apiId : "Api_CARD_MARKET_TYPE_A2_Request",
        card_type_id : "13440320180202134238_2_174_1518076842433",
        clog:"690x334"
      }
      function objKeySort(obj) {
          var newkey = Object.keys(obj).sort();
          var str = "";
          for (var i = 0; i < newkey.length; i++) {
              str += obj[newkey[i]];
              
          }
          return str;
      }
      obj.sign = md5(objKeySort(obj));
      let requestjson = JSON.stringify(obj);
      let _this = this;
      axios({
        method: 'post',
        url: '/ldo',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        },
        params:{
          requestjson
        }
      })
      .then(function (res) {
        _this.baseMsg = res.data.pageList[0];
        _this.indate = res.data.pageList[0].card_type_contract.cpLoseType;
        _this.indateVal1 = res.data.pageList[0].card_type_contract.cp11Losemaxuse;
        _this.indateVal2 = res.data.pageList[0].card_type_contract.cp10Loseexplen;
        _this.bgimg = res.data.pageList[0].clog;
        console.log(_this.bgimg)
      })
      .catch(function (response) {
        console.log(response);
      });
    }
  }
</script>

<style lang="postcss">
h1 {
  color: rgb(5, 110, 234);
}
* {
  margin: 0;
  padding: 0;
}
.box{
  width: 100%;
  background: #F0F2F5;  
}
#detail-top {
  box-sizing: border-box;
  padding: .2rem .3rem .3rem .3rem;
}
.cardBox {
  padding-top: .38rem;
  box-sizing: border-box;
  position: relative;
  background: url(../../assets/img/card5@2x.png) no-repeat;
  background-size: 100%;
}
.logoBox {
  text-align: left;
  margin: 0 0.38rem;
  display: flex;
}
.img {
  width: .96rem;
  height: .96rem;
}
.logoBox img {
  width: .96rem;
  float: left;
  margin-right: .28rem;
}
.logo-right {
  height: .96rem;
  flex: 1;
  margin-left: .28rem;
  display: inline-block;
  vertical-align: middle;
}
.logo-right div {
  margin-top: .04rem;
  display: flex;
  justify-content: space-between;
}
.shopping-card {
  font-size: .34rem;
  color: #fefefe;
  font-family: PingFangSC-Medium;
}
.limit {
  color: #ffffff;
  font-size: .22rem;
  font-family: PingFangSC-Light;
}
.company {
  color: #fefefe;
  font-size: .28rem;
  font-family: PingFangSC-Light;
}
.money {
  color: #fff;
  font-size: .3rem;
  font-family: PingFang SC;
}
.dollar {
  font-size: .3rem;
}
.line {
  width: 6.36rem;
  height: 1px;
  margin: 0 auto;
  margin-top: .89rem;
  background: rgba(255, 255, 255, 1);
  opacity: 0.35;
}
.join {
  font-size: .28rem;
  padding: .42rem 0;
  text-align: center;
}
.join a {
  text-decoration: none;
  font-family: PingFangSC-Light;
  color: #fefefe;
}
.join img {
  width: .28rem;
  margin-left: .19rem;
  vertical-align: middle;
}
#detail-main {
  height: auto;
  padding: 0 .56rem;
  background: #fff;
  margin-bottom: 1.18rem;
}
#detail-main div {
  height: .84rem;
  line-height: .84rem;
  display: flex;
  border-bottom: 1px solid #f0f2f5;
  justify-content: space-between;
}
#detail-main div > span:nth-last-child(1) {
  color: #333;
}
#detail-main div span {
  font-size: .26rem;
  color: #666666;
}
.wrop{
  font-size: .26rem;
  border-bottom: 1px solid #f0f2f5;
}
.wrop p{
  line-height: .8rem;
}
.wrop p:nth-child(1){
  color: #666;
}
.wrop p:nth-child(2){
  color: #333;
}
.btn {
  position: fixed;
  bottom: 0;
  color: #ffffff;
  height: 1.18rem;
  width: 100%;
  font-size: .36rem;
  text-align: center;
  line-height: 1.18rem;
  background: #ffb745;
}
</style>

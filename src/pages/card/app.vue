<template>
  <div id="app">
    <div class="box">
    <div id="detail-top">
        <div class="cardBox" :style="{backgroundImage: 'url(' + bgimg + ')'}">
            <div class="logoBox">
                <div class="img">
                    <img :src="clog">   
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
                <a href="javascript:;">
                    进入查看使用范围
                    <img src="../../assets/img/jinru@2x.png" alt="进入">
                </a>
            </div>
        </div>
      </div>
      <div id="detail-main">
            <div>
              <span>卡产品编号</span>
              <span>{{baseMsg.cardTypeId}}</span>
            </div>
             <div>
              <span>发卡方</span>
              <span>{{baseMsg.aidname}}</span>
            </div>
            <div>
                <span>支付方式</span>
                <span v-show="baseMsg.maintype==''"></span>
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
                <span v-show="indate==0">{{indateVal1}}次</span>
                <span v-show="indate==1">{{indateVal2}}天</span>
            </div>
            <div>
                <span>卡片应用场景</span>
                <span>{{baseMsg.scene}}</span>
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
        bgimg:"",
        clog:""
      }
    },
    methods:{
      getUrlParam(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
      },
      getData(cid,loginaid){
        let obj = {
          loginaid,
          card_type_id : cid,
          details:'1',
          clog:"690x334",
          style:"0",
          apiId : "Api_CARD_MARKET_TYPE_A2_Request"
        }
        var newkey = Object.keys(obj).sort();
        var str = "";
        for (var i = 0; i < newkey.length; i++) {
            str += obj[newkey[i]];
        }
        obj.sign = md5(str);
        let requestjson = JSON.stringify(obj);
        let _this = this;
        axios({
          method: 'post',
          url: "/ldo",
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
          _this.bgimg = 'http://211.138.112.132:2704/serverimages/'+res.data.pageList[0].facestyle;
          _this.clog = 'http://211.138.112.132:2704/serverimages/'+res.data.pageList[0].clog;
          // console.log(11,_this.bgimg)
        })
        .catch(function (response) {
          console.log(response);
        });
      }
    },
    mounted(){
      let loginaid = this.getUrlParam("loginaid");
      let cid = this.getUrlParam("cid");
      this.getData(cid,loginaid)
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
  border-radius:.28rem;
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
  border-radius: 48px;
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
  font-size: .33rem;
  font-family: PingFang SC;
}
.dollar {
  font-size: .04rem;
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
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  text-align:right;
}
#detail-main div span {
  display:inline-block;
  width:50%;
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
</style>

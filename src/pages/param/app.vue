<template>
  <div id="app">
    <div class="box">
    <div id="detail-main">
        <div class="param">
            <span>息费参数</span>
        </div>
        <div>
            <span>会员费金额</span>
            <span>{{param.cp13Memberfee}}元</span>
        </div>
        <div>
            <span>账单日</span>
            <span>每月{{param.c1Billcalstart}}日</span>
        </div>
        <div>
            <span>账单统计期</span>
            <span>{{param.c3Billcalleng}}个月</span>
        </div>
        <div>
            <span>到期还款日</span>
            <span>账单日后{{param.c4Billleng}}天</span>
        </div>
        <div>
            <span>最低单笔消费金额</span>
            <span>{{param.cp12Minpay}}元</span>
        </div>
        <div>
            <span>最低账单分期金额</span>
            <span>{{param.cp12Minpay}}元</span>
        </div>
        <div id="lv">
            <span>可分期期数及费率</span>
        </div>
        <div class="fq">
            <span>{{type_periodList}}</span>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import md5 from 'md5';
  import url from "../../assets/js/public.js";
  export default {
    data() {
      return {
        param: "",
        type_periodList:[]
      };
    },
    methods:{
      toPoint(percent){
          let str=Number(percent*100);
          str+="%";
          return str;
      }
    },
    mounted(){
      function getData(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = "uid=14840220180408165327&cid=13440320180202134238_2_174_1518076842433".substr(1).match(reg); 
        // var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
      } 
      let obj = {
        loginaid : getData("uid"),
        apiId : "Api_CARD_MARKET_TYPE_A2_Request",
        card_type_id : getData("cid"),
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
          url: url.url,
          headers:{
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
          },
          params:{
          requestjson
          }
      })
      .then(function (res) {
          _this.param = res.data.pageList[0].card_type_contract;
          let str = '';
          res.data.pageList[0].type_periodList.forEach(element => {
            str += Number(element.rate*100) + '%/期(分'+ element.periodcount+'期)、'
          });
          _this.type_periodList = str.substring(0,str.length-1);

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
.box {
  width: 100%;
  background: #f0f2f5;
}

#detail-main {
  height: auto;
  padding: 0 0.56rem;
  background: #fff;
  margin-top: .2rem;
}
#detail-main div {
  height: 0.84rem;
  line-height: 0.84rem;
  display: flex;
  border-bottom: 1px solid #f0f2f5;
  justify-content: space-between;
}
#detail-main .param{
  border-bottom: none;
}
#detail-main>.param span{
  margin-top: .1rem;
  font-size: .3rem;
}
#detail-main div > span:nth-last-child(1) {
  color: #333;
}
#detail-main div span {
  font-size: 0.26rem;
  color: #666666;
}
#detail-main>#lv{
  border-bottom: none;
}
#detail-main>#lv>span{
  color: #666666;
}
#detail-main>.fq{
  height: auto;
  line-height: .48rem;
  padding-bottom: .2rem;
}
</style>

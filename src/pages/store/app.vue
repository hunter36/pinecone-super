<template>
    <div>
        <swipe :auto="4000" class="swipeBox">
            <span class="return" @click="goback"></span>
            <swipe-item v-for="(index,img) in imgList" :key="img.id"><img :src="img.src"></swipe-item>
        </swipe>
        <div class="contact">
            <div class="contact-left">
                <div>{{data.shopname}}</div>
                <div><span><img class="address" src="../../assets/img/dingwei@2x.png" alt="address"></span>{{data.address}}</div>
            </div>
            <div class="contact-right"><span class="tel"><img src="../../assets/img/tel.png" alt="tel"></span>&nbsp;联系商家</div>
        </div>
        <div class="titleBar">门店可用虚拟卡</div>
        <div v-if="open">
            <div class="possess">
                <div class="possess-title">
                    <div class="float-left"><span><img src="../../assets/img/success@2x.png" alt="已拥有"></span>已拥有的卡片</div>
                    <div class="float-right">查看更多<span><img src="../../assets/img/gengduo@2x.png" alt="查看更多"></span></div>
                </div>
                <div class="card" v-for="(item,index) in card1" :key="index" v-show="index < notCardLength">
                    <dl>
                        <dt><div class="cLogo" :style="{background:'url(http://211.138.112.132:2704/serverimages/' +item.card_market_type.clog+')'}"></div></dt>
                        <dd>
                            <h3 v-if="item.card_market_type.maintype==0">通用信用支付卡</h3>
                            <h3 v-if="item.card_market_type.maintype==1">信用支付专项卡</h3>
                            <h3 v-if="item.card_market_type.maintype==2">分期支付专项卡</h3>
                            <p>{{item.card_market_type.aidname}}</p>
                        </dd>
                    </dl>
                    <div class="credit"></div>
                </div>
            </div>
            <div class="possess">
                <div class="possess-title">
                    <div class="float-left"><span><img src="../../assets/img/kapian@2x.png" alt="未拥有"></span>未拥有的卡片</div>
                    <div class="float-right">查看更多<span><img src="../../assets/img/gengduo@2x.png" alt="查看更多"></span></div>
                </div>
                <div class="card" v-for="(item,index) in card2" :key="index" v-show="index < notCardLength">
                    <dl>
                        <dt><div class="cLogo" :style="{background:'url(http://211.138.112.132:2704/serverimages/' +item.card_market_type.clog+')'}"></div></dt>
                        <dd>
                            <h3 v-if="item.card_market_type.maintype==0">通用信用支付卡</h3>
                            <h3 v-if="item.card_market_type.maintype==1">信用支付专项卡</h3>
                            <h3 v-if="item.card_market_type.maintype==2">分期支付专项卡</h3>
                            <p>{{item.card_market_type.aidname}}</p>
                        </dd>
                    </dl>
                    <div class="credit"></div>
                </div>
            </div>
        </div>
        <div v-if="!open">
            <div class="possess nouser">
                <div class="card" v-for="(item,index) in card2" :key="index" v-show="index < cardLimitNumber">
                    <dl>
                        <dt><div class="cLogo" :style="{background:'url(http://211.138.112.132:2704/serverimages/' +item.card_market_type.clog+')'}"></div></dt>
                        <dd>
                            <h3 v-if="item.card_market_type.maintype==0">通用信用支付卡</h3>
                            <h3 v-if="item.card_market_type.maintype==1">信用支付专项卡</h3>
                            <h3 v-if="item.card_market_type.maintype==2">分期支付专项卡</h3>
                            <p>{{item.card_market_type.aidname}}</p>
                        </dd>
                    </dl>
                    <div class="credit"></div>
                </div>
                <div class="button" @click="switchLoadECard">{{cardTab}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'mint-ui/lib/style.css'
    import { Swipe, SwipeItem } from 'mint-ui';
    import axios from 'axios';
    import md5 from 'md5';
    import url from "../../assets/js/public.js";  
    export default {
        name:'store',
        components:{
            Swipe,
            SwipeItem
        },
        data(){
            return {
                open : true,
                cardFlag : false,
                notCardLength:'',
                cardTab : "查看更多",
                cardLength : '',
                cardLimitNumber : 2,
                imgList:[
                    // {id:1,src:require("../../assets/img/门店1图@2x.png")}
                    ],
                data:'',
                card1:[],
                card2:[]
            }
        },
        methods: {
            goback(){
                window.history.go(-1)
            },
            urlParam(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                var r = "?uid=14260720180209165930&aid=14260720180209165930&shopaid=14230920180209140323&tocken=20180202123045205-504da6af1e7a4f30885dbd8af627d5ac".substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                return null; 
            },
            getData(loginaid,aid,tocken){
                let obj = {
                    aid,   //门店编号
                    loginaid,
                    tocken,
                    apiId : "Api_MERCHANT_SHOP_A2_Request"
                }
                let newkey = Object.keys(obj).sort();
                let str = "";
                for (var i = 0; i < newkey.length; i++) {
                    str += obj[newkey[i]];
                }
                obj.sign = md5(str);
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
                    _this.data = res.data.pageList[0];
                    let obj = {};
                    obj.src = 'http://211.138.112.132:2704/serverimages/'+res.data.pageList[0].shopphotos;
                    _this.imgList.push(obj);
                    console.log(_this.imgList)
                })
                .catch(function (response) {
                    console.log(response);
                });
            },
            getCardMsg(shopaid,loginaid,isBind,tocken){
                let obj = {
                    loginaid,
                    shopaid,
                    isBind,
                    tocken,
                    apiId : "Api_CM_BIND_CARDTYPES_A5_qryShopBindCardsAndNotBindCards_Request",
                    // apiId : 'Api_MERCHANT_SHOP_A5_qrCards_Matched_AllNotBindShop_Request'
                }
                let newkey = Object.keys(obj).sort();
                let str = "";
                for (var i = 0; i < newkey.length; i++) {
                    str += obj[newkey[i]];
                }
                obj.sign = md5(str);
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
                    if(isBind==0){
                        _this.card1 = res.data.pageList;
                        console.log(_this.card1)
                        console.log(res.data)
                    }else{
                        _this.card2 = res.data.pageList;   
                        _this.notCardLength = _this.card2.length;
                        console.log(_this.card2)
                                             
                    }
                })
                .catch(function (response) {
                    console.log(response);
                });
            },
            switchLoadECard(){
                this.cardLimitNumber == 2 ? this.cardLimitNumber = this.notCardLength : this.cardLimitNumber = 2;
                this.cardFlag = !this.cardFlag;
                this.cardFlag ? this.cardTab = "收起列表" : this.cardTab = "查看更多";
            },

        },
        mounted(){
            let aid = this.urlParam('aid');
            let loginaid = this.urlParam('uid');
            let shopaid = this.urlParam('shopaid');
            let tocken = this.urlParam('tocken');
            this.getData(loginaid,aid,tocken);
            if(loginaid){
                this.getCardMsg(loginaid,shopaid,'0');
                this.getCardMsg(loginaid,shopaid,'1');
            }else{
                this.open = false;
                this.getCardMsg(shopaid);                
            }
        }
    }
</script>

<style lang="postcss">
*{
        margin: 0;
        padding:0;
    }
    .swipeBox{
        width: 100%;
        height: 3.99rem;
    }
    .return{
        display: inline-block;
        width: .21rem;
        height: .36rem;
        z-index: 10;
        position: absolute;
        top: .64rem;
        left: .3rem;
        background: url(../../assets/img/fanhui@2x.png) no-repeat;
        background-size: 100%;
    }
    .swipeBox img{
        width: 100%;
    }
    .contact{
        background: #fff;
        height: 1.4rem;
    }
    .contact-left{
        float: left;
        width: 68%;
        box-sizing: border-box;
        margin: .3rem;
        border-right: 1px solid rgb(241, 241, 241);
    }
    .contact-left>div:nth-of-type(1){
        font-size: .3rem;
        color: #333;
    }
    .contact-left>div:nth-of-type(2){
        color: #999;
        font-size: .24rem;
    }
    .address{
        width: .17rem;
        height: .22rem;
        margin-right: .13rem;
    }
    .contact-right{
        color: #666;
        font-size: .26rem;
        line-height: 1.3rem;
        text-align: center;
    }
    .tel{
        margin-left: -.4rem;
    }
    .tel img{
        width: .22rem;
    }
    .titleBar{
    height: .8rem;
    font-size: .26rem;
    color: #666666;
    line-height: .8rem;
    text-align: center;
    border-top: .1rem solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
    background: url(../../assets/img/标头线1@2x.png) no-repeat center center;
        background-size: 100%; 
        background-color: #fff;
        margin-top: .1rem;
    }
    .possess{
        padding: 0 .29rem .2rem;
        background: #fff;
    }
    .possess-title{
        height: .93rem;
        line-height: .93rem;
    }
    .float-left{
        float: left;
        font-size: .26rem;
    }
    .float-left img{
        width: .26rem;
        padding-right: .12rem;
    }
    .float-right{
        float: right;
        font-size: .24rem;
        
    }
    .float-right img{
        width: .22rem;
        padding-left: .08rem;
    }
    .card{
    box-sizing: border-box;
    margin-bottom: .20rem;
    height: 1.4rem;
    box-sizing: border-box;
        overflow: hidden;
        border-radius: .2rem  .2rem   0px  0px;
        background:linear-gradient(to right, #20C0AB, #39DCA7);
    display: flex;
    justify-content: space-between;
    }
    .card dl{
        font-size: 0;
    display: flex;
    justify-content: space-between;
  }
  .card dl dd{
    font-size: .26rem;
    display: flex;
    flex-direction: column;
    padding: .2rem 0;
    justify-content: space-around;
    color: #fefefe;
  }
  .card dl dd h3{
    margin: 0;
    padding: 0;
    font-size: .34rem;
    font-weight: normal;
  }
  .card dl dd p{
    margin: 0;
    padding: 0;
    }
    dl>dt:nth-child(1){
        margin: .2rem;
    }
    .cLogo{
    width: .96rem;
    height: .96rem;
    background: url(../../assets/img/卡1图.png) no-repeat center center;
    background-size: 100%; 
    }
    .credit{
        float: right;
        width: 1.4rem;
        height: 1.4rem;
        opacity: .2;
        background: url(../../assets/img/ditu@2x.png) no-repeat;
        background-size: 100%;
    }
    .nouser{
        margin-top: .31rem;
    }
    .button{
    width: 100%;
    height: .7rem;
    font-size: .24rem;
    color: #F9A724;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

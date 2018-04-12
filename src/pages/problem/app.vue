<template>
  <ul class="problem">
    <!-- <li  v-for="(todo,index) in todos" :key="index" v-on:click="show(index)">
      <div class="btn">
        <span class="left">{{ todo[0] }}<strong>{{ todo[1] }}</strong></span>
        <span class="right"></span>
      </div>
      <p v-show="activeIndex === index" >
        {{ todo[2] }}
        <strong class="strong1">
          {{ todo[3] }}
        </strong>
    </p>
    </li> -->
    <li v-on:click="show1()">
      <span class="left">Q:<strong>我们是谁？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow1">
        A:
        <strong class="strong1">
          我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？
        </strong>
    </p>
    <li v-on:click="show()">
      <span class="left">Q:<strong>如何激活额度？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow">
        A:
        <strong class="strong1">
          如何激活额度？如何激活额度？如何激活额度？如何激
          活额度？如何激活额度？如何激活额度？如何激活额度？
        </strong>
    </p>
    <li v-on:click="show2()">
      <span class="left">Q:<strong>可用额度可用来购买哪些产品？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow2">
        A:
        <strong class="strong1">
          可用额度可用来购买哪些产品？可用额度可用来购买哪些产品？可用额度可用来购买哪些产品？
        </strong>
    </p>
    <li v-on:click="show3()">
      <span class="left">Q:<strong>如何使用额度进行分期消费？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow3">
        A:
        <strong class="strong1">
          如何使用额度进行分期消费？如何使用额度进行分期消费？如何使用额度进行分期消费？
        </strong>
    </p>
    <li v-on:click="show4()">
      <span class="left">Q:<strong>我的可用额度不够支付我要买的产品总价怎么办？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow4">
        A:
        <strong class="strong1">
          我的可用额度不够支付我要买的产品总价怎么办？我的可用额度不够支付我要买的产品总价怎么办？
        </strong>
    </p>
    <li v-on:click="show5()">
      <span class="left">Q:<strong>如何提升额度？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow5">
        A:
        <strong class="strong1">
          如何提升额度？如何提升额度？如何提升额度？如何提升额度？如何提升额度？如何提升额度？
        </strong>
    </p>
    <li v-on:click="show6()">
      <span class="left">Q:<strong>平台优惠活动有哪些？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow6">
        A:
        <strong class="strong1">
          平台优惠活动有哪些？平台优惠活动有哪些？平台优惠活动有哪些？平台优惠活动有哪些？平台优惠活动有哪些？
        </strong>
    </p>
    <li v-on:click="show7()">
      <span class="left">Q:<strong>忘记登录密码怎么办？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow7">
        A:
        <strong class="strong1">
          忘记登录密码怎么办？忘记登录密码怎么办？忘记登录密码怎么办？忘记登录密码怎么办？忘记登录密码怎么办？
        </strong>
    </p>
    <li v-on:click="show8()">
      <span class="left">Q:<strong>忘记支付密码怎么办？</strong></span>
      <span class="right"></span>
    </li>
    <p v-show="isShow8">
        A:
        <strong class="strong1">
          忘记支付密码怎么办？忘记支付密码怎么办？忘记支付密码怎么办？忘记支付密码怎么办？忘记支付密码怎么办？
        </strong>
    </p>
  </ul>
</template>

<script>
export default {
  data () {
    return{
      isShow:false,
      isShow1:false,
      isShow2:false,
      isShow3:false,
      isShow4:false,
      isShow5:false,
      isShow6:false,
      isShow7:false,
      isShow8:false,
      // activeIndex: -1 ,
      // todos:[
      //   ['Q:','我们是谁？','A:',' 我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？我们是谁？'],
      //   ['Q:','如何激活额度？','A:',' 如何激活额度？如何激活额度？如何激活额度？如何激活额度？如何激活额度？如何激活额度？'],
      //   ['Q:','可用额度可用来购买哪些产品？','A:',' 可用额度可用来购买哪些产品？可用额度可用来购买哪些产品？可用额度可用来购买哪些产品？'],
      //   ['Q:','如何使用额度进行分期消费？','A:',' 如何使用额度进行分期消费？如何使用额度进行分期消费？如何使用额度进行分期消费？'],
      //   ['Q:','我的可用额度不够支付我要买的产品总价怎么办？','A:',' 我的可用额度不够支付我要买的产品总价怎么办？我的可用额度不够支付我要买的产品总价怎么办？'],
      //   ['Q:','如何提升额度？','A:',' 如何提升额度？如何提升额度？如何提升额度？如何提升额度？如何提升额度？如何提升额度？'],
      //   ['Q:','平台优惠活动有哪些？','A:',' 平台优惠活动有哪些？平台优惠活动有哪些？平台优惠活动有哪些？平台优惠活动有哪些？'],
      //   ['Q:','忘记登录密码怎么办？','A:',' 忘记登录密码怎么办？忘记登录密码怎么办？忘记登录密码怎么办？忘记登录密码怎么办？'],
      //   ['Q:','忘记支付密码怎么办？','A:',' 忘记支付密码怎么办？忘记支付密码怎么办？忘记支付密码怎么办？忘记支付密码怎么办？'],
      // ]
    }
  },
  methods:{
    // show:function(index){
    //   console.log(index)
    //   this.activeIndex = index;
    // },
    show:function(){
      this.isShow = !this.isShow;
    },  
    show1:function(){
      this.isShow1 = !this.isShow1;
    },
    show2:function(){
      this.isShow2 = !this.isShow2;
    },
    show3:function(){
      this.isShow3 = !this.isShow3;
    },
    show4:function(){
      this.isShow4 = !this.isShow4;
    },
    show5:function(){
      this.isShow5 = !this.isShow5;
    },
    show6:function(){
      this.isShow6 = !this.isShow6;
    },
    show7:function(){
      this.isShow7 = !this.isShow7;
    },
    show8:function(){
      this.isShow8 = !this.isShow8;
    },
  }
}
</script>

<style scoped>
   *{
     margin: 0;
     padding: 0;
     list-style: none;
   }
   .problem{
     margin-top: 0.2rem;
   }
   li{
     background: #fff;
     height: 0.96rem;
     overflow: hidden;
     border-bottom: 0.01rem solid #E3E3E3;
   }
   li:last-child{
     border-bottom: 0
   }
   .left{
     float: left;
     height:0.96rem; 
    font-size:0.26rem;
    font-family:PingFangSC-Light;
    color:rgba(249,167,36,1);
    line-height:0.96rem;
    margin-left: 0.3rem;
   }
   strong{
     color:#373737;
     margin-left: 0.1rem
   }
   .right{
      float: right;
      display: inline;
      display: block;
      margin-top: 0.34rem;
      margin-right: 0.3rem;
      height: 0.22rem;
      width: 0.12rem;
      background: url(../../assets/img/jinru.png) no-repeat right;
   }
   img{
     margin-top: 0.34rem;
     margin-right: 0.3rem;
     height: 0.22rem;
     width: 0.12rem;
   }
   P{
     height: 1.03rem;
     background:rgba(240,242,245,1);
     font-size:0.26rem;
     font-family:PingFangSC-Light;
     color:rgba(124,211,100,1);
     line-height:0.5rem;
     padding: 0.2rem 0.3rem;
     box-sizing: content-box;

   }
</style>

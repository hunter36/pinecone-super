<template>
	<div class="certifition">
		<ul>
			<li class="guanxi">
				<p>与本人关系</p>
				<input type="text" name="mcontact1type" placeholder="请选择">
				<a href="#" class="jinru" v-on:click="handleClick"></a>
			</li>
			<li class="name">
				<p>联系人姓名</p>
				<input type="text" name="emcontact1" placeholder="请从通讯录中选择">
				<div class="tongxunlu lianxiren"  v-on:click="middleClick">
				</div>
			</li>
			<li class="way">
				<p>联系方式</p>
				<input type="text" name="emcontact1phone" placeholder="请从通讯录中选择">
			</li>
		</ul>
		<ul>
			<li class="guanxi">
				<p>与本人关系</p>
				<input type="text" name="emcontact2type" placeholder="请选择">
				<a href="#" class="jinru" v-on:click="handleClick"></a>
			</li>
			<li class="name">
				<p>联系人姓名</p>
				<input type="text" name="" placeholder="请从通讯录中选择">
				<div class="tongxunlu lianxiren"  v-on:click="middleClick">
				</div>
			</li>
			<li class="way">
				<p>联系方式</p>
				<input type="text" name="emcontact2phone" placeholder="请从通讯录中选择">
			</li>
		</ul>
		<div class="complete">
			<a href="#">完成</a>
		</div>
		<mt-popup
		v-model="popupVisible"
		position="bottom">
			<div class="popup">
                <h3>选择与本人关系</h3>
                <span v-on:click="closeClick">确定</span>
            </div>
			<div class="gx">
				<mt-picker :slots="slots" @change="onValuesChange">
					
				</mt-picker>
            </div>

		</mt-popup>
		<popup
		v-model="middleVisible"
		position="middle" class="middle">
			<p class="allow">是否允许“松果信用”读取通话记录</p>
			<div class="dianji">
				<a class="left" v-on:click="closemiddle">取消</a>
				<a class="right" v-on:click="closemiddle">允许</a>
			</div>
		</popup>
	</div>
</template>

<script>

import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import axios from 'axios'
// import md5 from 'md5'
export default {
	name:"certifition",
	components:{
		Popup,
		Picker,
	},
	data(){
		return{
			popupVisible:false,
			middleVisible:false,
			slots: [
				{
				flex: 1,
				values: ['父母', '子女', '配偶', '亲戚', '同事', '朋友'],
				className: 'slot1',
				textAlign: 'center'
				},
			],
			// mcontact1,
		}
	},
	// mounted(){
    //   this.getData();
    // },
	methods: {
		setvalue:function(name){

		},
		onValuesChange(picker, values) {
			if (values[0] > values[1]) {
				picker.setSlotValue(1, values[2]);
			}
		},
		handleClick: function() {
			this.popupVisible = true 
		},
		closeClick: function() {
			this.popupVisible = false
			console.log(document.querySelectorAll('.picker-item')[2].innerHTML)
		},
		middleClick: function() {
			this.middleVisible = true
		},
		closemiddle: function() {
			this.middleVisible = false
		},
		// getData : function(){
		// 		let str = "Api_CUSER_A3_Request" ;
		// 		// let signValue = Md5(str);
		// 		let obj = {
		// 			loginaid : "14280420180212162446",
		// 			tocken : "20180213003304592-753573e5b7114635af4ccdef16b3b36d",
		// 			pictype : "big_pic",
		// 			sign : "dcaab9e9818a58087b8b7ea23f554ccb",
		// 			apiId : "Api_CUSER_A3_Request",
		// 			aid : "14280420180212162446",
		// 		};
		// 		let req = JSON.stringify(obj);
		// 		this.sendAjax(req);
		// },
		// sendAjax : function(req){
		// 		axios({
		// 			method: 'post',
		// 			url: '/ldo',
		// 			headers: {
		// 				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		// 			},
		// 			params: {
		// 				'requestjson': req
		// 			}
		// 		})
		// 			.then((res) => {
		// 				console.log(res);
		// 				// console.log(res.data.status)
		// 			})
		// 			.catch((err) => {
		// 				console.log(err);
		// 			}
		// 		);
		// 	},
	},
}
</script>


<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.certifition{
		width: 100%;
		background: #F0F2F5;
	}
	ul{
		background: #fff;
		margin-top: 0.2rem;
	}
	ul li{
		height: 0;
		height: 1.21rem;
		border-bottom: 0.01rem solid #e6e6e6;
		padding-left: 0.3rem;
		overflow: hidden;
	}
	.guanxi{
		padding-right: 0.31rem;
	}
	.guanxi span{
		border-right: 0;
	}
	.jinru{
		width: 0.15rem;
		height: 0.29rem;
		margin: 0.47rem 0 0 0.69rem;
		cursor: pointer;
		background: url(../../assets/img/jinru.png) no-repeat ;
		float: right;
	}
	.name{
		padding-right: 0.35rem;
	}
	.way span{
		border-right: 0;
	}
	p{
		height: 1.21rem;
		font-size: 0.3rem;
		line-height: 1.21rem;
		color: rgba(51,51,51,1);
		margin: 0 0.6rem 0 0;
		width: 1.5rem;
		float: left;
	}
	div.tongxunlu{
		height: 0.6rem;
		width: 0.8rem;
		border-left: 0.01rem solid #e6e6e6;
		float: right;
		margin-top: 0.33rem;
		background: url(../../assets/img/lianxiren.png) no-repeat center right;
	}
	input{
		display: inline-block;
		height: 0.6rem;
		font-size:0.3rem;
		color:#333333;
		line-height:0.6rem;
		margin-top: 0.33rem;
		float: left;
		border: 0;
		padding-left: 5px;
		outline: none;
	}
	.lianxiren{
		height: 0.43rem;
		cursor: pointer;
		float: right;
		margin-top: 0.06rem;
	}
	
	li:nth-child(3){
		border-bottom: 0;
	}
	.mint-popup{
		height: 6.68rem;
		width: 100%;
		background: #fff;
		z-index: 9999;
	}
	.mint-popup .popup{
		height: 1.36rem;
		border-bottom: 0.01rem solid #E9E9E9;
	}
	.mint-popup .popup h3{
		height:1.36rem; 
		font-size:0.36rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
		line-height:1.36rem;
		font-weight: 500;
		width: 100%;
		text-align: center;
	}
	.mint-popup .popup span{
		display: inline;
		display: block;
		height: 1.36rem;
		font-size:0.36rem;
		font-family:PingFangSC-Light;
		color:rgba(249,171,47,1);
		line-height: 1.36rem;
		margin: 0;
		width: 1rem;
		position: relative;
		top: -1.36rem;
		right: -6.32rem;
	}
	.mint-popup .gx{
		height: 3.72rem;
		padding: 0;
		margin-top: 0.78rem;
		overflow: hidden;
	}
	.mint-popup .gx p{
		width: 100%;
		text-align: center;
	}
	.p1{
		height:0.3rem; 
		font-size:0.28rem;
		font-family:PingFangSC-Light;
		color:rgba(202,202,202,1);
		line-height:0.3rem;
		margin-bottom: 0.51rem;
	}
	.p2{
		height:0.32rem; 
		font-size:0.32rem;
		font-family:PingFangSC-Light;
		color:rgba(119,119,119,1);
		line-height:0.32rem;
		margin-bottom: 0.54rem;
	}
	.p3{
		height:0.36rem; 
		font-size:0.36rem;
		font-family:PingFangSC-Regular;
		color:rgba(249,171,47,1);
		line-height:0.36rem;
		margin-bottom: 0.54rem;
	}
	.p4{
		height:0.28rem; 
		font-size:0.28rem;
		font-family:PingFangSC-Light;
		color:rgba(202,202,202,1);
		line-height:0.28rem;
		margin-bottom: 0.51rem;
	}		
	.middle{
		width:5.92rem;
		height:3.2rem; 
		background:rgba(255,255,255,1);
		border-radius: 0.26rem 
	}
	.middle .allow{
		height: 2rem;
		width: 5.90rem;
		font-size:0.3rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
		line-height:2rem;
		text-align: center;
		border-bottom: 0.01rem solid #CCCCCC;
	}
	.middle .dianji{
		width: 5.9rem;
		height: 1.2rem;
		/* overflow: hidden; */
	}
	.middle .dianji .left{
		display: block;
		width: 2.95rem;
		height: 1.2rem;
		border: 0;
		float: left;
		background: #fff;
		color: #333333;
		border-radius: 0 0 0 0.26rem;
		text-align: center
	}
	.middle .dianji .right{
		display: block;
		width: 2.94rem;
		height: 1.2rem;
		border: 0;
		float: right;
		background: #fff;
		border-left: 0.01rem solid #CCCCCC;
		border-radius: 0 0  0.26rem 0;
		color: #F9AB2F;
		text-align: center
	}
	.complete{
        width:6.9rem;
        height:0.9rem; 
        background:rgba(222,222,222,1);
        border-radius: 0.08rem;
        margin: 0 auto; 
        margin-top: 0.6rem;

    }
    .complete:hover{
        background: rgba(249,171,47,1);
    }
    a{
        display: inline;
        display: block;
        width: 0.9rem;
        margin: 0 auto;
        text-decoration: none;
        font-size:0.36rem;
        color:rgba(255,255,255,1);
        line-height:0.9rem;
    }
	.picker{
		padding-top: 0.7rem;
		height:4.6rem;
		width: 100%;
		background: #fff;
		display: block;
		position: fixed;
		bottom: 0
	}
	.picker-slot-wrapper{
		position: relative;
		top: -0.72rem;
	}
	.picker-selected{
		height:0.34rem; 
		font-size:0.36rem;
		font-family:PingFangSC-Regular;
		color:rgba(249,171,47,1);
		line-height:0.3rem;
	}
</style>
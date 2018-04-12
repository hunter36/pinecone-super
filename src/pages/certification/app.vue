<template>
	<div class="certifition">
		<h3>基础认证</h3>
		<div class="content">
			<div class="cont">
				<a href="#" class="txlxr"></a>
				<p>填写联系人</p>
				<span class="certified">已认证</span>
				<div class="certification"></div>
			</div>
			<div class="cont">
				<a href="#" class="zfb"></a>
				<p>支付宝授权</p>
				<span class="certified">已认证</span>
				<div class="certification"></div>
			</div>
			<div class="cont">
				<a href="#" class="yys"></a>
				<p>运营商授权</p>
				<span class="unauthorized">未认证</span>
			</div>
			<div class="cont">
				<a href="#" class="zmxy"></a>
				<p>芝麻信用授权</p>
				<span class="unauthorized">未认证</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>


<style scoped>
	*{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.certifition{
		width: 100%;
		background: #F0F2F5;
	}
	h3{
		height:0.29rem; 
		font-size:0.3rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
		line-height:0.36rem;
		margin: 0.5rem 0 0.29rem 0.32rem;
	}
	.content{
		width: 100%;
		height: 2.7rem;
		background: #fff;
		display: flex;
		justify-content: space-between
	}
	.content .cont{
		width: 1.5rem;
		margin:0 auto;
		text-align:center;
	}
	.content a{
		display: inline;
		display: block;
		width: 0.88rem;
		height: 0.88rem;
		margin: auto;
		margin-top: 0.5rem;
	}
	.txlxr{
		overflow: hidden;
		background-image: url(../../assets/img/txlxr@2x.png) ;
		background-size:100% auto;
		background-repeat: no-repeat;
  	}
  	.txlxr:before{content: ""; display: block; padding-top: 100%;}
	.zfb{
		overflow: hidden;
		background-image: url(../../assets/img/zfb@2x.png) ;
		background-size:100% auto;
		background-repeat: no-repeat;
  	}
  	.zfb:before{content: ""; display: block; padding-top: 100%;} 
	.yys{
		overflow: hidden;
		background-image: url(../../assets/img/yys@2x.png) ;
		background-size:100% auto;
		background-repeat: no-repeat;
  	}
  	.yys:before{content: ""; display: block; padding-top: 100%;} 
	.zmxy{
		overflow: hidden;
		background-image: url(../../assets/img/zmxy@2x.png) ;
		background-size:100% auto;
		background-repeat: no-repeat;
  	}
  	.zmxy:before{content: ""; display: block; padding-top: 100%;} 
	
	.certification{
		background: url(../../assets/img/rz@2x.png);
		overflow: hidden;
		background-size:100% auto;
		background-repeat: no-repeat;
		width: 0.34rem;
		height: 0.34rem;
		position: relative;
		top: -2rem;
		right: -0.9rem
	}
	.certification:before{content: ""; display: block; padding-top: 100%;} 
	.content p{
		height:0.23rem; 
		font-size:0.24rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
		line-height:0.36rem;
		text-align: center;
		margin: 0.3rem 0 0.25rem 0
	}
	.content span{
		display: inline;
		display: block;
		width: 1.5rem;
		text-align: center;
		height:0.23rem; 
		font-size:0.24rem;
		font-family:PingFangSC-Light;
		line-height:0.36rem;
	}
	.content span.certified{
		color: #00A900;
	}
	.content span.unauthorized{
		color: #999999
	}
</style>
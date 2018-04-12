<template>
	<div class="help">
		<a href="problem.html" class="problem">
			<span class="left">常见问题</span>
			<span class="right"></span>
		</a>
		<a href="opinion.html" class="opinion">
			<span class="left">意见反馈</span>
			<span class="right"></span>
		</a>
		<a href="#" class="phone">
			<span class="left">电话客服</span>
			<span class="right"></span>
		</a>
	</div>
</template>

<script>
export default {
 
}
</script>

<style scoped>
	*{
	padding: 0;
	margin: 0;
	text-decoration: none;
	list-style: none;
	}
	.help{
		padding-top: 1.28rem;
	}

	.left{
		font-size:0.3rem;
		font-family:PingFangSC-Light;
		color:rgba(51,51,51,1);
		line-height:1rem;
		float: left;
	}
	.right{
		display: inline;
		display: block;
		float: right;
		margin: 0.38rem 0.3rem 0 0;
		background: url(../../assets/img/jinru.png) no-repeat right;
		height: 0.22rem;
		width: 0.12rem;
	}
	a{
		display: inline;
		display: block;
		background: #fff;
		padding-left: 0.3rem
	}
	.problem{
		height: 1rem;
		margin-top: 0.2rem;
		overflow: hidden;
	}
	.opinion{
		height: 0.99rem;
		border-bottom: 0.01rem solid #F0F2F5;
		margin-top: 0.2rem;
		overflow: hidden;
	}
	.phone{
		height: 0.99rem;
		overflow: hidden;
	}
</style>
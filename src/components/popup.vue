<template>
  <div>
      <popup
		v-model="popupVisible"
		position="bottom">
			<!-- <div class="popup">
				<h3>选择与本人关系</h3>
				<span v-on:click="closeClick">确定</span>
			</div> -->
			<div class="gx">
				<p class="p1">父母</p>
				<p class="p2">子女</p>
				<p class="p3">配偶</p>
				<p class="p2">亲戚</p>
				<p class="p4">同事</p>
				<p class="p4">朋友</p>
			</div>
		</popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';
export default {
  data () {

  }
}
</script>

<style scoped>
    div{
        width: 100%;

    }
</style>

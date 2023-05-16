<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>{{ count }}</view>
		<button class="margin-sm padding-lr-sm bg-blue radius" @click="clickAddCount">点击增加count</button>
	</view>
</template>

<script >
import { defineComponent, ref } from "vue"
export default defineComponent({
	setup() {
		const count = ref(0)
		const clickAddCount = () => {
			count.value = ++count.value
		}

		return {
			count,
			clickAddCount
		}
	}
})

</script>

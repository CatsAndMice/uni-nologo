<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import {
		defineComponent,
		toRefs
	} from 'vue'
	export default defineComponent({
		props: {
			url: {
				type: String,
				default: ''
			}
		},
		setup(props) {
			const {
				url
			} = toRefs(props)
			return {

			}
		}
	})
</script>
<template>
	<view style="margin-left: 24rpx;padding-top: 16rpx;padding-bottom: 16rpx;" :class="showSolid ? 'solidm-bottom' : ''"
		@click="onClick">
		<view class="flex">
			<view class="flex">
				<image class="rank-bg-img-1" v-if="rankIndex == 0" :src="no1Image" />
				<image class="rank-bg-img-2" v-else-if="rankIndex == 1" :src="no2Image" />
				<image class="rank-bg-img-3" v-else-if="rankIndex == 2" :src="no3Image" />
				<view class="rank-msg" v-else>{{ rankIndex + 1 }}</view>
				<view class="flex margin-left-12">
					<view class="cu-avatar bg-white margin-auto-tb round" :style="{
						backgroundImage: `url(${noAvatarDefaultF(item.avatar)})`,
						width: avatarSize,
						height: avatarSize
					}">
					</view>
				</view>
			</view>
			<view class="flex justify-between w-100  margin-auto-tb">
				<view class="flex flex-direction" style="margin-left: 16rpx;">
					<view class="rank-user">{{ item.name }}</view>
					<view class="rank-df">{{ item.deptName }}</view>
				</view>
				<view class=" margin-auto-tb ">
					<!-- <view class="flex"> -->
					<!-- <view class="rank-df margin-auto-tb">晶点</view> -->
					<view class="d-font margin-auto-tb rank-score margin-lr-12">{{ item.value }}</view>
					<!-- </view> -->
				</view>
			</view>
		</view>
		<!-- <view style="height: 2rpx; margin-left: 200rpx;" class="bg-red" ></view> -->
	</view>
</template>

<script>
import { defineComponent } from 'vue'
import { noAvatarDefaultF } from '../../tools/tool.js'
import no1Image from "@/static/square/gc_toplist_xunzhang_no1@2x.png"
import no2Image from "@/static/square/gc_toplist_xunzhang_no2@2x.png"
import no3Image from "@/static/square/gc_toplist_xunzhang_no3@2x.png"

export default defineComponent({
	name: 'rank-cell',
	props: {
		listType: {
			type: Number, //0积分榜
			default: 0
		},

		item: {
			type: Object,
			default: null
		},
		rankIndex: {
			type: [Number, String],
			default: 999
		},
		showSolid: {
			type: Boolean,
			default: true
		},
		avatarSize: {
			type: String,
			default: '80rpx'
		}
	},
	emits: ['click-record'],
	setup(props, { emit }) {
		const onClick = () => {
			emit('click-record')
		}


		return {
			noAvatarDefaultF,
			onClick,
			no1Image,
			no2Image,
			no3Image
		}
	}
})

</script>

<style lang="scss">
.rank-bg-img-1 {
	width: 48rpx;
	height: 48rpx;
	margin: auto 4rpx;
}

.rank-bg-img-2 {
	width: 48rpx;
	height: 48rpx;
	margin: auto 4rpx;
}

.rank-bg-img-3 {
	width: 48rpx;
	height: 48rpx;
	margin: auto 4rpx;
}

.rank-msg {
	width: 48rpx;
	height: 48rpx;
	text-align: center;
	line-height: 48rpx;
	font-size: 28rpx;
	color: $jd-text-msg-color;
	font-weight: Medium;
	margin: auto 4rpx;

}

.rank-user {
	font-size: 28rpx;
	font-weight: Medium;
	line-height: 44rpx;
	color: #1D2129;
}

.rank-df {
	font-size: 24rpx;
	line-height: 36rpx;
	color: $jd-text-msg-color;
}

.rank-score {
	color: #FFA24A;
	font-size: 40rpx;
}

.no-wrap {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
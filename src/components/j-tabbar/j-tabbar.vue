<template>
	<view class="m-tabbar-box m-tabbar fixed" :style="tabbarBoxStyle" v-if="isShowTabBar">
		<view class="m-tabbar__fill m-tabbar__safe m-tabbar-height" v-if="fill" >
		</view>
		<view id="m-tabbar" class="m-tabbar m-tabbar__safe m-tabbar-height" :class="{'fixed': fixed }"
			:style="tabbarStyle">
			<view class="m-tabbar__border" v-if="borderStyle === 'black' "></view>
			<view class="m-tabbar__flex">
				<view @click="tabChange(index)" v-for="(item, index) in tabbarList" :key="index" class="m-tabbar__item"
					:class="{
						'm-tabbar__item__active': index === currentIndex,
					}">
					<slot :name="`tabbar_index_${index}`">
						<view v-if="item.iconPath==''">
							<view class="m-tabbar__label" :style="{'color': index === currentIndex ? tabbarConfig.selectedColor : tabbarConfig.color }">
								{{ item.text }}
							</view>
							<view class="m-tabbar__line" :style="{'background-color': index === currentIndex ? tabbarConfig.selectLineColor : '#ffffff' }"></view>
						</view>
						<view v-else>
							<view class="m-tabbar__icon">
								<view class="m-tabbar__badge" v-if="item.dot">{{item.dot}}</view>
								<image :src="currentIndex === index ? item.selectedIconPath : item.iconPath"
									class="m-tabbar__icon_img" />
							</view>
							<view class="m-tabbar__label"
								:style="{'color': index === currentIndex ? tabbarConfig.selectedColor : tabbarConfig.color }">
								{{ item.text }}
							</view>
							</view>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const obj2strStyle = (obj) => {
		let style = ''
		for (let key in obj) {
			style += `${key}:${obj[key]};`
		}
		return style
	}

	const padFirstSymbol = (str, smb) => {
		if (str.startsWith(smb) || str.startsWith('http')) {
			return str
		}
		return `/${str}`
	}

	const replaceTabbarList = (list) => {
		if (!list.length > 0) {
			return []
		}
		return list.map(item => {
			if (item.iconPath) {
				item.iconPath = padFirstSymbol(item.iconPath, '/')
			}
			if (item.pagePath) {
				item.pagePath = padFirstSymbol(item.pagePath, '/')
			}
			if (item.selectedIconPath) {
				item.selectedIconPath = padFirstSymbol(item.selectedIconPath, '/')
			}
			return item
		})
	}

	export default {
		emits: ['change', 'click'],
		props: {
			current: {
				type: [Number, String],
				default: 0
			},
			tabbar: {
				type: Object,
				default () {
					return {}
				}
			},
			fixed: {
				type: Boolean,
				default: false
			},
			fill: {
				type: Boolean,
				default: false
			},
			zIndex: {
				type: [Number, String],
				default: 9999
			},
			beforeChange: {
				type: Function,
				default: null
			},
		},
		data() {
			return {
				isShowTabBar: false,
				currentIndex: 0,
				beforeData: {},
				reload: false
			}
		},
		watch: {
			current(val) {
				this.currentIndex = val * 1
			}
		},
		computed: {
			tabbarConfig() {
				return this.tabbar
			},
			tabbarList() {
				const {
					reload
				} = this
				const {
					list
				} = this.tabbarConfig
				if (reload) {}
				if (list) {
					return replaceTabbarList(list)
				}
				console.error('No tabbar config')
				return []
			},
			borderStyle() {
				const {
					reload
				} = this
				const {
					borderStyle
				} = this.tabbarConfig
				if (reload) {}
				return borderStyle
			},
			tabbarBoxStyle() {
				const {
					zIndex,
					reload
				} = this
				if (reload) {}
				return obj2strStyle({
					'z-index': zIndex,
				})
			},

			tabbarStyle() {
				const {
					backgroundColor
				} = this.tabbarConfig
				return obj2strStyle({
					'background-color': backgroundColor || '#fff',
				})
			},
			tabbarItemStyle() {
				const {
					currentIndex,
					reload
				} = this
				const {
					color,
					selectedColor
				} = this.tabbarConfig
				if (reload) {}
				return obj2strStyle({
					'color': currentIndex ? selectedColor : color
				})
			}
		},
		mounted() {
			this.initTabbar()
		},
		methods: {
			initTabbar() {
				// uni.hideTabBar()
				const {
					current,
					fill,
					tabbarList
				} = this
				this.currentIndex = current * 1

				setTimeout(() => {
					this.isShowTabBar = true
				})
			},
			reLoad() {
				this.reload = true
				setTimeout(() => {
					this.reload = false
				})
			},
			checkMaxIndex(index) {
				if (!this.tabbarConfig.list[index]) {
					console.error('Max tabbar index')
					return false
				}
				return true
			},
			setTabBarBadge(obj) {
				const {
					index,
					text
				} = obj
				if (this.checkMaxIndex(index)) {
					this.tabbarConfig.list[index].dot = text
					this.reLoad()
				}
			},
			setTabBarItem(obj) {
				const {
					index,
					text,
					pagePath: newPagePath,
					iconPath,
					selectedIconPath
				} = obj
				const {
					pagePath: oldPagePath
				} = this.tabbarConfig.list[index]
				if (this.checkMaxIndex(index)) {
					this.tabbarConfig.list[index] = {
						pagePath: newPagePath ? newPagePath : oldPagePath,
						text,
						iconPath,
						selectedIconPath
					}
					this.reLoad()
				}
			},
			showTabBar() {
				this.isShowTabBar = true
			},
			hideTabBar() {
				this.isShowTabBar = false
			},
			tabChange(index) {
				const {
					currentIndex
				} = this
				this.$emit('click', index)
				if (index === currentIndex) {
					return
				}
				this.beforeData = {
					newIndex: index,
					oldIndex: currentIndex,
					next: this.jumpPage
				}
				if (this.beforeChange) {
					this.beforeChange(this.jumpPage)
				} else {
					this.jumpPage()
				}
			},
			jumpPage() {
				const {
					beforeData,
					tabbarList: list
				} = this
				const {
					newIndex: index
				} = beforeData
				const {
					pagePath: url,
					openType
				} = list[index]
				if (url) {
					{
						if (openType !== 'navigate') {
							this.currentIndex = index
						}
						switch (openType) {
							case 'navigate':
								uni.navigateTo({
									url
								})
								break;
							case 'redirect':
								uni.redirectTo({
									url
								})
								break;
							case 'reLaunch':
								uni.reLaunch({
									url
								})
								break;
							case 'switchTab':
								uni.switchTab({
									url
								})
								break;
							case 'navigateBack':
								uni.navigateBack({
									delta: 1
								})
								break;
							default:
								uni.reLaunch({
									url
								})
						}
					}
				}
				this.$emit('change', index)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.m-tabbar-box {
		position: relative;
		z-index: 9999;
	}

	.m-tabbar {
		position: relative;

		&.fixed {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
		}

		&__safe {
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
	.m-tabbar-height {
		height: calc(98rpx + env(safe-area-inset-bottom));
	}
	.m-tabbar__fill {
		pointer-events: none;
		opacity: 0;
	}

	.m-tabbar__flex {
		display: flex;
		flex-direction: row;
	}

	.m-tabbar__border {
		background-color: rgba(0, 0, 0, 0.33);
		width: 100%;
		height: 1rpx;
		transform: scaleY(0.5);
	}

	.m-tabbar__item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		padding: 4px 0 2px;
	}

	.m-tabbar__icon {
		width: 88rpx;
		height: 64rpx;
		margin-bottom: 6rpx;
		position: relative;

		&_img {
			display: block;
			width: 100%;
			height: 100%;
		}

		.m-tabbar__badge {
			color: #fff;
			background-color: #f00;
			border-radius: 20rpx;
			font-size: 22rpx;
			position: absolute;
			right: -25rpx;
			left: 40rpx;
			padding: 2rpx 0;
			width: 100%;
			text-align: center;
			white-space: nowrap;
		}
	}

	.m-tabbar__label {
		margin-top: 10rpx;
		font-size: 28rpx;
		font-weight: Medium;
	}
	.m-tabbar__line {
		// width: 60rpx;
		height: 4rpx;
		border-radius: 2rpx;
		margin: 4rpx auto;
		
	}
</style>
<template>
    <view class="margin-bottom-12 bg-white   padding-bottom-8">
        <view class="title padding-lr-16 bg-white"><text style="margin-right: 8rpx;"> 选择点赞对象</text>
            <uni-icons type="help-filled" color="#999999" size="16" @click="open" />
        </view>

        <view class="select-person padding-lr-16 flex justify-between align-center">
            <view class="flex" style="flex-wrap: wrap;">
                <view v-for="p in person" :key="p.userId" class="margin-right-8 padding-bottom-8" @click="onPreview">
                    <base-avatar :src="p.avatar" :name="p.name" width="80rpx" height="80rpx" />
                </view>

                <view v-if="!isEmpty(person)" class="cu-avatar df-warp radius" :style="{
                    width: '80rpx',
                    height: '80rpx',
                    backgroundColor: '#fff',
                    backgroundImage: `url(${addImage})`
                }"></view>
                <view v-else @click="onSelectPerson" style="font-size: 32rpx;font-weight: 400;color: rgba(0,0,0,0.6);">
                    添加点赞对象</view>

            </view>

            <view class="flex align-center padding-left-16" style="font-size: 32rpx;color: rgba(0,0,0,0.4);"
                @click="onPreview">
                <text>{{ person.length }}</text>
                <text style="margin-right: 8rpx;">人</text>
                <uni-icons color="rgba(0,0,0,0.4)" type="forward" size="24" />
            </view>

        </view>
        <view class="padding-lr-16">
            <!-- 我的能量 -->
            <view class="flex justify-between margin-top-8 item">
                <view style="color: rgba(0, 0, 0, 0.9);">我的能量</view>
                <view class="flex align-center">
                    <view><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">{{ energyInternal }}</text>内部能量</view>
                    <view class="margin-left-8"><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">{{
                        energyExternal }}</text>外部能量
                    </view>
                </view>
            </view>

            <!-- 我消耗的能量 -->
            <view class="flex justify-between item" style="margin-top: 8rpx;">
                <view style="color: rgba(0, 0, 0, 0.9);">我消耗的能量</view>
                <view class="flex align-center">
                    <view><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">{{ internal }}</text>内部能量</view>
                    <view class="margin-left-8"><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">{{ external
                    }}</text>外部能量
                    </view>
                </view>
            </view>
        </view>
    </view>

    <uni-popup ref="popupRef" :is-mask-click="false">
        <view class="popup-content">
            <view style="position: absolute;top: 32rpx;right: 32rpx;"><uni-icons type="closeempty" color="rgba(0,0,0,0.9)"
                    size="24" @click="close" /></view>
            <view class="margin-bottom-8" style="margin-top: 64rpx;text-align: center; height: 54rpx;
font-size: 36rpx;
font-weight: 600;
color: rgba(0,0,0,0.9);
line-height: 54rpx;">能量消耗说明</view>
            <view style="width: 384rpx;margin: auto;color: rgba(0,0,0,0.6);font-size: 32rpx;line-height: 48rpx;">
                点赞或表彰本部门同事消耗 [内部能量]，点赞或表彰其他部门同事消耗 [外部能量]</view>
        </view>
    </uni-popup>
</template>
<script>
import addImage from "@/static/add.webp"
import usePopup from "@c/usePopup.js"
import isEmpty from "medash/lib/isEmpty"
export default {
    props: {
        internal: {
            type: Number,
            default: 0
        },
        external: {
            type: Number,
            default: 0
        },

        // 内容能量
        energyInternal: {
            type: Number,
            default: 0
        },
        //外部能量
        energyExternal: {
            type: Number,
            default: 0
        },
        person: {
            type: Array,
            default: []
        }
    },
    emits: ['select-person', 'preview'],
    setup(props, { emit }) {
        const { open, close, popupRef } = usePopup()
        const onSelectPerson = () => {
            emit('select-person')
        }

        const onPreview = () => {
            emit('preview')
        }

        return {
            addImage,
            onSelectPerson,
            open,
            close,
            isEmpty,
            popupRef,
            onPreview
        }

    },
}
</script>
<style lang="scss" scoped>
.title {
    height: 96rpx;
    border-bottom: 1px solid #E7E7E7;
    font-size: 32rpx;
    line-height: 96rpx;
    font-weight: 600;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.9);
}

.item {
    height: 20px;
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
}

.select-person {
    min-height: 112rpx;
    padding-top: 16rpx;
    box-sizing: border-box;
    // padding-bottom: 16rpx;
}

.popup-content {
    width: 480rpx;
    height: 480rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    overflow: hidden;
    position: relative;
}
</style>
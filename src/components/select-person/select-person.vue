<template>
    <view class="flex" style="flex-direction: column;height: 100vh;">

        <view style="flex-grow: 1;padding:32rpx 24rpx 0 24rpx;">
            <view class="bg-white" style="padding:0 24rpx;border-radius: 4rpx;overflow: hidden;">
                <uni-easyinput trim="all" prefix-icon="search" placeholder="搜索姓名" :input-border="false" @input="onInput">
                </uni-easyinput>
            </view>

            <slot name="select-main"></slot>
        </view>

        <view class="footer bg-white flex justify-between align-center" @click="openSelected" :class="{ ios: isIos() }"
            style="height: 108rpx;">
            <text>已选择{{ num }}人</text>
            <button class="cu-btn lg text-white" style="background-color: #0057FF;" @click.stop="onSubmitPerson">确定</button>
        </view>
    </view>

    <uni-popup ref="popupRef" type="bottom">
        <view class="popup-content" style="height:598rpx;overflow: hidden; border-radius: 16rpx 16rpx 0 0;background-color:#7F8FA">
            <popup-title @submit="onSubmit">
                已选择: {{ num }}人
            </popup-title>
            <view class="bg-white" style="height: 510rpx;overflow-y: auto;position: relative;">
                <slot name="select-footer">
                    <k-empty :custom-style="{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }" />
                </slot>
            </view>
        </view>
    </uni-popup>
</template>
<script>
import KEmpty from "@comp/kevy-empty/kevy-empty.vue"
import { defineComponent, unref } from "vue"
import isIos from "@/tools/isIos.js"
import usePopup from "@c/usePopup.js"
import PopupTitle from "./children/popup-title.vue"

export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: ''
        },

        num: {
            type: Number,
            default: 0
        }
    },
    components: {
        PopupTitle,
        KEmpty
    },
    emits: ['submit-select', 'open-selected', 'submit', 'search-input', 'update:modelValue'],
    setup(props, { emit }) {
        const { open, close, popupRef } = usePopup()

        const onSubmit = () => {
            close()
            emit('submit-select')
        }

        const openSelected = () => {
            open()
            emit('open-selected')
        }

        const onSubmitPerson = () => {
            emit('submit')
        }


        const onInput = (value) => {
            emit('update:modelValue', unref(value))
            emit('search-input', unref(value))
        }

        return {
            isIos,
            open,
            close,
            popupRef,
            onInput,
            openSelected,
            onSubmit,
            onSubmitPerson
        }
    },
})
</script>
<style lang="scss" scoped>
.footer {
    padding: 0 32rpx;
    box-sizing: content-box;
}

.ios {
    padding-bottom: 40rpx;
}
</style>
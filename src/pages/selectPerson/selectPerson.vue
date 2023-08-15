<template>
    <select-person v-model="search" :num="selects.length" @open-selected="onReset" @submit-select="deleteDiffSelects"
        @submit="onSubmit" @search-input="onSearchInput">
        <template #select-main>
            <!-- <view v-show="isEmpty(search) && eq(pageType, 'recentlyAdded')"> -->
            <!-- <view class="bg-white flex"
                    style="width: calc(100vw - 48rpx);overflow-x: auto;margin-top: 32rpx;padding-top: 16rpx;height: 84rpx;padding-left: 32rpx;border-top-left-radius: 16rpx;border-top-right-radius: 16rpx;">
                    <uni-breadcrumb separator="/">
                        <uni-breadcrumb-item v-for="(path, index) in paths" :key="path.deptId">
                            <view :class="{
                                'is-blob': eq(index, paths.length - 1),
                            }" @click="changeDept(path)" style="font-size: 32rpx;font-weight: 400;color: #4E5969;">
                                {{ path.deptName }}</view>
                        </uni-breadcrumb-item>
                    </uni-breadcrumb>
                </view> -->

            <!-- <view
                    style="max-height:calc(100vh - 364rpx);overflow-y: auto; background-color: #fff;padding:0  32rpx 16rpx 32rpx;border-bottom-left-radius: 16rpx;border-bottom-right-radius: 16rpx;"> -->
            <!-- <uni-load-more v-if="recommendLoading" :icon-size="12" iconType="circle" status="loading" />
                    <view v-for="(l, index) in list" :key="l.userId" class="radio flex align-center"
                        @click="radioClick(l.userId, l, limitIds.includes(l.userId))">
                        <radio :value="l.userId" :disabled="limitIds.includes(l.userId)"
                            :style="{ backgroundColor: limitIds.includes(l.userId) ? '#F2F3F5' : '' }"
                            :checked="selects.includes(l.userId)" />
                        <select-person-item :avatar="l.avatar" :name="l.name" :custom-style="{
                            height: '108rpx',
                            backgroundColor: '#fff',
                            flexGrow: 1,
                            borderWidth: index ? '2rpx' : 0,
                            marginLeft: '16rpx'
                        }">
                        </select-person-item>
                    </view> -->
            <!-- </view> -->
            <!-- </view> -->

            <!-- 组织首页 -->
            <view v-show="eq(pageType, 'home') && isEmpty(search)" style="margin-top: 32rpx;">

                <organization-group>
                    <organization-group-item :src="jaImage" :height="'128rpx'" :title-style="{
                        fontSize: '36rpx',
                        fontWeight: 400,
                        color: '#1D2129'
                    }" :title="baseDept.deptName" />
                    <view @click="changeDept(dept)">
                        <organization-group-item :src="jaImage" :height="'112rpx'" :title-style="{
                            fontSize: '28rpx',
                            fontWeight: 400,
                            color: '#1D2129',
                            marginLeft: '36rpx'
                        }" title="组织架构">
                            <view style="margin-left: 32rpx;width: 24rpx;height:2rpx;background-color: #C9CDD4;"></view>
                        </organization-group-item>
                    </view>
                    <view @click="changeDept(userInfo)">
                        <organization-group-item :src="jaImage" :height="'112rpx'" :title-style="{
                            fontSize: '28rpx',
                            fontWeight: 400,
                            color: '#1D2129',
                            marginLeft: '36rpx'
                        }" :title="userInfo.deptName">
                            <view style="margin-left: 32rpx;width: 24rpx;height:2rpx;background-color: #C9CDD4;"></view>
                        </organization-group-item>
                    </view>
                </organization-group>
            </view>

            <!-- 组织架构下钻 -->
            <view v-show="eq(pageType, 'deptAndUsers') && isEmpty(search)">
                <view class="bg-white flex"
                    style="width: calc(100vw - 48rpx);overflow-x: auto;margin-top: 32rpx;padding-top: 16rpx;height: 84rpx;padding-left: 32rpx;border-top-left-radius: 16rpx;border-top-right-radius: 16rpx;">
                    <uni-breadcrumb separator="/">
                        <uni-breadcrumb-item v-for="(path, index) in paths" :key="path.deptId">
                            <view :class="{
                                'is-blob': eq(index, paths.length - 1),
                            }" @click="changeDept(path)" style="font-size: 32rpx;font-weight: 400;color: #4E5969;">{{
    path.deptName }}</view>
                        </uni-breadcrumb-item>
                    </uni-breadcrumb>
                </view>
                <scroll-view :style="{
                    paddingBottom: '16rpx',
                    height: `calc(100vh - 330rpx)`,
                }
                    " scroll-y="true" @scrolltolower="onListLoad">
                    <view v-if="!isEmpty(deptList)" class="bg-white"
                        style="margin-bottom: 24rpx;padding-bottom: 16rpx;border-bottom-left-radius: 16rpx;border-bottom-right-radius: 16rpx;">
                        <dept-item v-for="(dl, index) in deptList" :is-line="index" :key="dl.deptId"
                            @dept-click="changeDept(dl)" :title="dl.deptName" />
                    </view>
                    <view v-show="!isEmpty(listRef)" class="bg-white"
                        style="min-height: 100rpx;padding:16rpx 32rpx;border-radius: 16rpx;">
                        <view v-for="( l, index ) in  listRef " :key="l.userId" class="radio flex align-center"
                            @click="radioClick(l.userId, l, limitIds.includes(l.userId))">
                            <radio :value="l.userId" :disabled="limitIds.includes(l.userId)"
                                :style="{ backgroundColor: limitIds.includes(l.userId) ? '#F2F3F5' : '' }"
                                :checked="selects.includes(l.userId)" style="width: 40rpx;height: 40rpx;flex-shrink: 0;" />
                            <select-person-item :avatar="l.avatar" :name="l.name" :custom-style="{
                                height: '124rpx',
                                backgroundColor: '#fff',
                                flexGrow: 1,
                                borderWidth: index ? '2rpx' : 0,
                                marginLeft: '16rpx'
                            }
                                ">
                                <view class="flex align-center" style="font-size: 24rpx;font-weight: 400;color: #4E5969;">
                                    <text>{{ l.deptName }}</text>
                                    <text
                                        style="display: inline-block;height: 32rpx;width: 2rpx;background-color: #E5E6EB;margin: 0 16rpx;"></text>
                                    <text>{{ l.position }}</text>
                                </view>
                            </select-person-item>
                        </view>
                        <uni-load-more v-if="loading && hasMore" :icon-size="12" iconType="circle" status="loading" />
                    </view>
                </scroll-view>
            </view>
            <!-- 搜索 -->
            <view v-show="!isEmpty(search)">
                <scroll-view :style="{
                    padding: '16rpx 32rpx',
                    height: `calc(100vh - 280rpx)`,
                    marginTop: '32rpx',
                    backgroundColor: '#fff',
                    borderRadius: '16rpx'
                }
                    " scroll-y="true" @scrolltolower="onListLoad">
                    <view style="background-color: #fff;min-height: 100rpx;">
                        <view v-for="( l, index ) in  listRef " :key="l.userId" class="radio flex align-center"
                            @click="radioClick(l.userId, l, limitIds.includes(l.userId))">
                            <radio :value="l.userId" :disabled="limitIds.includes(l.userId)"
                                :style="{ backgroundColor: limitIds.includes(l.userId) ? '#F2F3F5' : '' }"
                                :checked="selects.includes(l.userId)" style="width: 40rpx;height: 40rpx;flex-shrink: 0;" />
                            <select-person-item :avatar="l.avatar" :name="l.name" :custom-style="{
                                height: '124rpx',
                                backgroundColor: '#fff',
                                flexGrow: 1,
                                borderWidth: index ? '2rpx' : 0,
                                marginLeft: '16rpx'
                            }
                                ">
                                <view class="flex align-center" style="font-size: 24rpx;font-weight: 400;color: #4E5969;">
                                    <text>{{ l.deptName }}</text>
                                    <text
                                        style="display: inline-block;height: 32rpx;width: 2rpx;background-color: #E5E6EB;margin: 0 16rpx;"></text>
                                    <text>{{ l.position }}</text>
                                </view>
                            </select-person-item>
                        </view>
                        <uni-load-more v-if="loading && hasMore" :icon-size="12" iconType="circle" status="loading" />
                    </view>
                </scroll-view>
            </view>
        </template>

        <template #select-footer>
            <view style="background-color: #fff;padding: 0 32rpx;border-radius: 16rpx;">
                <view v-for="( l, index ) in  selectPerson " :key="l.userId" class="radio flex align-center"
                    @click="cancelRadioSelects(l.userId)" :style="{
                        borderTop: index ? '2rpx solid #F2F3F5' : '2rpx solid #fff'
                    }
                        ">
                    <select-person-item :avatar="l.avatar" :name="l.name"
                        :custom-style="{ height: '108rpx', backgroundColor: '#fff', flexGrow: 1, borderWidth: 0 }"></select-person-item>
                    <radio :value="l.userId" :checked="cancelSelects.includes(l.userId)" />
                </view>
            </view>
        </template>
    </select-person>
</template>
<script>
import { defineComponent, unref, ref } from "vue"
import eq from "medash/lib/eq"
import { getDepAndUsers } from "@a/depAndUsers.js"
import useInfiniteScroll from "@c/useInfiniteScroll"
import { to } from "await-to-js"
import { onLoad } from "@dcloudio/uni-app"
import SelectPersonItem from "./children/SelectPersonItem.vue"
import useSelect from "./js/useSelect.js"
import Cache from '@/utils/cache.js'
import isEmpty from "medash/lib/isEmpty"
import debounce from "medash/lib/debounce"
import OrganizationGroup from "./children/OrganizationGroup.vue"
import OrganizationGroupItem from "./children/OrganizationGroupItem.vue"
import jaImage from "@/static/ja.webp"
import useBaseDept from "./js/useBaseDept"
import DeptItem from "./children/DeptItem.vue"
import usePath from "./js/usePath"
import { BaseDataKey } from '@/utils/type.js'

export default defineComponent({
    components: {
        SelectPersonItem,
        OrganizationGroup,
        OrganizationGroupItem,
        DeptItem
    },
    setup() {
        const pageType = ref('home')
        const emitType = ref('')
        const search = ref('')
        const limitIds = ref([])
        const deptList = ref([])
        const query = { page: 1, size: 20, isSearchDept: "TRUE" }

        const userInfo = Cache.get(BaseDataKey.USER_INFO)

        const { listRef, loading, onLoad: onListLoad, onReset: onResetQuery, hasMore } = useInfiniteScroll(query, async (params) => {
            const [err, data] = await to(getDepAndUsers(params))
            deptList.value = isEmpty(data.deptList) ? [] : data.deptList
            return data.userPage
        })

        const { paths, addPath, clearPaths } = usePath()

        const { selects, selectPerson, cancelSelects, deleteDiffSelects, onReset, cancelRadioSelects, radioClick } = useSelect()

        const { baseDept, dept, getDept, requestBaseDept } = useBaseDept()

        const onSubmit = () => {
            uni.$emit(unref(emitType), unref(selectPerson))
            uni.navigateBack()
        }

        const fn = debounce(() => {
            onResetQuery()
            onListLoad()
        })

        const onSearchInput = (event) => {
            query.name = event
            query.isSearchDept = "FALSE"
            delete query.deptId
            fn()
        }


        const changeDept = (dept) => {
            if (eq(dept.deptId, 'contacts')) {
                clearPaths()
                pageType.value = "home"
                return
            }
            pageType.value = 'deptAndUsers'
            query.deptId = dept.deptId
            addPath(dept)
            onResetQuery()
            onListLoad()
        }

        onLoad(({ title }) => {
            uni.setNavigationBarTitle({ title })
            const person = Cache.get('person') || []
            const limit = Cache.get('limit') || []
            limitIds.value = limit.map(l => {
                return l.userId
            })
            person.forEach(p => {
                radioClick(p.userId, p)
            })
            requestBaseDept()
            getDept()
        })

        return {
            paths,
            deptList,
            dept,
            changeDept,
            userInfo,
            baseDept,
            eq,
            limitIds,
            listRef,
            loading,
            selects,
            search,
            isEmpty,
            emitType,
            selectPerson,
            radioClick,
            cancelSelects,
            onReset,
            deleteDiffSelects,
            cancelRadioSelects,
            onSubmit,
            onSearchInput,
            onListLoad,
            hasMore,
            limitIds,
            jaImage,
            pageType,
            changeDept
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


.is-blob {
    font-weight: 500 !important;
    color: #1D2129 !important;
}
</style>
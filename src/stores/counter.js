import { defineStore } from 'pinia'
import Cache from '../utils/cache.js'
//演示案例
export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: Cache.get('count') }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
	  
	  Cache.set('count',this.count)
    },
  },
})
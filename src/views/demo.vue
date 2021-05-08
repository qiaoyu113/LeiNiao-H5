<template>
  <div>6237163781</div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {}
  },
  mounted() {
    console.log(this.parseRelativeTime(1613974136724), '今天')
    console.log(this.parseRelativeTime(1614060536724), '明天')
    console.log(this.parseRelativeTime(1614146936724), '后天')
    console.log(this.parseRelativeTime(1614233336724), '时间')
    console.log(this.parseRelativeTime(1613887736724), '昨天')
    console.log(this.parseRelativeTime(1613801336724), '前天')
    console.log(this.parseRelativeTime(1613714936724), '以前的时间')
  },
  methods: {
    parseRelativeTime(val) {
      const aa = dayjs(val)
      const bb = new Date(new Date().toLocaleDateString()).getTime()
      const ccc = 86400000
      const sub = (aa - bb) / ccc
      const aat = dayjs(val).format('HH:mm')
      const arr = ['', '昨天', '前天', '今天', '后天', '明天', '']
      console.log(sub)
      if (Math.abs(sub) <= 3) {
        if (Number.parseInt(sub) === 0 && sub > 0) {
          return `${arr[3]} ${aat}`
        }
        if (sub < 0) {
          // 初始时间 是今天的第 1ms ,昨天需要加 1 或者 初始时间改为当天的最后一秒
          if (sub > -2) {
            return `${arr[Math.abs(Number.parseInt(sub)) + 1]} ${aat}`
          }
        } else {
          const aaccc = arr.reverse()
          return `${aaccc[Math.abs(Number.parseInt(sub))]} ${aat}`
        }
      }
      return aa.format('YYYY-MM-DD HH:mm')
    }
  }

}
</script>

<style>

</style>

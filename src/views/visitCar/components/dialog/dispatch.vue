<template>
  <div class="dispatch" @click.stop="">
    <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
      <van-picker
        title=""
        show-toolbar
        :columns="columns"
        :default-index="defaultIndex"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Dispatch',
  components: {
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    show: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      defaultIndex: 0
    }
  },
  methods: {
    // 确认
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.$emit('hidden', false);
    },
    // 取消
    onCancel() {
      this.$emit('hidden', false);
    },
    // 刷新列表
    handleFreshPage() {
      this.$emit('success')
    },
    delayFun(cb) {
      setTimeout(() => {
        cb()
      }, 350)
    }
  }
}

</script>


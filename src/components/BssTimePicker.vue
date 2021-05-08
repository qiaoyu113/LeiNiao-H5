<template>
  <div class="time-picker">
    <van-field
      v-bind="$attrs"
      :value="name"
      v-on="$listeners"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="time"
        type="time"
        :filter="filter"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
// import { Field, Toast, CellGroup, Cell, Picker, Popup, DatetimePicker } from 'vant';
import { Field, DatetimePicker, Popup } from 'vant';

export default {
  name: 'BssTimePicker',
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      showPicker: false
    }
  },
  computed: {
    time: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.name = newVal;
      },
      deep: true
    }
  },
  updated() {
    this.name = this.value;
  },
  methods: {
    onConfirm(value) {
      this.name = value;
      this.time = value;
      this.showPicker = false;
    },
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 15 === 0);
      }
      return options;
    }
  }
}
</script>

<style scoped>
.time-picker .van-cell::after{
  display:block;
}
</style>

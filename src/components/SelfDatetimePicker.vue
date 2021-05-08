<template>
  <div class="selfDatetimePickerContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="form[pickerKey]"
        type="date"
        title="选择年月日"
        :min-date="minTime"
        :max-date="maxTime"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
export default {
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true
    },
    pickerKey: {
      type: String,
      default: '',
      required: true
    },
    isComputed: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    minDate: {
      type: Date,
      default: () => new Date()
    },
    maxDate: {
      type: Date,
      default: () => new Date(2125, 12, 31)
    }
  },
  data() {
    return {
      showPicker: false,
      label: '',
      minTime: new Date(),
      maxTime: new Date(2125, 12, 31)
    }
  },
  watch: {
    isComputed(val) {
      if (val) {
        this.getLabel()
      }
    },
    minDate(val) {
      if (val) {
        this.minTime = val
      }
    },
    maxDate(val) {
      if (val) {
        this.maxTime = val
      }
    }
  },
  methods: {
    // 获取label
    getLabel() {
      this.label = `${parseTime(this.form[this.pickerKey], '{y}/{m}/{d}')}`
    },
    // 打开picker
    showPickerFn() {
      this.showPicker = true
    },
    // 点击确定
    onConfirm(obj) {
      this.label = `${obj.getFullYear()}/${obj.getMonth() + 1}/${obj.getDate()}`;
      this.form[this.pickerKey] = obj
      this.showPicker = false
    }
  }
}

</script>


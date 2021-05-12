<template>
  <div class="selfCalendarContainer">
    <van-field
      :value="form[pickerKey]"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="showPickerFn"
    >
      <template #button>
        <van-icon v-if="form[pickerKey] && isClear" name="clear" @click.stop="handleClearClick" />
      </template>
    </van-field>

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="date"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="onCancel"
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
    minDate: {
      type: Date,
      default: () => new Date()
    },
    maxDate: {
      type: Date,
      default: () => new Date()
    },
    default: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPicker: false,
      date: new Date()
    }
  },
  watch: {
    default(val) {
      if (val) {
        this.date = new Date(val)
      }
    }
  },
  methods: {
    // 打开picker
    showPickerFn() {
      this.showPicker = true
    },
    onConfirm(obj) {
      this.form[this.pickerKey] = `${parseTime(obj, '{y}/{m}/{d}')}`
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
    },
    // 清除
    handleClearClick() {
      this.form[this.pickerKey] = ''
    }
  }
}

</script>
<style scoped>
  .selfCalendarContainer >>> .van-hairline--bottom::after {
    border-bottom:none;
  }
  .selfCalendarContainer >>> .van-field {
    padding: 0px;
  }
  .selfCalendarContainer >>> .van-cell::after {
    border-bottom:none;
  }

</style>


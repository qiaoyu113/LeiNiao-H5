<template>
  <div class="selfPickerContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="() => { !readOnly && showPickerFn() }"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="picker"
        :value-key="value"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
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
    value: {
      type: String,
      default: 'text'
    },
    isComputed: {
      type: [Boolean, String, Number],
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    }

  },
  data() {
    return {
      showPicker: false,
      index: 0,
      isFirst: false,
      label: ''
    }
  },
  watch: {
    isComputed(val) {
      if (val) {
        this.getLabel()
      }
    }
  },
  methods: {
    // 回显第一次获取label和索引index
    getLabel() {
      let index = this.columns.findIndex(item => item[this.props.value] === this.form[this.pickerKey])
      if (index === -1) {
        index = 0
        this.label = ''
      } else {
        this.index = index
        this.isFirst = true
        this.label = this.columns[index][this.props.label]
      }
    },
    // 打开picker
    showPickerFn() {
      this.$emit('changelabel', this.pickerKey)
      this.showPicker = true
      if (this.isFirst) { // 第一次回显
        setTimeout(() => {
          this.$refs.picker.setIndexes([this.index])
          this.isFirst = false
        }, 20)
      }
    },
    // 点击确定
    onConfirm(obj, index) {
      this.$emit('changevalue')
      this.form[this.pickerKey] = obj[this.props.value]
      this.index = index
      this.showPicker = false;
      setTimeout(() => {
        this.label = obj[this.props.label]
      }, 20)
    },
    resetLabel() {
      this.label = ''
    }
  }
}

</script>


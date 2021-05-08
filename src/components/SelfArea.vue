<template>
  <div class="selfAreaContainer" :class="border ? 'van-hairline--bottom':''">
    <van-field
      :value="label"
      readonly
      colon
      clickable
      v-bind="$attrs"
      @click="() => { !readOnly && showPickerFn() }"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-area
        :value="getSelectCode"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { GetAllAreaCode } from '@/api/common'
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
    readOnly: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => ({
        provinceAreaName: 'provinceAreaName',
        cityAreaName: 'cityAreaName',
        countyAreaName: 'countyAreaName'
      })
    }
  },
  data() {
    return {
      showPicker: false,
      label: '',
      columns: [],
      areaList: {

      },
      isEcho: true // 是否回显
    }
  },
  computed: {
    getSelectCode() {
      if (this.form[this.pickerKey].length > 2) {
        return this.form[this.pickerKey][2] + ''
      } else if (this.form[this.pickerKey].length > 1) {
        return this.form[this.pickerKey][1] + ''
      } else if (this.form[this.pickerKey].length > 0) {
        return this.form[this.pickerKey][0] + ''
      }
      return ''
    }
  },
  watch: {
    isComputed(val) {
      if (val && this.isEcho) {
        this.getLable()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        let { data: res } = await GetAllAreaCode()
        this.areaList = res
      } catch (err) {
        console.log(`get all area code fail:${err}`)
      } finally {
        //
      }
    },
    // 获取label
    async getLable() {
      this.label = `${this.form[this.props.provinceAreaName]}/${this.form[this.props.cityAreaName]}/${this.form[this.props.countyAreaName]}`
    },
    // 打开picker
    showPickerFn() {
      this.$emit('changelabel', this.pickerKey)
      this.showPicker = true
    },
    // 点击确定
    onConfirm(obj) {
      this.form[this.pickerKey] = obj.map((item) => item && item.code).filter(item => item)
      let label = obj.map((item) => item && item.name).filter(item => item);
      this.label = label.join('/')
      this.showPicker = false
      this.isEcho = false
    }
  }
}

</script>


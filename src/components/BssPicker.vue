<template>
  <div>
    <van-field
      readonly
      clickable
      v-bind="$attrs"
      :value="name"
      :disabled="disabled"
      v-on="$listeners"
      @click="showPicker = !disabled"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :value-key="code"
        :columns="data"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div v-show="false">
      {{ val }}
    </div>
  </div>
</template>

<script>
import { Field, Picker, Popup } from 'vant';

export default {
  name: 'BssPicker',
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    codeVal: {
      type: String,
      default: 'codeVal'
    },
    code: {
      type: String,
      default: 'code'
    },
    cb: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      showPicker: false,
      name: ''
    }
  },
  computed: {
    val: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  watch: {
    data(newVal) {
      if (this.val && this.data && this.data.length > 0) {
        this.setName();
      }
    },
    val(newVal) {
      if (this.val && this.data && this.data.length > 0) {
        this.setName();
      }
    }
  },
  mounted() {
    if (this.val && this.data && this.data.length > 0) {
      this.setName();
    }
  },
  methods: {
    setName() {
      const item = this.data.find(item => {
        return String(item[this.codeVal]) === String(this.val);
      });
      if (item) {
        this.name = item[this.code]
      }
    },
    onConfirm(value) {
      this.name = value[this.code]
      this.val = value[this.codeVal]
      this.showPicker = false;
      this.cb && this.cb(value);
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.8
}
</style>

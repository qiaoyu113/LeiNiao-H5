<template>
  <div class="cancel" @click.stop="">
    <van-overlay :show="show">
      <div class="layer2 flex-col">
        <van-field
          v-model="message"
          class="text"
          rows="4"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请描述原因，最多50个字"
        />
        <div class="mod1">
          <div class="section10 flex-col" @click="show=false; message = ''">
            <span class="txt5">取消</span>
          </div>
          <div class="section11 flex-col" @click="onConfirm">
            <span class="word9">确定</span>
          </div>
        </div>
      </div>
    </van-overlay>
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
    cancelType: {
      type: String,
      default() {
        return '';
      }
    }
  },
  data() {
    return {
      message: '',
      show: false
    }
  },
  methods: {
    // 确认
    onConfirm(value, index) {
      console.log(this.cancelType); // 1是看车未看中 2是爽约需方 3是爽约供方
      // this.$emit('hidden', false);
    }
  }
}

</script>

<style lang="less" scoped>
/deep/ .van-field__body{
  padding:5px;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #838383;
}
/deep/ .van-cell::after{
  border: none;
}
.cancel{
.layer2 {
  z-index: 62;
  height: 170px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 1);
  width: 280px;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  padding: 10px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
}

.mod1 {
  z-index: auto;
  width: 100%;
  display: flex;
  padding: 0 35px;
}

.section8 {
  z-index: 70;
  width: 240px;
  height: 83px;
  border-radius: 3px;
  align-self: center;
}

.section9 {
  z-index: auto;
  width: 195px;
  height: 30px;
  justify-content: space-between;
  margin: 21px 0 0 22px;
}

.section10 {
  z-index: 67;
  position: relative;
  width: 95px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #188FF9;
  margin:5px 4px;
}

.txt5 {
  z-index: 68;
  position: absolute;
  left: 35px;
  top: 6px;
  width: 26px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(24, 143, 249, 1);
  font-size: 13px;
  line-height: 19px;
  text-align: left;
}

.section11 {
  z-index: 64;
  position: relative;
  width: 95px;
  height: 30px;
  border-radius: 3px;
  background-color: rgba(24, 143, 249, 1);
  border: 1px solid #188FF9;
  margin:5px 4px;
}

.word9 {
  z-index: 65;
  position: absolute;
  left: 35px;
  top: 6px;
  width: 26px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 13px;
  font-family: PingFangSC-Regular;
  line-height: 19px;
  text-align: left;
}

.word10 {
  z-index: 69;
  position: absolute;
  left: 51px;
  top: 50px;
  width: 135px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(216, 216, 216, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular;
  line-height: 21px;
  text-align: left;
}
}
</style>

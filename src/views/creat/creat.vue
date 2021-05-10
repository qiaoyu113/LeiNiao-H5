<template>
  <div class="wrapper">
      <van-nav-bar :title="title" class="nav-title"></van-nav-bar>
      <van-form @submit="onSubmit">
        <van-field label="看车单类型" :value="type" readonly />
        <van-field
            v-model="phoneNum"
            name="需方手机号"
            label="需方手机号"
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入需方手机号' }]"
        />
        <van-field
            v-model="name"
            name="需方姓名"
            label="需方姓名"
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入需方姓名' }]"
        />
        <van-field v-model="driverId"
            clearable
            label="车辆"
            placeholder="请输入"
            >
            <template #button>
                <span>添加</span>
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
        </van-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
        title:'新建看车单',
        type:'租赁',
        phoneNum:'',
        name:'',
        driverId:''
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper{}
</style>
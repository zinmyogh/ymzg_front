<template>
  <div class="cash">

    <div class="acc">
      <font>提交提现</font>
      <van-cell-group>
        <van-field v-model="cash.TransferJet" type="number" label="提现金额" placeholder="请输入" />
        <van-field v-model="cash.BankName" label="开户行地址" placeholder="请输入" />
        <van-field v-model="cash.RealName" label="真实姓名" placeholder="请输入" />
        <van-field v-model="cash.CardNo" type="number" label="银行卡号" placeholder="请输入" />
        <van-field v-model="cash.UserPhone" type="number" label="电话号码" placeholder="请输入" />
        <van-field v-model="cash.Password" type="password" label="登录密码" placeholder="请输入" />
        <van-field v-model="cash.Memo" label="提现备注" placeholder="请输入" />
        <div style="padding: 20px;">
          <van-button block round  color="#757575" @click="toCash">提现申请</van-button>
        </div>
        
      </van-cell-group>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'vant'
  export default {
    data() {
      return {
        cash: {
          TransferJet: '',
          BankName: '',
          RealName: '',
          CardNo: '',
          UserPhone: '',
          Password: '',
          Memo: ''
        }
      }
    },
    methods: {
      toCash() {
        Toast('该功能暂未开放。')
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.cash {
  margin-top: 46px;
  background: #f7f8fa;
  .acc{
    font{
      color: grey;
      margin-left: 10px;
      line-height: 30px;
      border-left: 3px solid red;
      padding-left: 5px;
    }
    .update-social{
      margin: 10px 20px;
      text-align: center;
    }
  }
}
</style>

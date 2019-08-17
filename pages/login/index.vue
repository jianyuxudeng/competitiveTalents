<template>
  <section class="login">
      <img src="../../assets/images/login_bg.jpg" />
      <div class="login_conten">
          <!-- logo -->
          <div class="login_logo"><img src="../../assets/images/LOGO.png" /></div>
          <!-- 登录框 -->
          <div class="login_section">
              <img src="../../assets/images/login_centen.png" />
              <div class="login_position">
                <!-- 登录 -->
                <goLogin v-if="isShow == 1" @handleShow="toRegister"></goLogin>
                <!-- 注册 -->
                <register v-if="isShow == 2" @handleShow="goLogin"></register>
                <!-- 修改密码 -->
                <rePassword :type="type"  v-if="isShow == 3" @handleShow="goLogin"></rePassword>
                <!-- 密码修改成功 -->
                <section class="password_ok" v-if="isShow == 4">
                    <em><img src="../../assets/images/password_ok.png" alt=""></em>
                    <p>重设密码完成</p>
                    <p>请返回登录页面重新登录</p>
                </section>
                <eMail v-if="isShow == 5" @handleShow="goLogin"></eMail>
              </div>
          </div>
          <!-- footer -->
          <div class="login_foot">WWW.ES-CAREER.COM</div>
      </div>
  </section>
</template>

<script>
import "./index.less";
import ajax from '../../plugins/api';
import goLogin from '../../components/molecule/login';
import register from '../../components/molecule/register';
import rePassword from '../../components/molecule/rePassword';
import eMail from '../../components/molecule/e-mail';

export default {
  name: "login",
  async asyncData(){
     return{
     };
  },
  components: {
    goLogin,
    register,
    rePassword,
    eMail
  },
  data() {
      return{
        isShow: 1, //1：登录   2：注册   3：找回密码   4：重设密码完成   5:邮箱找回密码
        type: '2'
      }
  },
  mounted() {
  },
  methods: {
    toRegister(e) { //进入注册 || 修改密码
      this.isShow = e.val;
      if(e.val == 3) {
        this.type = e.type;
      }
    },
    goLogin(val) {
      this.isShow = val;
    }
  }
};
</script>
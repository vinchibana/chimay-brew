<template>
  <header class="header">
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>什么值得买</p>
          <!-- 未登录时显示 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a
            >&nbsp;&nbsp;
            <a class="register" @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="#">我的社区</a>
          <a href="#">会员</a>
          <a href="#">企业采购</a>
          <a href="#">关注</a>
          <a href="#">合作招商</a>
          <a href="#">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 路由页面导航 -->
        <router-link class="logo" to="/home">
          <img src="../assets/logo.png" style="width: 175px" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="#" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on("clearSearchInput", () => {
      this.keyword = "";
    });
  },
  computed: {
    // 从 state 中取用户信息
    userName() {
      return this.$store.state.user.userInfo.nickName;
    },
  },
  methods: {
    goSearch() {
      let locations = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };

      // 在搜索结果页搜索 keyword，添加当前商品分类为 query
      if (this.$route.query.categoryName) {
        locations.query = this.$route.query;
      }
      this.$router.push(locations).catch((err) => err);
    },
    async userLogout() {
      try {
        // 派发退出登录 action 并返回至 home
        await this.$store.dispatch("userLogout");
        await this.$router.push("/home");
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;
          text-decoration: none;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 25px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>

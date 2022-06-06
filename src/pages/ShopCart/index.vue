<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartItem in cartInfoList"
          :key="cartItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartItem.isChecked"
              @change="updateStatus(cartItem)"
            />
          </li>
          <li class="cart-list-con2">
            <router-link :to="`/detail/${cartItem.skuId}`">
              <img :src="cartItem.imgUrl" alt="" />
              <div class="item-msg">
                {{ cartItem.skuName }}
              </div>
            </router-link>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartItem.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a @click="changeSkuNum('minus', -1, cartItem)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartItem.skuNum"
              minnum="'1"
              class="itxt"
              @change="changeSkuNum('change', $event.target.value, cartItem)"
            />
            <a @click="changeSkuNum('add', 1, cartItem)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartItem.skuNum * cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCartItemById(cartItem)" class="sindelet">删除</a>
            <br />
            <a href="#">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#">移到我的关注</a>
        <a href="#">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getShopCart");
    },
    changeSkuNum: throttle(async function (type, disNum, cartItem) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = cartItem.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 1;
          } else {
            disNum = disNum - cartItem.skuNum;
          }
      }
      try {
        await this.$store.dispatch("updateCart", {
          skuId: cartItem.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {}
    }, 200),

    deleteCartItemById(cartItem) {
      try {
        this.$store.dispatch("deleteCartItemById", cartItem.skuId);
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateStatus(cartItem) {
      let params = {
        skuId: cartItem.skuId,
        isChecked: parseInt(cartItem.isChecked) === 1 ? 0 : 1,
      };
      try {
        await this.$store.dispatch("updateStatus", params);
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },

    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartInfo"]),
    cartInfoList() {
      return this.cartInfo.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((cartItem) => {
        if (cartItem.isChecked === 1) {
          sum += cartItem.skuNum * cartItem.skuPrice;
        }
      });
      return sum;
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: pointer;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            cursor: pointer;
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            cursor: pointer;
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        cursor: pointer;
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei", serif;
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
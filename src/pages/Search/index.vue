<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑部分，显示分类、品牌、属性面包屑，以及移除面包屑的方法 -->
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeBreadCatName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeBreadKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeBreadTrade">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1]
              }}<i @click="removeBreadAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!-- 子组件自定义事件 -->
        <SearchSelector
          @trademarkSelector="trademarkSelector"
          @attrSelector="attrSelector"
        />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: flagIndicator }" @click="changeOrder(1)">
                  <a
                    >综合<span
                      v-show="flagIndicator"
                      class="iconfont"
                      :class="{
                        'icon-asc': ascIndicator,
                        'icon-desc': descIndicator,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: flag2Indicator }" @click="changeOrder(2)">
                  <a
                    >销量<span
                      v-show="flag2Indicator"
                      class="iconfont"
                      :class="{
                        'icon-asc': ascIndicator,
                        'icon-desc': descIndicator,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"
                      ><img :src="item.defaultImg" alt=""
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="#"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ item.hotScore }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      class="sui-btn btn-bordered btn-danger"
                      @click="updateCart(item.id)"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination
              :total="total"
              :pageSize="searchParams.pageSize"
              :pageNo="searchParams.pageNo"
              :pagerCount="5"
              @currentPage="currentPage"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "@/components/Pagination";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
    Pagination,
  },
  computed: {
    ...mapGetters(["goodsList", "skuInfo"]),
    // 综合、销量
    flagIndicator() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    flag2Indicator() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    // 排序
    ascIndicator() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    descIndicator() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },

  beforeMount() {
    // 将 route 中的 query、params 合并至 this.searchParams
    // params 来自于 Header 组件取自 input 框的 keyword 参数
    // query 来自于 TypeNav 组件 push location 前拼接的参数 {name:'search',query:{...}}
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearchData();
    console.log(this.skuInfo)
  },

  methods: {
    getSearchData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },

    async updateCart(skuId) {
      try {
        await this.$store.dispatch("getGoodInfo", skuId);
        await this.$store.dispatch("updateCart", {
          skuId: skuId,
          skuNum: 1,
        });
        // 将购物车保存至 sessionStorage
        sessionStorage.setItem("SKU_INFO", JSON.stringify(this.skuInfo));
        await this.$router.push({
          path: "/addcartsuccess",
          query: { skuNum: 1 },
        });
      } catch (error) {
        alert(error.message);
      }
    },
    // 品牌与属性选择
    trademarkSelector(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getSearchData();
    },

    attrSelector(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(props) === -1)
        this.searchParams.props.push(props);
      this.getSearchData();
    },

    // 分类面包屑展示与删除
    removeBreadCatName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchData();

      // 清除参数以便二次点击分类名搜索
      if (this.$route.params) {
        console.log(this.$route.query);
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },

    // keywords 面包屑清除，同时清除搜索框 keyword
    removeBreadKeyword() {
      this.searchParams.keyword = undefined;
      this.getSearchData();
      this.$bus.$emit("clearSearchInput");
      if (this.$route.params) {
        this.$router.push({
          name: "search",
        });
      }
    },

    // 品牌面包屑展示与删除
    removeBreadTrade() {
      this.searchParams.trademark = undefined;
      this.getSearchData();
    },

    // 商品属性面包屑展示与删除
    removeBreadAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getSearchData();
    },

    changeOrder(flag) {
      // 从当前 searchParams 中获取当前 flag 和排序
      let originFlag = parseInt(this.searchParams.order.split(":")[0]);
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:desc`;
      }
      // newOrder 赋值给 searchParams 并发送请求获取新排序
      this.searchParams.order = newOrder;
      this.getSearchData();
    },
    currentPage(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getSearchData();
    },
  },
  watch: {
    // 为 header 组件的 goSearch 方法准备，goSearch 只通过 push 和参数改变了路由，并未发起搜索请求
    $route() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getSearchData();
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;
    cursor: pointer;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>

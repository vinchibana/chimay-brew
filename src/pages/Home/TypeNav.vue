<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideOnLeave" @mouseenter="showOnEnter">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="showTypeNav">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex === index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-catName="c1.categoryName"
                  :data-catId="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 控制二级分类是否显示，此时 currentIndex 已经被 h3 的鼠标事件修改为与 index 相同-->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex === index ? 'block' : 'none' }"
              >
                <div
                  class="subItem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-catName="c2.categoryName"
                        :data-cat2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-catName="c3.categoryName"
                          :data-cat3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="#">服装城</a>
        <a href="#">美妆馆</a>
        <a href="#">尚品汇超市</a>
        <a href="#">全球购</a>
        <a href="#">闪购</a>
        <a href="#">团购</a>
        <a href="#">有趣</a>
        <a href="#">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      showTypeNav: true,
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.showTypeNav = false;
    }
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }),
    showOnEnter() {
      if (this.$route.path !== "/home") {
        this.showTypeNav = true;
      }
    },
    // 非主页隐藏全部商品分类
    hideOnLeave() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.showTypeNav = false;
      }
    },
    goSearch(event) {
      let { catname, catid, cat2id, cat3id } = event.target.dataset;
      let location = { name: "search" };
      let query = { categoryName: catname };
      if (catname) {
        // 为 query 参数动态添加 categoryId属性值
        if (catid) {
          query.categoryId = catid;
        } else if (cat2id) {
          query.categoryId = cat2id;
        } else {
          query.categoryId = cat3id;
        }
      }
      // 用路由 name 和 query 拼接 location 对象
      location.query = query;
      this.$router.push(location);
    },
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subItem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          //
          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }
        .cur {
          background-color: #ddd;
        }
      }
    }
  }
}
</style>

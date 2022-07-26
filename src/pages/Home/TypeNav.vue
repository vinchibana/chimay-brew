<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideOnLeave" @mouseenter="showOnEnter">
        <h2 class="all">全部商品分类</h2>

        <!-- 用 showTypeNav 控制是否默认展开商品分类菜单 -->
        <div class="sort" v-show="showTypeNav">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex === index }"
            >
              <!-- 鼠标进入时改变 currentIndex 为鼠标所在的 index，可被点击并搜索分类 -->
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-catName="c1.categoryName"
                  :data-catId="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- block 弹出显示二三级分类菜单 -->
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
        <a href="#">值得买超市</a>
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
      currentIndex: -1, // 高亮显示鼠标指向的分类
      showTypeNav: true, // 是否展开三级菜单
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.showTypeNav = false;
    }
  },
  methods: {
    // 节流，防止快速操作分类菜单时造成卡顿
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
      // 此处 target 为 a 元素，并通过 :data-catName 绑定自定义属性 catName 和 catid、cat2id 等到 dataset 中
      let targetNode = event.target;
      let { catname, catid, cat2id, cat3id } = targetNode.dataset;
      if (catname) {
        let locations = {
          name: "search",
          query: { categoryName: catname },
        };
        // 拼接 query 参数
        if (catid) {
          locations.query.categoryId = catid;
        } else if (cat2id) {
          locations.query.category2Id = cat2id;
        } else {
          locations.query.category3Id = cat3id;
        }
        //点击商品分类按钮的时候,如果路径当中携带 params 参数,需要合并携带给 search 模块
        if (this.$route.params.keyword) {
          locations.params = this.$route.params;
        }
        this.$router.push(locations);
        this.showTypeNav = false;
      }
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
  cursor: pointer;
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

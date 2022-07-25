<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- 两层 floor -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Recommend,
    ListContainer,
    Rank,
    Like,
    Floor,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      // 将 state home 模块当中的 floorList 映射到当前组件
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped lang="less"></style>

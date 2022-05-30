<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
export default {
  name: "Home",
  components: {
    Recommend,
    ListContainer,
    Rank,
    Like,
    Floor,
  },
};
</script>

<style scoped lang="less"></style>

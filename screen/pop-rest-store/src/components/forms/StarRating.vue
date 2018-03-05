<template>
  <span>
      <span :key="index" v-for="index in 5">
          <icon v-if="renderStar(index) === 1" name="star"/>
          <icon v-if="renderStar(index) === 0" name="star-half-o"/>
          <icon v-if="renderStar(index) === -1" name="star-o"/>
      </span>
  </span>
</template>

<script>
import Icon from "vue-awesome/components/Icon";
export default {
  name: "star-rating",
  props: ["rating"],
  data() {
    return {};
  },
  methods: {
    renderStar(index) {
      let { rating } = this._props;
      let isDecimal = !!(rating % 1);
      if (isDecimal) {
        rating = rating - rating % 1;
      }
      let value = -1;
      if (rating >= index) {
        value = 1;
      } 
      if (rating == index && isDecimal) {
        value = 0;
      }
      return value;
    }
  },
  components: { Icon }
};
</script>

<style lang="scss" scoped>
span {
  color: #ffed00;
}
</style>

<template>
    <div class="product">
        <img src="product.imageUrl" alt="">
        <span>{{product.name}}</span>
    </div>
</template>

<script>
export default {
  name: "landing-product",
  data() {
    return {};
  },
  props: ["product"]
};
</script>
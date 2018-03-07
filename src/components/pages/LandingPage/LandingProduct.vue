<template>
    <div class="product">
        <figure class="figure">
            <img class="figure-img img-fluid " :src="product.imageUrl" alt="">
            <figcaption class="text-primary text-left figure-caption">{{product.productName}}</figcaption>
            <figcaption class="text-primary text-left figure-caption"> 
                <star-rating :rating="product.rating" /> 
                <span class="text-dark">{{product.numberOfRatings}}</span>
            </figcaption>
            <figcaption class="text-primary text-left figure-caption">
                <span class="text-danger">${{product.price}}</span>
                <span class="text-dark">
                    <del>${{product.listPrice}}</del>
                </span>
            </figcaption>
        </figure>
    </div>
</template>

<script>
import StarRating from "../../forms/StarRating";

export default {
  name: "landing-product",
  data() {
    return {};
  },
  components: {
    StarRating
  },
  props: ["product"],
  methods: {}
};
</script>

<style lang="scss">
@import "../../../scss/main";
.product {
    
}
</style>
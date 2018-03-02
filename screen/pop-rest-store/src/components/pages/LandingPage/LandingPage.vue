<template>
  <div class="container">
    <carousel :navigationEnabled="true">
        <slide v-for="product in products" :key="product.id">
            <landing-product :product="product"/>
        </slide>
    </carousel>
  </div>

</template>


<script>
import { Carousel, Slide } from "vue-carousel";
import ProductServices from "../../../services/ProductsService";
import LandingProduct from "./LandingProduct";

export default {
  name: "landing-page",
  data() {
    return {
      products: []
    };
  },
  beforeCreate() {
    ProductServices.getFeaturedProducts().then(data => {
      this.products = data.products;
    });
  },
  methods: {},
  components: {
    Carousel,
    Slide,
    LandingProduct
  }
};
</script>

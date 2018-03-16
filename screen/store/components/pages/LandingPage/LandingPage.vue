<template>
    <div>
        <div class="container-fluid features">
            <div class="d-flex justify-content-around container">
                <div class="feature ">
                    <div class="feature-icon">
                        <icon name="gift"/>
                    </div>
                    <div class="feature-info">
                        <div class="title text-left">FAST SHIPPING</div>
                        <div class="subtitle">Nationwide delivery whitin 3 days</div>
                    </div>
                </div>
                <div class="feature ">
                    <div class="feature-icon">
                        <icon name="fire"/>
                    </div>
                    <div class="feature-info">
                        <div class="title text-left">HOT DEALS</div>
                        <div class="subtitle">New deals every week</div>
                    </div>
                </div>
                <div class="feature ">
                    <div class="feature-icon">
                        <icon name="lock"/>
                    </div>
                    <div class="feature-info">
                        <div class="title text-left">FAST SHIPPING</div>
                        <div class="subtitle">Nationwide delivery whitin 3 days</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="text-left">
                This Week's deals
            </div>
            <carousel :per-page="4" :navigationEnabled="true">
                <slide v-for="product in products" :key="product.productId">
                    <landing-product :product="product"/>
                </slide>
            </carousel>
        </div>
    </div>

</template>


<script>
import { Carousel, Slide } from "vue-carousel";
import ProductServices from "../../../services/ProductsService";
import LandingProduct from "./LandingProduct";
import Icon from "vue-awesome/components/Icon";

export default {
  name: "landing-page",
  data() {
    return {
      products: []
    };
  },
  beforeCreate() {
    ProductServices.getFeaturedProducts().then(data => {
      this.products = data;
    });
  },
  methods: {},
  components: {
    Carousel,
    Slide,
    LandingProduct,
    Icon
  }
};
</script>


<style lang="scss" scoped>
@import "../../../scss/main";
.features {
  background: map-get($theme-colors, primary);
  color: #fff;
  padding-top: 10px;
  .feature {
    display: flex;
    .feature-icon {
      font-size: 3em;
    }

    .feature-info {
      padding: 5px;
      .subtitle {
        font-size: 0.8em;
      }
    }
  }
}
</style>

storeComps.ProductReview = {
  name: "product-review",
  data() { return {} },
  components: { StarRating: storeComps.StarRatingTemplate },
  props: ["reviews"]
};
storeComps.ProductReviewTemplate = getPlaceholderRoute("productReviewTemplate", "ProductReview", storeComps.ProductReview.props);

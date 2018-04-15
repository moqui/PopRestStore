var ProductReview = {
  name: "product-review",
  data() {
    return {}
  },
  components: {
    StarRating: StarRatingTemplate
  },
  props: ["reviews"]
};
var ProductReviewTemplate = getPlaceholderRoute(
  "/store/components/pages/ProductPage/ProductReview/ProductReview.html","ProductReview",ProductReview.props
);

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
  "./components/pages/ProductPage/ProductReview/ProductReview.html","ProductReview",ProductReview.props
);
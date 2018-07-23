storeComps.StarRating = {
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
  }
};
storeComps.StarRatingTemplate = getPlaceholderRoute("starRatingTemplate", "StarRating", storeComps.StarRating.props);

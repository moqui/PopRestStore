import axios from "axios";

export default {
  getFeaturedProducts: () => {
    return new Promise(resolve => {
      resolve({
        products: [
          {
            id:1,
            name: "Woman's T-shirt",
            rating: 3,
            numberOfRatings: 11,
            value: 19.99,
            originalValue: 29.99,
            imageUrl: "~/static/sample-pic.png"
          },
          {
            id:2,
            name: "Woman's T-shirt",
            rating: 3,
            numberOfRatings: 11,
            value: 19.99,
            originalValue: 29.99,
            imageUrl: "~/static/sample-pic.png"
          },
          {
            id:3,
            name: "Woman's T-shirt",
            rating: 3,
            numberOfRatings: 11,
            value: 19.99,
            originalValue: 29.99,
            imageUrl: "~/static/sample-pic.png"
          },
          {
            id:4,
            name: "Woman's T-shirt",
            rating: 3,
            numberOfRatings: 11,
            value: 19.99,
            originalValue: 29.99,
            imageUrl: "~/static/sample-pic.png"
          },
          {
            id:5,
            name: "Woman's T-shirt",
            rating: 3,
            numberOfRatings: 11,
            value: 19.99,
            originalValue: 29.99,
            imageUrl: "~/static/sample-pic.png"
          },
          {
            id:6,
            name: "Woman's T-shirt",
            rating: 3,
            numberOfRatings: 11,
            value: 19.99,
            originalValue: 29.99,
            imageUrl: "~/static/sample-pic.png"
          }
        ]
      });
    });
  }
};

import axios from "axios";

export default {
  getFeaturedProducts: () => {
    return axios
      .get("/rest/s1/pop/categories/PopcAllProducts/products")
      .then(res => {
        return res.data.productList;
      });

    // return new Promise(resolve => {
    //   resolve({
    //     products: [
    //       {
    //         id:1,
    //         name: "Woman's T-shirt 1",
    //         rating: 1,
    //         numberOfRatings: 11,
    //         value: 19.99,
    //         originalValue: 29.99,
    //         imageUrl: "static/sample-pic.png"
    //       },
    //       {
    //         id:2,
    //         name: "Woman's T-shirt 2",
    //         rating: 2,
    //         numberOfRatings: 11,
    //         value: 19.99,
    //         originalValue: 29.99,
    //         imageUrl: "static/sample-pic.png"
    //       },
    //       {
    //         id:3,
    //         name: "Woman's T-shirt 3",
    //         rating: 3,
    //         numberOfRatings: 11,
    //         value: 19.99,
    //         originalValue: 29.99,
    //         imageUrl: "static/sample-pic.png"
    //       },
    //       {
    //         id:4,
    //         name: "Woman's T-shirt 4",
    //         rating: 3.5,
    //         numberOfRatings: 11,
    //         value: 19.99,
    //         originalValue: 29.99,
    //         imageUrl: "static/sample-pic.png"
    //       },
    //       {
    //         id:5,
    //         name: "Woman's T-shirt 5",
    //         rating: 4,
    //         numberOfRatings: 11,
    //         value: 19.99,
    //         originalValue: 29.99,
    //         imageUrl: "static/sample-pic.png"
    //       },
    //       {
    //         id:6,
    //         name: "Woman's T-shirt 6",
    //         rating: 5,
    //         numberOfRatings: 11,
    //         value: 19.99,
    //         originalValue: 29.99,
    //         imageUrl: "static/sample-pic.png"
    //       }
    //     ]
    //   });
    // });
  }
};

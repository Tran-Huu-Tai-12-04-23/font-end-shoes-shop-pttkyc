class Utils {
  checkMinLength(username, minLength) {
    return username.length >= minLength;
  }
  checkIsEmail(email) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(email)) {
      return false;
    }
    return true;
  }

  checkPhoneNumber(number) {
    number = number.replace(/\D/g, "");
    if (number.length !== 10) {
      return false;
    }
    if (!/^\d+$/.test(number)) {
      return false;
    }
    return true;
  }

  filterItems(
    items,
    filterConditions = {
      gender: [],
      age: [],
      color: [],
      price: [],
      feature: [],
      type: [],
      size: [],
      brand: "all",
    }
  ) {
    return items.filter((item) => {
      // Filter by gender
      if (
        filterConditions.gender.length > 0 &&
        !filterConditions.gender.includes(item.gender) &&
        !filterConditions.gender.includes("unisex")
      ) {
        return false;
      }
      if (
        filterConditions.size.length > 0 &&
        !filterConditions.size.includes(item.size) &&
        !filterConditions.size.includes("unisex")
      ) {
        return false;
      }
      if (
        filterConditions.type.length > 0 &&
        !filterConditions.type.includes(item.type) &&
        !filterConditions.type.includes("unisex")
      ) {
        return false;
      }
      // Filter by age
      if (
        filterConditions.age.length > 0 &&
        !filterConditions.age.includes(item.age) &&
        filterConditions.age.length > 0
      ) {
        return false;
      }

      // Filter by color
      if (
        filterConditions.color.length > 0 &&
        !filterConditions.color.includes(item.color) &&
        filterConditions.color.length > 0
      ) {
        return false;
      }

      // Filter by price
      if (
        !filterConditions.price.includes("over") &&
        filterConditions.price.length > 0 &&
        filterConditions.price &&
        !filterConditions.price.some((priceRange) => {
          const { start, end } = JSON.parse(priceRange);
          return item.cost >= start && item.cost <= end;
        })
      ) {
        return false;
      }

      // Filter by feature
      if (
        filterConditions.feature.length > 0 &&
        !filterConditions.feature.includes(item.feature) &&
        filterConditions.feature.length > 0
      ) {
        return false;
      }
      if (
        filterConditions.brand.toLowerCase() !== "all" &&
        filterConditions.brand.toLowerCase() !== item.brand.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }

  sortProducts(products, sortBy, sortOrder) {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      if (sortBy === "cost") {
        if (sortOrder === "asc") {
          return a.cost - b.cost;
        } else {
          return b.cost - a.cost;
        }
      } else if (sortBy === "add_date") {
        if (sortOrder === "asc") {
          return new Date(a.add_date) - new Date(b.add_date);
        } else {
          return new Date(b.add_date) - new Date(a.add_date);
        }
      }
    });
    return sortedProducts;
  }
}

export default Utils;

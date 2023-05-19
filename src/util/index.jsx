import unidecode from "unidecode";

class Utils {
  isValidDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Invalid date"; // Kiểm tra ngày không hợp lệ
    }

    if (end < start) {
      return "Date end must after date start"; // Ngày cuối phải lớn hơn ngày đầu
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      return "Date start invalid"; // Ngày đầu phải lớn hơn hoặc bằng ngày hôm nay
    }
    if (end < today) {
      return "Date end invalid"; // Ngày đầu phải lớn hơn hoặc bằng ngày hôm nay
    }

    return true; // Ngày hợp lệ
  }
  isValidPhoneNumber(phoneNumber) {
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(cleanedNumber);
  }

  calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Chuyển đổi các ngày thành mili giây
    const startMs = start.getTime();
    const endMs = end.getTime();

    // Tính toán khoảng cách (số ngày)
    const differenceMs = Math.abs(endMs - startMs);
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
  }

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

  searchItems(items, search) {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase())
    );
  }

  searchByNameAddress(addresses, searchText) {
    if (searchText && addresses) {
      const searchStr = unidecode(searchText.toLowerCase().trim());
      const result = addresses.filter((address) => {
        const name = unidecode(address.name.toLowerCase());
        return name.includes(searchStr);
      });
      return result;
    }
    return addresses;
  }
  async processImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = new Image();
        image.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          // Tính toán kích thước mới cho ảnh (ví dụ: giảm kích thước xuống 50%)
          const newWidth = image.width * 0.5;
          const newHeight = image.height * 0.5;
          // Thiết lập kích thước mới cho canvas
          canvas.width = newWidth;
          canvas.height = newHeight;
          // Vẽ ảnh đã thu nhỏ lên canvas
          ctx.drawImage(image, 0, 0, newWidth, newHeight);
          // Lấy dữ liệu ảnh từ canvas
          const processedDataUrl = canvas.toDataURL("image/jpeg");
          resolve(dataURItoFile(processedDataUrl, file.name));
        };
        image.src = e.target.result;
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
}

function dataURItoFile(dataURI, fileName) {
  // Convert Base64-encoded data to binary data
  const binaryData = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const array = [];
  for (let i = 0; i < binaryData.length; i++) {
    array.push(binaryData.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(array)], { type: mimeString });
  // Create new file from the blob object and set its name
  const file = new File([blob], fileName, { type: mimeString });
  return file;
}

export default Utils;

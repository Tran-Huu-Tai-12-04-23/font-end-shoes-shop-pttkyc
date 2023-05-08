import axios from "axios";

class Services {
  async addDataToTable(tableName, link, data) {
    link = "http://localhost:3300" + link;
    switch (tableName) {
      case "account": {
        try {
          const response = await axios.post(link, { ...data });
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      default: {
        console.error("Invalid table name");
        return null;
      }
    }
  }

  async callApi(link, data) {
    link = "http://localhost:3300" + link;
    try {
      const response = await axios.post(link, { ...data });
      return response.data;
    } catch (error) {
      return null;
    }
  }
}

export default Services;

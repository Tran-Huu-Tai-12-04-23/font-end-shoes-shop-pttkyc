import axios from "axios";
import { storage } from "../Firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

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
  async getDataFromApiOrder(link, params = "") {
    link = "http://localhost:3300" + link;
    try {
      const response = await axios.get(link);
      return response.data;
    } catch (error) {
      return null;
    }
  }
  async uploadListPhoto(photos) {
    const listUrlPhoto = await Promise.all(
      photos.map(async (photo) => {
        const fileRefPhoto = ref(
          storage,
          `images/${photo?.file.name}-${uuid()}`
        );
        const snapshotPhoto = await uploadBytes(fileRefPhoto, photo?.file);
        const photoUrl = await getDownloadURL(snapshotPhoto.ref);
        return photoUrl;
      })
    );
    return listUrlPhoto;
  }
}

export default Services;

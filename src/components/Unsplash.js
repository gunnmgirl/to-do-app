import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID n0VJtFu-R_ri0zTVvHqVsZxoWEOzlyMb9zaVvLZPnd0"
  }
});

import axios from "axios";

async function getRandomImage() {
  try {
    const response = await instance.get("/photos/random", {
      params: {
        query: "color wallpapers",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
}

const instance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID " + process.env.REACT_APP_API_KEY,
  },
});

export default getRandomImage;

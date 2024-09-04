import axios from "axios";

async function fetchImages(searchQuery, page) {
  const API_KEY = "qSAP0Ed5oeDMZFtAhn4qZSSeNUXACxN6PoNOd4tcMC4";
  const baseUrl = "https://api.unsplash.com/search/photos/";

  const params = new URLSearchParams({
    query: searchQuery,
    client_id: API_KEY,
    per_page: 12,
    page: page,
  });

  try {
    const response = await axios.get(`${baseUrl}?${params}`);
    const { results, total } = response.data;
    return { results, total };
  } catch (error) {
    console.log(error);
  }
}

export default fetchImages;
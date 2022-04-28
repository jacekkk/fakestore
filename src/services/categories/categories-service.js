import axios from 'axios';

const FAKESTORE_BASE_URL = process.env.REACT_APP_FAKESTORE_API_URL

export const getCategories = async () => {
  try {
    const response = await axios.get(`${FAKESTORE_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

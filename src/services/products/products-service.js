import axios from 'axios';

const FAKESTORE_BASE_URL = process.env.REACT_APP_FAKESTORE_API_URL

export const getProductsByCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${FAKESTORE_BASE_URL}/products/category/${categoryName}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${FAKESTORE_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addProduct = async (productDetails) => {
  try {
    const response = await axios.post(
      `${FAKESTORE_BASE_URL}/products`,
      productDetails
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

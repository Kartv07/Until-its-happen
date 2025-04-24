import axios from "axios";

const SERVER = `https://uih-blogs.onrender.com/`;
// const SERVER = `http://localhost:8000/`;

const api = axios.create({
  baseURL: SERVER,
  timeout: 2000000,
  withCredentials: true,
});

export const getSidebarItems = async () => {
  try {
    return await api.get(`general/sidebar-items`);
  } catch (error) {
    console.log(error, "erro")
  }
};

export const getAllCategories = async () => {
  try {
    return await api.get('general/categories-parent');
  } catch (error) {
    console.log(error, "erro")
  }
}

export const getAllCategoriesParentCategories = async () => {
  try {
    return await api.get('general/all-categories-parent-categories');
  } catch (error) {
    console.log(error, "erro")
  }
}

export const addNewBlog = async (postData) => {
  try {
    return await api.post('general/add-blog', postData);
  } catch (error) {
    console.log(error, "erro")
  }
}

export const updateNewBlog = async (postData, id) => {
  try {
    return await api.put(`general/update-blog/${id}`, postData);
  } catch (error) {
    console.log(error, "erro")
  }
}

export const getBlogsData = async (query) => {
  try {
    return await api.get(`general/get-blogs?${query}`);
  } catch (error) {
    console.log(error, "erro")
  }
}

export const FetchYoutubeDataRequest = async (query) => {
  try {
    return await api.get(`youtube`);
  } catch (error) {
    console.log(error, "erro")
  }
}

export const FetchStaticPaths = async (query) => {
  try {
    return await api.get(`general/static-paths?${query}`);
  } catch (error) {
    console.log(error, "erro")
  }
}

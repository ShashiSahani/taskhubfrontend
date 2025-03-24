export const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL
    }/blogs`;

// Fetch blogs with error handling
export const fetchBlogs = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { error: error.message };
  }
};

// Add a blog with FormData
export const addBlogApi = async (blogData) => {
  try {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("author", blogData.author);
    formData.append("category", blogData.category);
    formData.append("image", blogData.image);

    blogData?.tags?.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Blog added:", data);
    return data;
  } catch (error) {
    console.error("Error adding blog:", error);
    return { error: error.message };
  }
};

// Delete a blog (fix incorrect URL syntax)
export const deleteBlogApi = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    console.log(`Blog with ID ${id} deleted.`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { error: error.message };
  }
};

export const fetchBlogsById=async(blogId)=>{
    try {
        const response =await fetch(`${API_URL}/${blogId}`);
        if(!response.ok){
            throw new Error(`Error :${response?.status} ${response?.statusText}`)
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching blog with ID ${blogId}:`, error);
        return { error: error?.message };
    }
}

export const fetchSimilarBlogs = async (blogId) => {
    try {
      const response = await fetch(`${API_URL}/${blogId}/similar`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching similar blogs for blog ID ${blogId}:`, error);
      return { error: error.message };
    }
  };
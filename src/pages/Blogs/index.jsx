import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBlogsThunk } from "../../redux/blogSlice";
import { useNavigate } from "react-router-dom";
import SmallBlogSkeleton from "./BlogLoading";
import IconButton from "../../comman/IconButton";
import { Tooltip } from "@material-tailwind/react";

const BlogIndex = () => {
  const dispatch = useDispatch();
  const { blogs=[], loading, error } = useSelector((state) => state.blogs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

console.log(blogs,"blogs")
  useEffect(() => {
    dispatch(fetchBlogsThunk());
  }, [dispatch]);

  const navigate = useNavigate();
  
  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`); 
  };
  console.log(isAuthenticated,"isAuthenticated")
  const handleReadMoreClick = (id) => {
  
    if (!isAuthenticated) {
      navigate("/login");
       
    } else {
      navigate(`/blog/${id}`);
    }
  };

  if (loading) {
    return (
        <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <SmallBlogSkeleton key={index} />
        ))}
      </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
   
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs?.blogs?.map((blog) => (
          <div key={blog._id} className="border p-4 rounded-md shadow-md cursor-pointer" onClick={() => handleBlogClick(blog._id)}>
            <img src={blog?.image} className="h-50 w-full rounded-md" alt={blog.title} />
            <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
            <p className="text-gray-600">{blog.description.substring(0, 100)}...</p>
         
            
            <Tooltip content="Read More">
              <span className="p-2  mt-2 bg-primary-dark  rounded-md flex text-gray-500  justify-center items-center">Read More
                <IconButton
                  type="readmore"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReadMoreClick(blog._id);
                  }}
                />
              </span>
            </Tooltip>
          </div>
        ))}
      </div>

 
    </div>
  );
};

export default BlogIndex;

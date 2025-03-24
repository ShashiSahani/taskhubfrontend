import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchBlogByIdThunk,
  fetchSimilarBlogsThunk,
} from "../../redux/blogSlice";
import SmallBlogSkeleton from "./BlogLoading";
import { Tooltip } from "@material-tailwind/react";
import IconButton from "../../comman/IconButton";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    selectedBlog = [],
    similarBlogs = [],
    loading,
    error,
  } = useSelector((state) => state.blogs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogByIdThunk(id));
      dispatch(fetchSimilarBlogsThunk(id));
    }
  }, [dispatch, id]);
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
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedBlog) return <p>No blog found!</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Blog Details */}
      <div className="border p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold">{selectedBlog.title}</h2>
        <p className="text-gray-500 mb-2">
          By <span className="font-semibold">{selectedBlog.author?.name}</span>{" "}
          | Category: {selectedBlog.category}
        </p>
        <img
          src={selectedBlog.image}
          className="h-60 w-full rounded-md my-4"
          alt={selectedBlog.title}
        />
        <p>{selectedBlog.description}</p>

        {/* Blog Stats */}
        <div className="mt-4 flex gap-6">
          <span>👍 {selectedBlog.likes}</span>
          <span>👎 {selectedBlog.dislikes}</span>
          <span>⭐ {selectedBlog.rating}</span>
          <span>👁️ {selectedBlog.views}</span>
          <span>🔄 {selectedBlog.shares}</span>
        </div>

        {/* Tags */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Tags:</h4>
          <div className="flex gap-2 mt-2">
            {selectedBlog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold">
            Comments ({selectedBlog?.comments?.length}):
          </h4>
          <div className="mt-2 space-y-2">
            {selectedBlog.comments.map((comment, index) => (
              <div key={index} className="border p-2 rounded-md shadow-sm">
                <p className="text-sm">
                  <span className="font-semibold">{comment.author?.name}:</span>{" "}
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Blogs */}
        {similarBlogs?.similarBlogs?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Similar Blogs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarBlogs?.similarBlogs?.map((blog) => (
                <div key={blog._id} className="border p-4 rounded-md shadow-md">
                  <img
                    src={blog.image}
                    className="h-40 w-full rounded-md"
                    alt={blog.title}
                  />
                  <h4 className="font-bold mt-2">{blog.title}</h4>
                  <p className="text-gray-600">
                    {blog.description.substring(0, 80)}...
                  </p>
                  <Tooltip content="Read More">
                    <span className="p-2  mt-2 bg-primary-dark  rounded-md flex text-gray-500  justify-center items-center">
                      Read More
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
        )}
      </div>
    </div>
  );
};
export default BlogDetails;

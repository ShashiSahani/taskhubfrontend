import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBlogsThunk } from "../../redux/blogSlice";
import { useNavigate } from "react-router-dom";
import SmallBlogSkeleton from "./BlogLoading";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CircleChevronRight } from "lucide-react";

const BlogIndex = () => {
  const [search] = useState("");

  const dispatch = useDispatch();
  const { blogs = [], loading, error } = useSelector((state) => state.blogs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(blogs, "blogs");
  useEffect(() => {
    dispatch(fetchBlogsThunk());
  }, [dispatch]);

  const navigate = useNavigate();
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={`${part}-${i}`} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const blogList = blogs?.blogs || [];
  const filteredBlogs = blogList.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase())
  );

  console.log(isAuthenticated, "isAuthenticated");
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {!loading && filteredBlogs?.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Card key={blog?._id} className="p-4 border rounded-lg shadow-lg">
              <img
                src={blog?.image}
                alt={blog?.title}
                className="rounded-md h-40 w-full object-cover"
              />
              <CardContent className="flex-1 flex flex-col">
                <h3 className="text-lg font-bold mt-2 line-clamp-2">
                  {highlightText(blog?.title, search)}
                </h3>
                <p className="text-gray-600 mt-1 line-clamp-3">
                  {highlightText(blog?.description, search)}
                </p>
                <Button
                  icon={CircleChevronRight}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReadMoreClick(blog._id);
                  }}
                  className="p-2 mt-2 bg-primary-dark rounded-md flex text-gray-500 justify-center items-center"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))
        ) : !loading && filteredBlogs?.length === 0 ? (
          <p className="text-center text-gray-500 col-span-4">
            No blogs found.Similar Blogs
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default BlogIndex;

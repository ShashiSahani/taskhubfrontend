import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mail ,CircleChevronRight} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsThunk } from "../../redux/blogSlice";
import SmallBlogSkeleton from "../Blogs/BlogLoading";
import AboutUs from "../AboutUs/AboutUs";
import { toast, ToastContainer } from "react-toastify";
import { subscribeNewsletter } from "../../redux/newsletterSlice";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

function HomeIndex() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs = [], loading, error } = useSelector((state) => state.blogs);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { status, message } = useSelector((state) => state.newsletter);
  useEffect(() => {
    dispatch(fetchBlogsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && message) {
      toast.success(message);
    }
  }, [message, status]);
  const handleNewsLetterSubscibe = () => {
    if (!email) {
      toast.error("Please Enter your Email!");
      return;
    }
    dispatch(subscribeNewsletter(email)).then((res) => {
      if (res.type.includes("fulfilled")) {
        toast.success(res.payload.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(res.payload || "Subscription failed");
      }
    });
  };
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

  const handleReadMoreClick = (id) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(`/blog/${id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <ToastContainer />
      <div className="bg-gradient-to-r from-primary-dark to-primary-light text-white text-center py-16 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">
          Stay Updated with the Latest Tech Trends
        </h1>
        <p className="mt-4 text-lg">
          Explore insights, guides, and updates on emerging technologies.
        </p>
      </div>

      <div className="flex items-center gap-2 border px-4 py-2 rounded-lg my-6">
        <Search size={20} />
        <Input
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Latest Blogs</h2>

        {loading && (
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map(() => (
                <SmallBlogSkeleton key={uuidv4()}/>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {!loading && filteredBlogs?.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Card key={blog?._id} className="p-4 border rounded-lg shadow-lg">
                <img
                  src={blog?.image}
                  alt={blog?.title}
                  className="rounded-md h-40 w-full object-cover"
                />
                <CardContent className='flex-1 flex flex-col'>
                  <h3 className="text-lg font-bold mt-2 line-clamp-2">
                    {highlightText(blog?.title, search)}
                  </h3>
                  <p className="text-gray-600 mt-1 line-clamp-3">
                    {highlightText(blog?.description, search)}
                  </p>
                  <Button icon={CircleChevronRight}
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
      <AboutUs />

      <div className="bg-gray-100 p-6 rounded-lg mt-12 text-center mb-5">
        <h3 className="text-xl font-semibold">Subscribe to Our Newsletter</h3>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest tech trends directly in your inbox.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-4 px-4">
  <Input
    placeholder="Enter your email"
    className="w-full md:w-64"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <Button
    onClick={handleNewsLetterSubscibe}
    disabled={status === "loading"}
    icon={Mail}
    className="md:w-auto"
  >
    {status === "loading" ? "Subscribing..." : "Subscribe"}
  </Button>
</div>

      </div>
    </div>
  );
}

export default HomeIndex;

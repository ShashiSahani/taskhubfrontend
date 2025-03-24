/* eslint-disable react/prop-types */
import noimage from "../../../public/no-image.png";
function BlogCard({ post, onEdit, onDelete }) {
  return (
    <div className="bg-primary-light border-2 border-primary-dark p-4 my-2 rounded w-80 h-96 overflow-hidden flex flex-col">
      <img
        src={post?.image || noimage}
        alt={post?.title}
        className="w-full h-40 object-cover rounded mb-2"
      />

      <span>{post?.id})</span>
      <h2 className="text-lg font-semibold ">{post?.title}</h2>
      <p className="text-sm flex-grow line-clamp-3">{post?.body}</p>
      <div className="flex justify-between mt-2">
        <button
          className="px-2 py-2 rounded-md mx-2 text-white bg-blue-500"
          onClick={() => onEdit(post)}
        >
          Edit
        </button>
        <button
          className="px-2 py-2 rounded-md mx-2 text-white bg-red-500"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>
        <button className="px-2 py-2 rounded-md mx-2 text-white bg-gray-500">
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;

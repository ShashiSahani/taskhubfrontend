const SmallBlogSkeleton = () => {
    return (
      <div className="border p-4 rounded-md shadow-md animate-pulse w-72">
        {/* Image Placeholder */}
        <div className="h-40 bg-gray-500 w-full rounded-md mb-3"></div>
  
        {/* Title */}
        <div className="h-6 bg-gray-500 rounded-md w-3/4 mb-2"></div>
  
        {/* Author & Category */}
        <div className="h-4 bg-gray-500 rounded-md w-1/2 mb-3"></div>
  
        {/* Description */}
        <div className="h-4 bg-gray-500 rounded-md w-full mb-1"></div>
        <div className="h-4 bg-gray-500 rounded-md w-5/6 mb-1"></div>
  
        {/* Blog Stats */}
        <div className="flex justify-between mt-3">
          <div className="h-4 w-6 bg-gray-500 rounded-md"></div>
          <div className="h-4 w-6 bg-gray-500 rounded-md"></div>
          <div className="h-4 w-6 bg-gray-500 rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default SmallBlogSkeleton;
  
const AboutUs = () => {
    return (
      <div className="container mx-auto px-4 py-10">
        {/* About Section */}
        <div className="relative text-white py-20 px-6 rounded-lg shadow-lg overflow-hidden group">
          {/* Background Image (Appears on Hover) */}
          <div className="absolute inset-0 bg-gray-900 after:absolute after:inset-0 after:bg-[url('/about.png')] after:bg-cover after:bg-center after:opacity-0 after:transition-opacity after:duration-700 after:z-0 group-hover:after:opacity-100"></div>
  
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-primary-dark bg-opacity-50 rounded-lg z-10 transition-opacity duration-700 group-hover:bg-opacity-30"></div>
  
          {/* Content */}
          <div className="relative text-center max-w-3xl mx-auto z-20 transition-all duration-700 group-hover:text-primary-dark">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-gray-300 group-hover:text-primary-dark font-bold">
              Welcome to <strong>TechSphere</strong>, your go-to platform for staying updated on the latest tech trends, programming tutorials, AI advancements, and everything related to modern development!
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  
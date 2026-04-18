const About = () => {
  const openMaps = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=23.0225,72.5714",
      "_blank",
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">About SnapStudio</h1>
          <p className="text-gray-600 mb-4">
            We are a professional photography studio based in Ahmedabad,
            Gujarat. With over 10 years of experience, we specialize in wedding,
            mehendi, ring ceremony, and portrait photography.
          </p>
          <p className="text-gray-600 mb-4">
            Our team of skilled photographers ensures every moment is captured
            beautifully and professionally.
          </p>
          <div className="mt-6 space-y-2 text-gray-700">
            <p>📞 +91 98765 43210</p>
            <p>✉️ snapstudio@gmail.com</p>
            <p>📍 Ahmedabad, Gujarat, India</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold mb-4">Find Us</h3>
          <p className="text-gray-600 mb-6 text-center">
            Visit our studio in Ahmedabad or get directions below
          </p>
          <button
            onClick={openMaps}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition flex items-center gap-2"
          >
            📍 Get Directions
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { number: "500+", label: "Weddings Shot" },
          { number: "10+", label: "Years Experience" },
          { number: "50+", label: "Photographers" },
          { number: "1000+", label: "Happy Clients" },
        ].map((stat) => (
          <div key={stat.label} className="bg-black text-white p-6 rounded-lg">
            <h3 className="text-3xl font-bold">{stat.number}</h3>
            <p className="text-gray-400 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

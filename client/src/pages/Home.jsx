import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen bg-black flex items-center justify-center text-white"
      >
        <div className="text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-4"
          >
            SnapStudio
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-300 mb-8"
          >
            Capturing your precious moments forever
          </motion.p>
          <Link
            to="/booking"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Book Now
          </Link>
        </div>
      </motion.div>

      {/* Services Section */}
      <div className="py-16 px-8 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Wedding", "Mehendi", "Ring Ceremony", "Portrait"].map(
            (service) => (
              <motion.div
                key={service}
                whileHover={{ scale: 1.05 }}
                className="bg-black text-white p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-bold mb-2">{service}</h3>
                <p className="text-gray-400 text-sm">
                  Professional {service.toLowerCase()} photography
                </p>
              </motion.div>
            ),
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
        <p className="text-gray-600 mb-8">
          Choose your date and photographer today
        </p>
        <Link
          to="/booking"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Book a Session
        </Link>
      </div>
    </div>
  );
};

export default Home;

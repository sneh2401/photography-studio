const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-8 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">SnapStudio</h3>
          <p className="text-gray-400 text-sm">
            Capturing your precious moments with passion and creativity.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/portfolio" className="hover:text-white">
                Portfolio
              </a>
            </li>
            <li>
              <a href="/booking" className="hover:text-white">
                Book Now
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Contact</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>📍 Ahmedabad, Gujarat</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ snapstudio@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-600 text-sm mt-8">
        © 2024 SnapStudio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

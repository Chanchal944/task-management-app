export function Footer() {
  return (
    <footer className="bg-blue-700 text-white mt-16 py-10">
      <div className="container mx-auto px-6 lg:px-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 items-start">

          {/* About + Logo */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">

            {/* Logo */}
            <img
              src="/img/main-logo.png"
              alt="Logo"
              className="w-80 h-auto object-contain mb-3"
            />

            {/* About heading */}
            <h3 className="text-xl font-bold mb-3">
              About
            </h3>

            {/* About text */}
            <p className="leading-relaxed text-justify text-white/90">
              TaskFlow is your smart daily task management solution designed
              to improve productivity and organize your workflow efficiently.
            </p>

          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white/90 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/task" className="text-white/90 hover:text-white transition">
                  Tasks
                </a>
              </li>
              <li>
                <a href="/filtering" className="text-white/90 hover:text-white transition">
                  Filtering
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-white/90 hover:text-white transition">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-3">Contact Info</h4>

            <ul className="space-y-2 text-white/90">
              <li>
                📞{" "}
                <a
                  href="tel:7840909741"
                  className="hover:text-white transition"
                >
                  7840909741
                </a>
              </li>

              <li>
                📧{" "}
                <a
                  href="mailto:chanchalgulhane0@gmail.com"
                  className="hover:text-white transition"
                >
                  chanchalgulhane0@gmail.com
                </a>
              </li>

              <li className="leading-relaxed">
                📍 Flat 201, Manorama Apartment, Plot No 54,
                <br />
                near Bharat Petroleum, Kukde Layout,
                <br />
                Rameshwari, Nagpur, Maharashtra 440027
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/30 pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <p className="text-white/90 text-center md:text-left">
            © 2026 TaskFlow - Smart Daily Task Management
          </p>

          <p className="text-white/90 text-center md:text-right">
            Designed & Developed by{" "}
            <a
              href="https://kavyainfoweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:underline"
            >
              Kavya Infoweb Pvt Ltd
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
import React from "react";

function Contact() {
  return (
    <section id="contact" className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
          Contact Us
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="md:w-1/2">
            <form className="bg-white p-8 rounded shadow-md">
              <div className="mb-4">
                <label className="block text-gray-800 font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Your Email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 font-medium mb-2">Message</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows="6"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Gradient Info Card */}
          <div className="md:w-1/2 flex flex-col justify-start p-8 rounded-2xl shadow-xl bg-gradient-to-tr from-green-400 to-green-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Office</h3>

            <p className="flex items-start mb-2">
              <i className="fa fa-map-marker-alt mr-3 mt-1"></i>
              123 Organic Street, Green City, Pakistan
            </p>

            <p className="flex items-center mb-2">
              <i className="fa fa-phone mr-3"></i>
              +92 300 1234567
            </p>

            <p className="flex items-center mb-2">
              <i className="fa fa-envelope mr-3"></i>
              info@biolifestore.com
            </p>

            <p className="mb-2">
              We provide fresh and organic products delivered directly from trusted farms.
            </p>

            <p className="mb-4">
              Our customer support is available 7 days a week.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-auto">
              <a href="#" className="text-white hover:text-gray-200 text-2xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-200 text-2xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-200 text-2xl">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-200 text-2xl">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

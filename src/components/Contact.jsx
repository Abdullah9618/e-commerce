function Contact() {
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
          Get in Touch
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="md:w-1/2">
            <form className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">Message</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="6"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Gradient Info Card */}
          <div className="md:w-1/2 flex flex-col justify-start p-8 rounded-xl shadow-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
            <h3 className="text-3xl font-bold mb-6">Subhan Arts</h3>

            <div className="space-y-4">
              <p className="flex items-start">
                <span className="mr-3 mt-1 text-xl">📍</span>
                <span>Lahore, Pakistan</span>
              </p>

              <p className="flex items-center">
                <span className="mr-3 text-xl">📞</span>
                <span>+92 300 123 4567</span>
              </p>

              <p className="flex items-center">
                <span className="mr-3 text-xl">✉️</span>
                <span>hello@suhanarts.com</span>
              </p>

              <p className="mt-6">
                Discover premium quality clothing crafted with care and attention to detail. Experience the perfect blend of style and comfort.
              </p>

              <p>
                Our dedicated team is ready to help you find the perfect outfit for every occasion.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a href="#" className="text-white hover:text-yellow-300 transition text-2xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition text-2xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition text-2xl">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition text-2xl">
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

import { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const WHATSAPP_NUMBER = "923454133349"; // no plus sign

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = `${name ? `Name: ${name}%0A%0A` : ""}${encodeURIComponent(message)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
          Get in Touch
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* WhatsApp Contact Form */}
          <div className="md:w-1/2">
            <form onSubmit={handleWhatsApp} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">Full Name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-800 font-semibold mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="6"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full flex items-center justify-center gap-2"
              >
                <WhatsAppIcon sx={{ fontSize: 20 }} />
                Send via WhatsApp
              </button>

              <p className="mt-3 text-sm text-gray-500">
                Clicking the button will open WhatsApp (web or app) and start a chat with +92 345 4133349.
              </p>
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
                <a className="hover:underline" href={`https://wa.me/923454133349`} target="_blank" rel="noreferrer">+92 345 4133349</a>
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
              <a href={`https://wa.me/923454133349`} target="_blank" rel="noreferrer" className="text-white hover:text-yellow-300 transition text-2xl">
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

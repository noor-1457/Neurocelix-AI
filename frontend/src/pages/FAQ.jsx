import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null); // Track which FAQ is open

  /* Fetch FAQ Data */
  useEffect(() => {
    fetch("http://localhost:5000/api/faq")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FAQ Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <div className="w-15 h-15 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );
}

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-[#8F00FF] text-center pt-10 mb-14">
          Frequently Asked Questions
        </h1>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs
            .sort((a, b) => a.order - b.order)
            .map((faq) => (
              <div
                key={faq._id}
                className="bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(faq._id)}
                >
                  <span className="text-xl font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 transform transition-transform duration-300 ${
                      openId === faq._id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openId === faq._id && (
                  <>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="mt-3 text-sm text-gray-400">
                      Category: {faq.category}
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
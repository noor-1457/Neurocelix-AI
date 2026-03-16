import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useOutletContext } from "react-router-dom";

function FAQ() {
  const { dark } = useOutletContext(); // global dark mode
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

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
    <div
      className={`flex flex-col items-center justify-center min-h-screen gap-3 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="w-15 h-15 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className={`${dark ? "text-gray-400" : "text-gray-500"} text-sm`}>
        Loading...
      </p>
    </div>
  );
}
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div
      className={`min-h-screen py-16 px-5 transition-colors duration-300 ${
        dark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1
          className={`text-5xl font-bold text-center pt-10 mb-14 transition-colors duration-300 ${
            dark ? "text-purple-400" : "text-[#8F00FF]"
          }`}
        >
          Frequently Asked Questions
        </h1>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs
            .sort((a, b) => a.order - b.order)
            .map((faq) => (
              <div
                key={faq._id}
                className={`rounded-2xl p-6 transition-all duration-300 shadow-lg ${
                  dark
                    ? "bg-gray-800 text-gray-200 hover:shadow-2xl border border-gray-700"
                    : "bg-white text-gray-800 hover:shadow-xl border border-gray-200"
                }`}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(faq._id)}
                >
                  <span className="text-xl font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-500 transform transition-transform duration-300 ${
                      openId === faq._id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openId === faq._id && (
                  <>
                    <p
                      className={`mt-4 leading-relaxed transition-colors duration-300 ${
                        dark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {faq.answer}
                    </p>
                    <div
                      className={`mt-3 text-sm transition-colors duration-300 ${
                        dark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
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

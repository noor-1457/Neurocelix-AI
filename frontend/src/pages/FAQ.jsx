import { useEffect, useState } from "react";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="h-screen flex items-center justify-center text-xl">
        Loading FAQs...
      </div>
    );
  }

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
              <details
                key={faq._id}
                className="bg-white shadow-lg rounded-2xl p-6 transition hover:shadow-xl"
              >
                <summary className="text-xl font-semibold cursor-pointer">
                  {faq.question}
                </summary>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>

                <div className="mt-3 text-sm text-gray-400">
                  Category: {faq.category}
                </div>
              </details>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;

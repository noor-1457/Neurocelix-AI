import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";
import {
  Activity,
  Cpu,
  BarChart2,
  Users,
  Folder,
  Handshake,
} from "lucide-react";

// StatCard Component
function StatCard({ icon, value, label, dark }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1.1, opacity: 1 });

      let start = 0;
      const increment = Math.ceil(value / 100);

      const interval = setInterval(() => {
        start += increment;
        if (start >= value) start = value;
        setCount(start);
        if (start >= value) clearInterval(interval);
      }, 20);
    }
  }, [inView, value, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={controls}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/10 dark:bg-gray-800 backdrop-blur-xl p-10 rounded-2xl text-center w-[200px] shadow-lg transition duration-300"
    >
      <div className="text-5xl mb-4 transition duration-300 hover:rotate-12 hover:scale-125">
        {icon}
      </div>

      <h2 className="text-4xl font-bold my-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        {count}+
      </h2>
      <p className={dark ? "text-gray-300" : "text-gray-800"}>{label}</p>
    </motion.div>
  );
}

// Home Page Component
function Home() {
  const { dark } = useOutletContext(); // global dark mode
  const [open, setOpen] = useState(false);

  // Typing animation for Hero
  const words = ["AI Automation", "Smart Analytics", "Future Technology"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(words[index].slice(0, i));
      i++;
      if (i > words[index].length) {
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
          i = 0;
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HERO SECTION */}
      <section
        className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1674027444485-cec3da58eef4')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 dark:from-gray-900/70 dark:via-gray-800/30 dark:to-gray-900/70`}
        ></div>

        <div className="relative z-10 max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-5"
          >
            {text}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg lg:text-xl text-gray-200 dark:text-gray-300 mb-8"
          >
            Next generation AI powered SaaS platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform">
              Get Started
            </button>
            <button
              onClick={() => setOpen(true)}
              className="px-8 py-3 rounded-lg bg-white/90 dark:bg-gray-800 text-black dark:text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Floating Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-30 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500 rounded-full opacity-20 animate-pulse blur-3xl"></div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-gray-100 dark:bg-gray-800 flex justify-center gap-10 p-20 flex-wrap">
        {[
          {
            icon: <Activity className="w-12 h-12 mx-auto mb-5" />,
            title: "AI Solutions",
          },
          {
            icon: <Cpu className="w-12 h-12 mx-auto mb-5" />,
            title: "Automation",
          },
          {
            icon: <BarChart2 className="w-12 h-12 mx-auto mb-5" />,
            title: "Data Analytics",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`w-[280px] p-10 rounded-2xl text-center shadow-xl transition duration-300 hover:-translate-y-3 hover:bg-[#8F00FF] hover:text-white ${
              dark ? "bg-gray-800 text-gray-200" : "bg-white/10 text-black"
            }`}
          >
            {item.icon}
            <h3 className="text-xl font-semibold">{item.title}</h3>
          </div>
        ))}
      </section>

      {/* STATS SECTION */}
      <section className="flex justify-center gap-12 p-20 flex-wrap bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
        {[
          {
            icon: <Users className="w-10 h-10 mx-auto mb-2" />,
            value: 1000,
            label: "Users",
          },
          {
            icon: <Folder className="w-10 h-10 mx-auto mb-2" />,
            value: 250,
            label: "Projects",
          },
          {
            icon: <Handshake className="w-10 h-10 mx-auto mb-2" />,
            value: 120,
            label: "Clients",
          },
        ].map((stat, idx) => (
          <StatCard key={idx} {...stat} dark={dark} />
        ))}
      </section>

      {/* VIDEO MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50"
        >
          <iframe
            width="700"
            height="400"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="video"
          ></iframe>
        </div>
      )}
    </motion.div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { Activity, Cpu, BarChart2, Users, Folder, Handshake } from "lucide-react";


function StatCard({ icon, value, label }) {
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
      className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl 
      text-center w-[200px] shadow-lg transition duration-300"
    >
      <div className="text-5xl mb-4 transition duration-300 hover:rotate-12 hover:scale-125">
        {icon}
      </div>

      <h2 className="text-4xl font-bold my-3">{count}+</h2>
      <p className="text-lg">{label}</p>
    </motion.div>
  );
}

function Home() {
  const location = useLocation();
  const is404 = location.pathname !== "/";

  const [dark, setDark] = useState(
    localStorage.getItem("dark") === "true" ? true : false,
  );

  // Typing Animation
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

  const [open, setOpen] = useState(false);

  // 404 PAGE
  if (is404) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-white dark:bg-[#111] text-black dark:text-white">
        <h1 className="text-8xl font-bold text-maroon-800">404</h1>
        <p className="mt-4 text-xl">Page Not Found</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HERO */}
      <section
        className="relative h-screen flex justify-center items-center 
        text-center text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1674027444485-cec3da58eef4')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl mb-5 font-bold">{text}</h1>
          <p className="text-lg">Next generation AI powered SaaS platform.</p>

          <div className="mt-5">
            <button
              className="px-6 py-3 m-2 bg-gray-500  
              transition duration-300 rounded"
            >
              Get Started
            </button>

            <button
              onClick={() => setOpen(true)}
              className="px-6 py-3 m-2 bg-white text-black 
             hover:text-white 
              transition duration-300 rounded"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>
      {/* SERVICES */}
     <section className="flex justify-center gap-10 p-20 flex-wrap bg-white dark:bg-gray-800 text-pink-500 dark:text-white">
  {[
    { icon: <Activity className="w-12 h-12 mx-auto mb-5" />, title: "AI Solutions" },
    { icon: <Cpu className="w-12 h-12 mx-auto mb-5" />, title: "Automation" },
    { icon: <BarChart2 className="w-12 h-12 mx-auto mb-5" />, title: "Data Analytics" },
  ].map((item, i) => (
    <div
      key={i}
      className="w-[280px] bg-white/10 backdrop-blur-xl 
                 p-10 rounded-2xl text-center shadow-xl 
                 transition duration-300 hover:-translate-y-3 
                 hover:bg-[#8F00FF] hover:text-white"
    >
      {item.icon}
      <h3 className="text-xl font-semibold">{item.title}</h3>
    </div>
  ))}
</section>

{/* STATS */}
<section className="flex justify-center gap-12 p-20 flex-wrap bg-gray-100 dark:bg-gray-800 text-pink-500 dark:text-white">
  {[
    { icon: <Users className="w-10 h-10 mx-auto mb-2" />, value: 1000, label: "Users" },
    { icon: <Folder className="w-10 h-10 mx-auto mb-2" />, value: 250, label: "Projects" },
    { icon: <Handshake className="w-10 h-10 mx-auto mb-2" />, value: 120, label: "Clients" },
  ].map((stat, idx) => (
    <StatCard key={idx} {...stat} />
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

import { motion } from "motion/react";
import VideoCard from "./ui/video-card";
import { useState } from "react";

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 for reel, 1 for video

  const featuredVideo = {
    src: "https://res.cloudinary.com/dtw3o2jxc/video/upload/v1772367229/manu-paaji-itshover-yt_uiqsor.mp4",
    title: "its hover feature by manu arora",
    aspectRatio: "video" as const,
    delay: 0.2,
  };

  const featuredReel = {
    src: "https://res.cloudinary.com/dtw3o2jxc/video/upload/v1772367229/manu-paaji-itshover-reel_q854ta.mp4",
    title: "its hover reel showcase",
    aspectRatio: "reel" as const,
    delay: 0.1,
  };

  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col items-center space-y-4 text-center"
        >
          <div className="border-primary/20 bg-primary/5 text-primary rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider lowercase">
            community love
          </div>
          <h2 className="text-4xl font-light font-serif italic tracking-tight lowercase md:text-5xl">
            loved by creators
          </h2>
          <p className="max-w-2xl text-muted-foreground/80 text-sm">
            its hover has been embraced by creators worldwide, fostering a vibrant
            community that celebrates creativity and innovation. 
          </p>
        </motion.div>

        {/* Featured Videos Row */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_2fr]">
          <VideoCard
            src={featuredReel.src}
            title={featuredReel.title}
            aspectRatio={featuredReel.aspectRatio}
            delay={featuredReel.delay}
            className="shadow-primary/5 shadow-2xl"
            isControlledPlaying={activeIndex === 0}
            onEnded={() => setActiveIndex(1)}
          />
          <VideoCard
            src={featuredVideo.src}
            title={featuredVideo.title}
            aspectRatio={featuredVideo.aspectRatio}
            delay={featuredVideo.delay}
            className="shadow-primary/10 shadow-2xl"
            isControlledPlaying={activeIndex === 1}
            onEnded={() => setActiveIndex(0)}
          />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-center flex-wrap gap-4 py-7"
    >
      <div className="line border-t border-white/20 w-20"></div>

      <div
        className="flex-center gap-2 px-4 py-1 border border-pink-500 rounded-full 
                      shadow-[0_0_15px_-3px_#fff,0_0_20px_-5px_#f6339a_inset]"
      >
        <Image
          src="/lotusflow-logo-square.png"
          alt="LotusFlow Tag"
          width={28}
          height={28}
          className="shrink-0"
        />
        <span className="text-sm font-medium text-white">{children}</span>
      </div>

      <div className="line border-t border-white/20 w-20"></div>
    </motion.div>
  );
};

export default Tag;

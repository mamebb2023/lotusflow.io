import Image from "next/image";
import React from "react";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center flex-wrap gap-4 py-7">
      <div className="border-t border-white/20 w-14"></div>
      <div
        className="flex-center gap-2 px-4 py-1 border border-pink-500 rounded-full 
                      shadow-[0_0_15px_-3px_#fff,0_0_15px_-3px_#a855f7_inset]"
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
      <div className="border-t border-white/20 w-14"></div>
    </div>
  );
};

export default Tag;

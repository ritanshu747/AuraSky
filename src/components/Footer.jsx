import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-gray-500 text-white flex justify-between items-center px-6 py-4">
      < div>© 2024 AuraSky Page.</div>
      <div>Made with love by Ritanshu Shivhare💗</div>
      <div className=" flex flex-row w-10 h-9 gap-2 py-2">
        <a href="https://github.com/ritanshu747">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/ritanshu-shivhare-099071246/">
          <FaLinkedin />
        </a>
      </div>
      </div>
  );
};

export default Footer;

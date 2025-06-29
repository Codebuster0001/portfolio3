// utils/iconList.js
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";

export const allIcons = {
  ...SiIcons,
  ...FaIcons,
  ...AiIcons,
  ...BiIcons,
  ...BsIcons,
  ...MdIcons,
  ...RiIcons,
  ...TbIcons,
};

export const iconNameList = Object.keys(allIcons);


import AskQuestionIcon from "@/components/Icons/AskQuestionIcon";
import CommunitiesIcon from "@/components/Icons/CommunitiesLogo";
import HomeIcon from "@/components/Icons/Homelogo";
import MoonIcon from "@/components/Icons/MoonIcon";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import SystemIcon from "@/components/Icons/SystemIcon";
import { Mode } from "@/context/ThemeProvider";
import { SidebarLink, Theme } from "@/types";
import { Star, Sun, Tag } from "lucide-react"
export const themes:Theme[] = [
  {
    value: Mode.Light,
    label: "Light",
    icon:Sun
  },
  {
    value: Mode.Dark,
    label: "Dark",
    icon: MoonIcon
  },
  {
    value: Mode.System,
    label: "System",
    icon: SystemIcon
  },
];


export const sidebarLinks: SidebarLink[] = [
  {
    icon: HomeIcon,
    route: "/",
    label: "Home",
  },
  {
    icon: CommunitiesIcon,
    route: "/community",
    label: "Community",
  },
  {
    icon: Star,
    route: "/collection",
    label: "Collections",
  },
  {
    icon: Tag,
    route: "/tags",
    label: "Tags",
  },
  {
    icon: ProfileIcon,
    route: "/profile",
    label: "Profile",
  },
  {
    icon:AskQuestionIcon,
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

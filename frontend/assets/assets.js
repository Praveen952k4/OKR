import {
  FaHome,
  FaBullseye,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaUserShield,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

export const sidebarLinks = [
  {
    icon: FaHome,
    route: "/",
    label: "Dashboard",
  },
  {
    icon: FaBullseye,
    route: "/my-okrs",
    label: "My OKRs",
  },
  {
    icon: FaUsers,
    route: "/teams",
    label: "Teams",
  },
  {
    icon: FaChartBar,
    route: "/analytics",
    label: "Analytics",
  },
  {
    icon: FaCalendarAlt,
    route: "/calendar",
    label: "Calendar",
  },
  {
    icon: FaFileAlt,
    route: "/reports",
    label: "Reports",
  },
  {
    icon: FaUserShield,
    route: "/admin",
    label: "Admin Panel",
  },
  {
    icon: FaCog,
    route: "/settings",
    label: "Settings",
  },
  {
    icon: FaSignOutAlt,
    route: "/logout",
    label: "Logout",
  },
];

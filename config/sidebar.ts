import {
  IconChartPie,
  IconBuilding,
  IconSettings,
  IconRobotFace,
} from "@tabler/icons-react";

export const navigation = {
  main: [
    {
      title: "Chart of Accounts",
      url: "#",
      icon: IconChartPie,
      isActive: false,
      items: [
        {
          title: "Structure",
          url: "/chart-of-accounts/structure",
        },
      ],
    },
    {
      title: "Branch",
      url: "#",
      icon: IconBuilding,
      isActive: false,
      items: [
        {
          title: "Schema",
          url: "/branch/schema",
        },
      ],
    },
    {
      title: "Model",
      url: "#",
      icon: IconRobotFace,
      isActive: false,
      items: [
        {
          title: "Schema",
          url: "/branch/schema",
        },
      ],
    },
  ],

  misc: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
};

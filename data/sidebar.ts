import {
  IconTypeface,
  IconTextSize,
  IconWorld,
  IconChartPie,
  IconBuilding,
} from "@tabler/icons-react";

export const navigation = {
  main: [
    {
      title: "Global",
      url: "#",
      icon: IconWorld,
      isActive: true,
      items: [
        {
          title: "Entity",
          url: "#",
        },
        {
          title: "Market",
          url: "#",
        },
        {
          title: "Finance Year",
          url: "#",
        },
      ],
    },

    {
      title: "Chart of Accounts",
      url: "#",
      icon: IconChartPie,
      isActive: false,
      items: [
        {
          title: "?",
          url: "#",
        },
        {
          title: "GL Mapping",
          url: "#",
        },
      ],
    },

    {
      title: "Branch",
      url: "#",
      icon: IconBuilding,
      isActive: false,
      items: [],
    },
  ],
};

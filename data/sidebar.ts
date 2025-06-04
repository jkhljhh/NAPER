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
          url: "/foundation/entity",
        },
        {
          title: "Market",
          url: "/foundation/market",
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
          title: "Master View",
          url: "/chart-of-accounts/master-view",
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

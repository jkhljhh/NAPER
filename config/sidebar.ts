import {
  IconChartPie,
  IconBuilding,
  IconSettings,
  IconBrain,
} from "@tabler/icons-react";

export const navigation = {
  main: [
    {
      title: "Foundation",
      url: "/foundation",
      icon: IconBuilding,
      isActive: true,
      items: [
        {
          title: "Initialize",
          url: "/initialize",
        },
        {
          title: "Configure",
          url: "/configure",
        },
        {
          title: "GL Mapping",
          url: "/gl-mapping",
        },
        {
          title: "Structure",
          url: "/structure",
        },
        {
          title: "Branch Schema",
          url: "/schema",
        },
        {
          title: "Threshold",
          url: "/threshold",
        },
      ],
    },
    {
      title: "Intelligence",
      url: "/intelligence",
      icon: IconBrain,
      isActive: false,
      items: [
        {
          title: "Enrich",
          url: "#",
        },
        {
          title: "Model",
          url: "#",
        },
        {
          title: "Tune",
          url: "#",
        },
        {
          title: "Validate",
          url: "#",
        },
      ],
    },
    {
      title: "Strategy",
      url: "/strategy",
      icon: IconChartPie,
      isActive: false,
      items: [
        {
          title: "Strategize",
          url: "#",
        },
        {
          title: "Deploy",
          url: "#",
        },
      ],
    },
  ],

  misc: [],
};

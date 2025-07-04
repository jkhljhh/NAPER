import { IconChartPie, IconBuilding, IconBrain } from "@tabler/icons-react";
import { url } from "inspector";
import { title } from "process";

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
        // {
        //   title: "Connect",
        //   url: "/connect",
        // },
        {
          title: "Department",
          url: "/department",
          // items: [
          //   // {
          //   //   title: "Core View",
          //   //   url: "/core-view",
          //   // },
          //   // {
          //   //   title: "GL Mapping",
          //   //   url: "/gl-mapping",
          //   // },
          // ],
        },
        //  {
        //   title: "Configuration",
        //   url: "/configuration",
        //   items: [
        //     // {
        //     //   title: "Core View",
        //     //   url: "/core-view",
        //     // },
        //     {
        //       title: "GL Mapping",
        //       url: "/gl-mapping",
        //     },
        //   ],
        // },
        {
          title: "User",
          url: "/User",
        },
        // {
        //   title: "Structure",
        //   url: "/structure",
        //   items: [
        //     {
        //       title: "Branch",
        //       url: "/branch",
        //     },
        //   ],
        // },
        // {
        //   title: "Threshold",
        //   url: "/threshold",
        // },
      ],
    },
    // {
    //   title: "Intelligence",
    //   url: "/intelligence",
    //   icon: IconBrain,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "Enrich",
    //       url: "/enrich",
    //       items: [
    //         {
    //           title: "Holidays",
    //           url: "/holidays",
    //         },
    //         {
    //           title: "Weather",
    //           url: "/weather",
    //         },
    //         {
    //           title: "Events",
    //           url: "/events",
    //         },
    //         {
    //           title: "Promotions",
    //           url: "/promotions",
    //         },
    //         {
    //           title: "Signals",
    //           url: "/signals",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Model",
    //       url: "#",
    //     },
    //     {
    //       title: "Tuning",
    //       url: "#",
    //     },
    //     {
    //       title: "Validate",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Strategy",
    //   url: "/strategy",
    //   icon: IconChartPie,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "Strategize",
    //       url: "#",
    //     },
    //     {
    //       title: "Deploy",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title:"Discovery",
      url:"/Discovery",
      items:[
        {
          title:"Agent",
          url:"/Agent",

        },
        // {
        //   title:"Department Mapping & Rename",
        //   url:"/Department Mapping",
        // }
      ],
    },
    {
      title:"Deployment",
      url:"/Deployment",
      items:[
        {
          title:"Access",
          url:"/Users Mapping",
        }
      ]
    },

  ],

  misc: [],
};

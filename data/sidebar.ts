import { IconTypeface } from "@tabler/icons-react";

export const sidebar = {
  user: {
    name: "admin",
    email: "admin@netision.com",
    avatar: "/avatars/shadcn.jpg",
  },
  nav: [
    {
      title: "Writing",
      url: "#",
      icon: IconTypeface,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },

    // agents: [
    //   {
    //     name: "Blog Generator",
    //     url: "/blog-generator",
    //   },
    //   {
    //     name: "Email Campaigner",
    //     url: "/email-campaigner",
    //   },
    //   {
    //     name: "Product Price Comparison",
    //     url: "/product-price-comparison",
    //   },
    //   {
    //     name: "Product Details",
    //     url: "/product-details",
    //   },
    //   {
    //     name: "SEO Hashtags",
    //     url: "/seo-hashtags",
    //   },
    //   {
    //     name: "Social Post",
    //     url: "/social-post",
    //   },
    // ],
    // chats: [
    //   {
    //     name: "Create a Blog Post for Netipulse",
    //     url: "#",
    //   },
    // ],
  ],
};

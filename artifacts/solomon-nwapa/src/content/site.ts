/**
 * One editable source for professional identity and site copy.
 * Personal facts and image paths should be verified before publishing.
 */

export type ProfileImageSlotConfig = {
  src: string | null;
  alt: string | null;
  targetFile: string;
};

export type SiteContent = {
  name: string;
  title: string;
  organizationName: string;
  organizationRole: string;
  identityLine: string;
  seoTitle: string;
  description: string;
  headline: {
    lead: string;
    emphasis: string;
    ending: string;
  };
  biography: readonly string[] | null;
  email: string;
  phone: string;
  whatsapp: string;
  profiles: {
    linkedin: string;
    x: string;
  };
  images: {
    heroPortrait: ProfileImageSlotConfig;
    aboutPortrait: ProfileImageSlotConfig;
    professionalPortrait: ProfileImageSlotConfig;
    socialImage: string | null;
  };
  capabilities: readonly string[];
  industries: readonly { title: string; text: string }[];
  pages: {
    home: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      introduction: string;
      focusLabel: string;
      projectsLabel: string;
      projectsTitle: string;
      projectsLink: string;
      contactEyebrow: string;
      contactTitle: string;
      contactLink: string;
      aboutLink: string;
    };
    about: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      summary: string;
      profileLabel: string;
      visionLabel: string;
      visionHeading: string;
      contactLink: string;
    };
    work: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      summary: string;
    };
    capabilities: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      summary: string;
      contactLink: string;
    };
    industries: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      summary: string;
    };
    insights: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      summary: string;
      contactLink: string;
    };
    contact: {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      summary: string;
      promptLabel: string;
      promptTitle: string;
      promptCopy: string;
    };
  };
};

const professionalIdentity = {
  name: "Solomon Nwapa",
  title: "Enterprise & Digital Software Developer",
  organizationName: "Cent22 Intelligence",
  organizationRole: "CEO",
};

const identityLine = `${professionalIdentity.organizationRole} of ${professionalIdentity.organizationName} · ${professionalIdentity.title}`;

export const site: SiteContent = {
  ...professionalIdentity,

  identityLine,

  seoTitle: "Solomon Nwapa | Enterprise & Digital Software Developer",

  description:
    "Solomon Nwapa is an Enterprise & Digital Software Developer and CEO of Cent22 Intelligence, building purposeful software around business needs.",

  headline: {
    lead: "I build",
    emphasis: "industry-changing software",
    ending: "and intelligent operating systems that matter.",
  },

  biography: [
    "Solomon Nwapa is an Enterprise & Digital Software Developer and CEO of Cent22 Intelligence.",
    "I am a native of Oguta L.G.A in Imo State, Nigeria and an aspiring Aerospace Engineering degree holder with MASSACHUSETTS INSTITUTE OF TECHNOLOGY {MIT}. I build purposeful software products around business needs, considering the people they serve and the workflows they support.",
    "My areas of focus include enterprise and business software, SaaS, digital platforms and marketplaces, workflow automation, and intelligent software solutions.",
    "AdBOSS and NovaSplit are part of his product portfolio.",
    "My broader vision through Cent22 Intelligence is to build purposeful software products and intelligent operating systems that address real business problems.",
  ],

  email: "Scnwapa@gmail.com",
  phone: "+234 7030292398",
  whatsapp: "+234 7030292398",

  profiles: {
    linkedin: "https://www.linkedin.com/in/solomon-nwapa-168648221",
    x: "https://x.com/goziedev?s=11",
  },

  images: {
    heroPortrait: {
      src: "/images/profile/solomon-hero.jpg",
      alt: "Professional portrait of Solomon Nwapa",
      targetFile: "public/images/profile/solomon-hero.jpg",
    },

    aboutPortrait: {
      src: "/images/profile/solomon-about.jpg",
      alt: "Professional photograph of Solomon Nwapa",
      targetFile: "public/images/profile/solomon-about.jpg",
    },

    professionalPortrait: {
      src: "/images/profile/solomon-professional.jpg",
      alt: "Solomon Nwapa in a professional setting",
      targetFile: "public/images/profile/solomon-professional.jpg",
    },

    // Optional. Existing generated social artwork remains the fallback.
    socialImage: null,
  },

  capabilities: [
    "Software product development",
    "Enterprise and business software",
    "SaaS products and applications",
    "Digital platforms and marketplaces",
    "Workflow automation",
    "Intelligent software solutions",
  ],

  industries: [
    {
      title: "Enterprise operations",
      text: "Business software for internal processes, reporting, and day-to-day operations.",
    },
    {
      title: "Digital services",
      text: "Digital products that connect business goals with useful user experiences.",
    },
    {
      title: "Platforms and marketplaces",
      text: "Products that help participants discover, transact, or collaborate online.",
    },
    {
      title: "Intelligent operations",
      text: "Workflow automation and intelligent technology applied to defined business tasks.",
    },
  ],

  pages: {
    home: {
      metaTitle: "Solomon Nwapa | Enterprise & Digital Software Developer",
      metaDescription:
        "Solomon Nwapa is an Enterprise & Digital Software Developer and CEO of Cent22 Intelligence, building purposeful software around business needs.",
      eyebrow: identityLine,
      introduction:
        "I build enterprise software, SaaS products, digital platforms, and automation around real business needs.",
      focusLabel: "Areas of focus",
      projectsLabel: "Selected projects",
      projectsTitle: "AdBOSS and NovaSplit.",
      projectsLink: "View all work",
      contactEyebrow: "Business enquiries",
      contactTitle: "Discuss a software opportunity.",
      contactLink: "Contact Solomon",
      aboutLink: "About Solomon",
    },

    about: {
      metaTitle:
        "About Solomon Nwapa | Enterprise & Digital Software Developer",
      metaDescription:
        "Learn about Solomon Nwapa, Enterprise & Digital Software Developer and CEO of Cent22 Intelligence.",
      eyebrow: "Professional biography",
      title: "About Solomon Nwapa",
      summary:
        "Building intelligent software. Solving real business problems. Creating what comes next.",
      profileLabel: "Professional profile",
      visionLabel: "Vision",
      visionHeading: "His broader vision through Cent22 Intelligence",
      contactLink: "Discuss a project",
    },

    work: {
      metaTitle: "Selected Work | Solomon Nwapa",
      metaDescription:
        "Explore AdBOSS and NovaSplit, software products shaped around business needs.",
      eyebrow: "Project index",
      title: "Selected products.",
      summary:
        "A closer look at AdBOSS and NovaSplit, their product focus, and the needs they address.",
    },

    capabilities: {
      metaTitle: "Software Capabilities | Solomon Nwapa",
      metaDescription:
        "Software product development across enterprise applications, SaaS, digital platforms, workflow automation, and intelligent software solutions.",
      eyebrow: "Capabilities",
      title: "Areas of software focus.",
      summary:
        "I build software around business needs, from enterprise applications and SaaS products to digital platforms, workflow automation, and intelligent solutions.",
      contactLink: "Discuss a software need",
    },

    industries: {
      metaTitle: "Industries and Product Interests | Solomon Nwapa",
      metaDescription:
        "Business contexts and product areas Solomon Nwapa is interested in addressing through software.",
      eyebrow: "Industries and product interests",
      title: "Areas of product interest.",
      summary:
        "Business contexts where enterprise software, digital platforms, and intelligent tools can support useful products and better ways of working.",
    },

    insights: {
      metaTitle: "Insights | Solomon Nwapa",
      metaDescription:
        "Writing on software products, business needs, and technology from Solomon Nwapa.",
      eyebrow: "Insights",
      title: "Software, products, and business.",
      summary:
        "Notes on building software products around real business needs.",
      contactLink: "Contact Solomon",
    },

    contact: {
      metaTitle: "Contact Solomon Nwapa | Cent22 Intelligence",
      metaDescription:
        "Business enquiries and collaboration with Solomon Nwapa, CEO of Cent22 Intelligence and Enterprise & Digital Software Developer.",
      eyebrow: "Contact",
      title: "Business enquiries and collaboration.",
      summary:
        "For business enquiries and collaboration related to software projects, digital products, and technology.",
      promptLabel: "Get in touch",
      promptTitle: "Software, products, and collaboration.",
      promptCopy:
        "For business enquiries, software projects, and professional connections.",
    },
  },
};

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
];

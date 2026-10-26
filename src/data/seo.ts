export type PageSeo = {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
};

export type SeoSettings = {
  pages: Record<string, Partial<PageSeo>>;
  defaultOgImage?: string;
  googleVerify?: string;
  bingVerify?: string;
};

export const SEO_PAGES = [
  { key: "home", label: "Home", path: "/" },
  { key: "menu", label: "Our Menu", path: "/menu" },
  { key: "functions", label: "Functions", path: "/functions" },
  { key: "christmas", label: "Christmas", path: "/christmas" },
  { key: "location", label: "Location", path: "/location" },
  { key: "gallery", label: "Gallery", path: "/gallery" },
  { key: "contact", label: "Contact", path: "/contact" },
] as const;

export const DEFAULT_SEO: Record<string, PageSeo> = {
  home: {
    title: "Stix Hellenic Taverna | Greek Kitchen at the Riverview Hotel, Tempe",
    description:
      "Classical Greek cuisine designed for sharing, inside the Riverview Hotel, 900 Princes Hwy Tempe NSW. Charcoal souvla, rotisserie cooking and bold Greek flavour.",
  },
  menu: {
    title: "Our Menu | Stix Hellenic Taverna, Tempe",
    description:
      "Lunch, dinner and drinks at Stix Hellenic Taverna. Charcoal skewers, souvla, fresh seafood, share-style starters and Greek wines at the Riverview Hotel, Tempe.",
  },
  functions: {
    title: "Functions and Group Bookings | Stix Hellenic Taverna, Tempe",
    description:
      "Birthdays, work parties, long lunches and big family tables. Send a function enquiry and the Stix events team will help plan the food, drinks and timing.",
  },
  christmas: {
    title: "Christmas Parties | Stix Hellenic Taverna, Tempe",
    description:
      "Book your work Christmas party or end-of-year celebration at Stix Hellenic Taverna. Set menus, drinks packages and share-style Greek feasts for groups.",
  },
  location: {
    title: "Find Us | Stix Hellenic Taverna, Riverview Hotel Tempe",
    description:
      "Stix Hellenic Taverna is inside the Riverview Hotel at 900 Princes Hwy, Tempe NSW. Opening hours, parking and directions.",
  },
  gallery: {
    title: "Gallery | Stix Hellenic Taverna, Tempe",
    description:
      "Charcoal souvla, packed dining rooms and Greek hospitality. A look inside Stix Hellenic Taverna at the Riverview Hotel, Tempe.",
  },
  contact: {
    title: "Contact Us | Stix Hellenic Taverna, Tempe",
    description:
      "Get in touch with Stix Hellenic Taverna at the Riverview Hotel, 900 Princes Hwy Tempe. Call (02) 8080 7072 or send us a message.",
  },
};

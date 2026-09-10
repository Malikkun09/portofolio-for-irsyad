export type Project = {
  slug: string;
  title: string;
  services: string[];
  year: string;
  image: string;
  poster: string;
  summary: string;
};

export type Chapter = {
  title: string;
  role: string;
  body: string;
  image: string;
};

export const site = {
  name: "teman",
  title: "teman — artist-led creative practice",
  description:
    "I am an artist-led creative developer. Direction, digital, and immersive work.",
  email: "hello@teman.studio",
  year: "Since 2022",
  regions: ["ID", "SG", "NL"],
  hero: {
    line1: "I am an",
    line2: "artist — led",
    line3: "Creative",
    words: ["DEVELOPER", "DESIGNER", "DIRECTOR"],
  },
  about: {
    index: "1",
    label: "About",
    heading: "I craft work that feels inevitable once you see it.",
    body: "Driven by curiosity, not formula. I work where image, interface, and atmosphere meet — across brand, film, digital spaces, and whatever the brief asks for next.",
  },
  services: {
    index: "2",
    label: "What I Do",
    items: [
      {
        no: "01",
        sub: "2.1",
        name: "Direction",
        list: ["Art Direction", "Design Concept", "Motion & CGI", "Brand Identity"],
      },
      {
        no: "02",
        sub: "2.2",
        name: "Digital",
        list: ["Web Experience", "Interface Design", "Asset Production"],
      },
      {
        no: "03",
        sub: "2.3",
        name: "Offline",
        list: ["Immersive Event", "Interactive Art", "OOH / Spatial", "Print"],
      },
    ],
  },
  work: {
    index: "3",
    label: "Featured work",
    projects: [
      {
        slug: "afterglow-engine",
        title: "Afterglow Engine",
        services: ["Creative Direction", "Art Direction", "CGI Production"],
        year: "2025",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80",
        poster:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=70",
        summary:
          "A launch film and digital system for a nocturnal product drop — light as material, not decoration.",
      },
      {
        slug: "night-market-atlas",
        title: "Night Market Atlas",
        services: ["Visual Direction", "Web Experience", "On-site"],
        year: "2025",
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80",
        poster:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=70",
        summary:
          "An interactive map of a city after dark. Sound, type, and heat as wayfinding.",
      },
      {
        slug: "salt-and-signal",
        title: "Salt & Signal",
        services: ["Art Direction", "Concept CGI", "Brand Identity"],
        year: "2024",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
        poster:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=70",
        summary:
          "Identity and moving image for a coastal fragrance house. Mineral, slow, precise.",
      },
      {
        slug: "oracle-room",
        title: "Oracle Room",
        services: ["Direction", "Production", "Photography"],
        year: "2024",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80",
        poster:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=70",
        summary:
          "A dining room staged as a film set. Every course a lighting cue.",
      },
      {
        slug: "tideform",
        title: "Tideform",
        services: ["Experiential", "Motion Design", "Lighting Direction"],
        year: "2024",
        image:
          "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1800&q=80",
        poster:
          "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=400&q=70",
        summary:
          "An installation of slow tides in a glass atrium. Visitors become the weather.",
      },
      {
        slug: "glass-harbor",
        title: "Glass Harbor",
        services: ["Art Direction", "Creative Direction", "CGI Art"],
        year: "2023",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
        poster:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=70",
        summary:
          "Campaign architecture for a tower that never quite stays the same colour.",
      },
    ] satisfies Project[],
  },
  practice: {
    index: "4",
    label: "The practice",
    intertitle: "Driven by\nCreative Curiosity",
    chapters: [
      {
        title: "Origin",
        role: "Jakarta",
        body: "It started as a late-night practice: type, light, and code in the same file. That restlessness is still the method.",
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Craft",
        role: "Studio",
        body: "I treat the site like a film: pacing first, then picture, then the line of type that makes it land.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Cities",
        role: "Anywhere",
        body: "Good work does not stay in one place — and neither do I. The brief decides the city.",
        image:
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Now",
        role: "Practice",
        body: "A small studio with a long attention span. Independent, artist-led, still curious.",
        image:
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80",
      },
    ] satisfies Chapter[],
  },
  clients: {
    index: "5",
    label: "They trust me",
    body: "From independent houses to larger teams, I have been fortunate to work across a diversity of briefs and temperatures.",
    names: [
      "Halcyon",
      "Nori",
      "Kite",
      "Paloma",
      "Sable",
      "Aer",
      "Fold",
      "Indigo",
      "North & Co",
      "Lumen",
      "Atelier Q",
    ],
  },
  awards: {
    index: "6",
    label: "Awards",
    items: [
      {
        year: "2025",
        title: "Site Invitational",
        org: "Independent Annual",
        note: "Afterglow Engine",
      },
      {
        year: "2025",
        title: "Motion Honors",
        org: "Craft Circle",
        note: "Tideform",
      },
      {
        year: "2024",
        title: "Digital Craft",
        org: "Studio Press",
        note: "Night Market Atlas",
      },
      {
        year: "2024",
        title: "Identity",
        org: "Type & Form",
        note: "Salt & Signal",
      },
      {
        year: "2023",
        title: "New Practice",
        org: "South Review",
        note: "teman",
      },
    ],
  },
  press: {
    index: "7",
    label: "I am on",
    items: [
      { name: "Arcade Daily", href: "#" },
      { name: "Salt Review", href: "#" },
      { name: "Evening Type", href: "#" },
      { name: "Room 08", href: "#" },
      { name: "South of Cloud", href: "#" },
    ],
  },
  contact: {
    heading: "Let’s make something that lingers.",
    studios: [
      {
        city: "Jakarta",
        address: "South Jakarta, Indonesia",
        phone: "+62 812 0000 0000",
      },
      {
        city: "Singapore",
        address: "By appointment",
        phone: "+65 8000 0000",
      },
      {
        city: "Remote",
        address: "Europe & Asia",
        phone: "hello@teman.studio",
      },
    ],
    socials: [
      { name: "Instagram", href: "#" },
      { name: "Are.na", href: "#" },
      { name: "LinkedIn", href: "#" },
    ],
  },
  menu: [
    { label: "Index", href: "/#hero" },
    { label: "Work", href: "/work" },
    { label: "Practice", href: "/#practice" },
    { label: "Contact", href: "/#contact" },
  ],
  navSections: [
    { id: "about", label: "About" },
    { id: "what", label: "What I Do" },
    { id: "work", label: "Featured work" },
    { id: "practice", label: "The practice" },
    { id: "clients", label: "They trust me" },
    { id: "awards", label: "Awards" },
    { id: "press", label: "I am on" },
  ],
} as const;

export type SectionId =
  | "hero"
  | "about"
  | "what"
  | "work"
  | "practice"
  | "clients"
  | "awards"
  | "press"
  | "contact";

export const sectionPalette: Record<
  SectionId,
  { mode: "dark" | "light"; bg: string; lights: boolean }
> = {
  hero: { mode: "dark", bg: "#051236", lights: true },
  about: { mode: "dark", bg: "#051236", lights: true },
  what: { mode: "dark", bg: "#051236", lights: true },
  work: { mode: "light", bg: "#fffde2", lights: false },
  practice: { mode: "dark", bg: "#051236", lights: true },
  clients: { mode: "dark", bg: "#051236", lights: true },
  awards: { mode: "light", bg: "#d2e4f4", lights: false },
  press: { mode: "dark", bg: "#051236", lights: true },
  contact: { mode: "dark", bg: "#051236", lights: true },
};

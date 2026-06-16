import { WORKSHOP_FEE, COMPETITION_FEE, TEAM_SIZE } from "@/lib/constants";

export const WORKSHOP_TRACK_DETAILS = [
  {
    name: "Direction",
    blurb: "Shot-calling, blocking actors, and turning a script into a sequence.",
    color: "coral",
  },
  {
    name: "Acting",
    blurb: "Camera presence, scene work, and finding truth in performance.",
    color: "sun",
  },
  {
    name: "Photography",
    blurb: "Light, composition, and telling a story in a single frame.",
    color: "teal",
  },
  {
    name: "Videography",
    blurb: "Camera movement, coverage, and shooting for the edit.",
    color: "indigo",
  },
  {
    name: "Modeling",
    blurb: "Posing, expression, and working confidently in front of a lens.",
    color: "coral",
  },
] as const;

export const SCHEDULE = {
  day1: {
    label: "Day 01",
    title: "The Workshop",
    description:
      "Five hands-on tracks led by working film professionals. Pick one track and spend the day building real, camera-ready skills.",
    fee: WORKSHOP_FEE,
    feeNote: "per student",
  },
  day2: {
    label: "Day 02",
    title: "The Reel Competition",
    description:
      "Put what you learned to work. Teams of four write, shoot, and edit a short reel on the spot — judged for a cash prize.",
    fee: COMPETITION_FEE,
    feeNote: `per team of ${TEAM_SIZE}`,
  },
} as const;

export const PRIZE_POOL = {
  total: "₹25,000",
  breakdown: [
    { place: "1st Place", amount: "₹12,000" },
    { place: "2nd Place", amount: "₹8,000" },
    { place: "3rd Place", amount: "₹5,000" },
  ],
} as const;

export const FAQS = [
  {
    question: "Do I need to register before attending?",
    answer:
      "Yes. Workshop seats are limited per college, so register and complete payment in advance to confirm your spot.",
  },
  {
    question: "Can I join the reel competition without attending the workshop?",
    answer:
      "Teams are welcome either way, but the workshop is where you'll meet collaborators and pick up techniques the judges look for.",
  },
  {
    question: "How do I register my team for the reel competition?",
    answer:
      "Create a student account, then log in — the reel competition registration form appears on your dashboard once you're signed in.",
  },
  {
    question: "Is the ₹499 competition fee per person or per team?",
    answer: "It's a single payment of ₹499 for the entire 4-member team.",
  },
] as const;

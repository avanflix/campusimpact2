/**
 * Shared, framework-agnostic constants used by both the
 * Mongoose models (server) and client components.
 * Keeping these here avoids bundling mongoose into client code.
 */

export const WORKSHOP_TRACKS = [
  "Direction",
  "Acting",
  "Photography",
  "Videography",
  "Modeling",
] as const;

export type WorkshopTrack = (typeof WORKSHOP_TRACKS)[number];

export const WORKSHOP_FEE = 299;

export const COMPETITION_FEE = 499;

export const TEAM_SIZE = 4;

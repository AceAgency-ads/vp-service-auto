import type { MetadataRoute } from "next";

/* Web App Manifest — Next.js 16 metadata route.
   Iconițele și theme-color sunt în temă LED (coal-950 fundal, roșu accent). */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VP Service Auto",
    short_name: "VP Service Auto",
    description: "Constatare daune RCA/CASCO și service auto în București.",
    lang: "ro",
    display: "standalone",
    start_url: "/",
    background_color: "#0b0d0e",
    theme_color: "#e30613",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

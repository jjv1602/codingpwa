import type { NextConfig } from "next";
import nextPwa from "@ducanh2912/next-pwa";

// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
// });

// const withPWAFactory = require("@ducanh2912/next-pwa").default;


const withPWAConfig = nextPwa({
  dest: "public",
});


const nextConfig: NextConfig = {
  /* config options here */
};


export default withPWAConfig(nextConfig);
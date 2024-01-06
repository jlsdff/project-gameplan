"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FadeIn({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, duration: 300 }}>
      {children}
    </motion.div>
  );
}

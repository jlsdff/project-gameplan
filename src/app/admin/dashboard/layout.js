import { Providers } from "@/providers/provider";
import { Inter } from "next/font/google";
import TopNav from "@/components/admin/navigation/nav"

export default function RootLayout({ children }) {
  return <section><TopNav/>{children}</section>;
}

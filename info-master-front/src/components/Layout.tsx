import type { ReactNode } from "react";
import Header from "./Header";
import "./Layout.css";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">{children}</main>
    </div>
  );
}

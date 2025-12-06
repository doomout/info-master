import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}

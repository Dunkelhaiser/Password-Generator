/* eslint-disable @typescript-eslint/no-non-null-assertion */
export {};

const theme = localStorage.getItem("theme") || "light";
document.querySelector("body")!.id = theme;
document.querySelector('meta[name="theme-color"]')!.setAttribute("content", theme === "light" ? "#e7e7e7" : "#1a1c22");

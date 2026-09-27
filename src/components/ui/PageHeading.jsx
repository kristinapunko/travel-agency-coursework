import { createElement, useEffect } from "react";

export default function PageHeading({ title }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Travel Agency`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return createElement("h1", { className: "page-heading" }, title);
}
"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var socialLinks = [
    {
        name: "Facebook",
        href: "https://facebook.com/gharvestchurch/",
        icon: (React.createElement("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true" },
            React.createElement("path", { d: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.956.93-1.956 1.885v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.1 24 12.073Z" })))
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/gharvestchurch/",
        icon: (React.createElement("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: "1.8", viewBox: "0 0 24 24", "aria-hidden": "true" },
            React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }),
            React.createElement("circle", { cx: "12", cy: "12", r: "4" }),
            React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1", fill: "currentColor", stroke: "none" })))
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/@gharvestchurch",
        icon: (React.createElement("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true" },
            React.createElement("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" })))
    },
];
function Footer() {
    var _a = react_1.useState(2026), year = _a[0], setYear = _a[1];
    react_1.useEffect(function () {
        setYear(new Date().getFullYear());
    }, []);
    return (React.createElement("footer", { className: "relative z-10 w-full border-t border-slate-200/70 bg-white/70" },
        React.createElement("div", { className: "mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-7 lg:px-10" },
            React.createElement("div", { className: "flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-6" },
                React.createElement("p", { className: "order-2 text-center text-xs leading-6 text-slate-500 sm:order-1 sm:text-left sm:text-sm" },
                    "\u00A9 ",
                    year,
                    " Global Harvest Church.",
                    React.createElement("span", { className: "block sm:ml-1 sm:inline" }, "All rights reserved.")),
                React.createElement("nav", { "aria-label": "Follow Global Harvest Church", className: "order-1 sm:order-2" },
                    React.createElement("ul", { className: "flex items-center justify-center gap-3" }, socialLinks.map(function (item) { return (React.createElement("li", { key: item.name },
                        React.createElement(link_1["default"], { href: item.href, "aria-label": item.name, target: "_blank", rel: "noopener noreferrer", className: "flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:bg-[#00A3E0]/10 hover:text-[#007FAF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2" },
                            item.icon,
                            React.createElement("span", { className: "sr-only" }, item.name)))); })))))));
}
exports["default"] = Footer;

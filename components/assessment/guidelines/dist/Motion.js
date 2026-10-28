"use client";
"use strict";
exports.__esModule = true;
exports.GuidelinesMotion = void 0;
var framer_motion_1 = require("framer-motion");
exports.GuidelinesMotion = function (_a) {
    var id = _a.id, children = _a.children, className = _a.className;
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    return (React.createElement(framer_motion_1.motion.article, { id: id, initial: shouldReduceMotion
            ? false
            : { opacity: 0, y: 24, scale: 0.985 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, amount: 0.12, margin: "0px 0px -40px 0px" }, transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1]
        }, whileHover: shouldReduceMotion
            ? undefined
            : {
                y: -3,
                transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                }
            }, className: className }, children));
};

"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Home = void 0;
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var contact_dialog_1 = require("@/dialogs/contact-dialog");
var DESKTOP_FRAMES = [
    {
        right: "0%",
        top: "0%",
        width: "90%",
        rotate: -3,
        zIndex: 1
    },
    {
        right: "15%",
        top: "10%",
        width: "90%",
        rotate: 2,
        zIndex: 2
    },
    {
        right: "30%",
        top: "20%",
        width: "90%",
        rotate: -1,
        zIndex: 3
    },
    {
        right: "5%",
        top: "30%",
        width: "85%",
        rotate: 3,
        zIndex: 4
    },
    {
        right: "25%",
        top: "5%",
        width: "85%",
        rotate: -2,
        zIndex: 5
    },
    {
        right: "40%",
        top: "15%",
        width: "85%",
        rotate: 1,
        zIndex: 6
    },
];
var MOBILE_FRAMES = [
    { rotate: -3, zIndex: 1 },
    { rotate: 2, zIndex: 2 },
    { rotate: -1, zIndex: 3 },
];
function getCollection(collections, index) {
    if (!collections.length)
        return undefined;
    return collections[((index % collections.length) + collections.length) % collections.length];
}
exports.Home = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var config = _a.config;
    var collections = (_b = config.featuredCollections) !== null && _b !== void 0 ? _b : [];
    var _j = react_1.useState(0), activeIndex = _j[0], setActiveIndex = _j[1];
    var _k = react_1.useState(false), isPaused = _k[0], setIsPaused = _k[1];
    var shouldReduceMotion = framer_motion_1.useReducedMotion();
    var count = collections.length;
    var activeCollection = getCollection(collections, activeIndex);
    var goToNext = react_1.useCallback(function () {
        if (count < 2)
            return;
        setActiveIndex(function (current) { return (current + 1) % count; });
    }, [count]);
    var goToPrevious = react_1.useCallback(function () {
        if (count < 2)
            return;
        setActiveIndex(function (current) { return (current - 1 + count) % count; });
    }, [count]);
    var goToSlide = react_1.useCallback(function (index) {
        if (index >= 0 && index < count) {
            setActiveIndex(index);
        }
    }, [count]);
    react_1.useEffect(function () {
        if (shouldReduceMotion || count < 2)
            return;
        var interval = window.setInterval(function () {
            setActiveIndex(function (current) { return (current + 1) % count; });
        }, 3000);
        return function () { return window.clearInterval(interval); };
    }, [count, shouldReduceMotion]);
    if (!activeCollection || count === 0)
        return null;
    var transition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.65, ease: [0.22, 1, 0.36, 1] };
    var desktopImages = DESKTOP_FRAMES.map(function (_, index) {
        return getCollection(collections, activeIndex + index);
    });
    var mobileImages = MOBILE_FRAMES.map(function (_, index) {
        return getCollection(collections, activeIndex + index);
    });
    var primaryLabel = (_e = (_d = (_c = config.hero) === null || _c === void 0 ? void 0 : _c.cta) === null || _d === void 0 ? void 0 : _d.primary) !== null && _e !== void 0 ? _e : "Login";
    var secondaryLabel = (_h = (_g = (_f = config.hero) === null || _f === void 0 ? void 0 : _f.cta) === null || _g === void 0 ? void 0 : _g.secondary) !== null && _h !== void 0 ? _h : "Contact Media Leadership";
    return (React.createElement("div", { className: "relative flex min-h-screen flex-col overflow-hidden" },
        React.createElement("div", { "aria-hidden": "true", className: "pointer-events-none fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" }),
        React.createElement("main", { className: "relative z-10 flex flex-1 items-center py-8 md:py-12", onMouseEnter: function () { return setIsPaused(true); }, onMouseLeave: function () { return setIsPaused(false); }, onFocusCapture: function () { return setIsPaused(true); }, onBlurCapture: function (event) {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsPaused(false);
                }
            } },
            React.createElement("div", { className: "container mx-auto px-4" },
                React.createElement("div", { className: "mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12" },
                    React.createElement("div", { className: "relative flex h-[45vh] min-h-[290px] items-center justify-center md:hidden" },
                        React.createElement("div", { className: "relative h-[35vh] max-h-[380px] min-h-[230px] w-full max-w-[400px]" },
                            mobileImages.map(function (collection, index) {
                                if (!collection)
                                    return null;
                                var frame = MOBILE_FRAMES[index];
                                return (React.createElement(framer_motion_1.motion.div, { key: "mobile-" + index + "-" + collection.id, initial: shouldReduceMotion
                                        ? false
                                        : { opacity: 0, scale: 0.97 }, animate: {
                                        opacity: 1,
                                        scale: 1,
                                        rotate: frame.rotate
                                    }, transition: __assign(__assign({}, transition), { delay: shouldReduceMotion ? 0 : index * 0.06 }), whileHover: shouldReduceMotion
                                        ? undefined
                                        : { scale: 1.02 }, style: { zIndex: frame.zIndex }, className: "absolute inset-0 aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-50 to-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300" },
                                    React.createElement("div", { className: "relative h-full w-full overflow-hidden rounded-xl" },
                                        React.createElement(image_1["default"], { src: collection.image, alt: collection.title, fill: true, sizes: "(max-width: 767px) 90vw, 400px", className: "object-cover", priority: index === 0 }))));
                            }),
                            React.createElement(framer_motion_1.motion.span, { "aria-hidden": "true", animate: shouldReduceMotion
                                    ? undefined
                                    : { y: [0, -5, 0], rotate: [0, 6, 0] }, transition: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }, className: "absolute -left-1 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300 text-lg shadow-sm" }, "\u2733"),
                            React.createElement(framer_motion_1.motion.span, { "aria-hidden": "true", animate: shouldReduceMotion
                                    ? undefined
                                    : { y: [0, 5, 0], rotate: [0, -6, 0] }, transition: {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }, className: "absolute -right-1 bottom-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-sky-200 text-base shadow-sm" }, "\u2726"))),
                    React.createElement("div", { className: "relative hidden h-[600px] items-center md:flex" },
                        desktopImages.map(function (collection, index) {
                            if (!collection)
                                return null;
                            var frame = DESKTOP_FRAMES[index];
                            return (React.createElement(framer_motion_1.motion.div, { key: "desktop-" + index + "-" + collection.id, initial: shouldReduceMotion
                                    ? false
                                    : { opacity: 0, scale: 0.97 }, animate: {
                                    opacity: 1,
                                    scale: 1,
                                    rotate: frame.rotate
                                }, transition: __assign(__assign({}, transition), { delay: shouldReduceMotion ? 0 : index * 0.055 }), whileHover: shouldReduceMotion
                                    ? undefined
                                    : { scale: 1.02 }, style: {
                                    right: frame.right,
                                    top: frame.top,
                                    width: frame.width,
                                    zIndex: frame.zIndex
                                }, className: "absolute aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300" },
                                React.createElement("div", { className: "relative h-full w-full overflow-hidden rounded-xl" },
                                    React.createElement(image_1["default"], { src: collection.image, alt: collection.title, fill: true, sizes: "(min-width: 768px) 550px, 90vw", className: "object-cover", priority: index === 0 }))));
                        }),
                        React.createElement(framer_motion_1.motion.span, { "aria-hidden": "true", animate: shouldReduceMotion
                                ? undefined
                                : { y: [0, -5, 0], rotate: [0, 6, 0] }, transition: {
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }, className: "absolute left-[2%] top-[8%] z-[7] flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300 text-lg shadow-sm" }, "\u2733"),
                        React.createElement(framer_motion_1.motion.span, { "aria-hidden": "true", animate: shouldReduceMotion
                                ? undefined
                                : { y: [0, 5, 0], rotate: [0, -6, 0] }, transition: {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }, className: "absolute bottom-[7%] right-[4%] z-[7] flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-sky-200 text-lg shadow-sm" }, "\u2726")),
                    React.createElement("div", { className: "relative z-20 mt-2 flex flex-col justify-center md:mt-0" },
                        React.createElement("div", { className: "mb-5 flex flex-wrap items-center gap-3" },
                            React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-700 shadow-sm sm:text-sm" },
                                React.createElement("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }),
                                "Media Team Assessment Portal"),
                            React.createElement("span", { "aria-hidden": "true", className: "text-sm text-slate-400" }, "\u2726")),
                        React.createElement("h1", { className: "max-w-2xl text-[2.45rem] font-bold leading-[.98] tracking-[-0.035em] text-slate-950 sm:text-5xl xl:text-[3.7rem]" },
                            "Excellence in Every Frame.",
                            React.createElement("span", { className: "relative mt-1 block w-fit" },
                                React.createElement("span", { className: "relative z-10" }, "Purpose in Every Story."),
                                React.createElement("span", { "aria-hidden": "true", className: "absolute bottom-0 left-0 -z-0 h-2 w-[78%] rounded-full bg-amber-300/80 sm:h-3" }))),
                        React.createElement(framer_motion_1.AnimatePresence, { mode: "wait" },
                            React.createElement(framer_motion_1.motion.div, { key: "details-" + activeCollection.id, initial: shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: shouldReduceMotion
                                    ? { opacity: 1 }
                                    : { opacity: 0, y: -6 }, transition: { duration: 0.3 }, className: "mt-7 border-l-2 border-amber-300 pl-4 sm:mt-8 sm:pl-5" },
                                React.createElement("div", { className: "mb-2 flex items-center gap-2" },
                                    React.createElement("span", { className: "h-px w-8 bg-slate-200" })),
                                React.createElement("h2", { className: "text-xl font-bold tracking-tight text-slate-900 sm:text-2xl" }, activeCollection.title),
                                React.createElement("p", { className: "mt-2 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7" }, activeCollection.description),
                                React.createElement(link_1["default"], { href: activeCollection.link, className: "mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition-colors hover:text-amber-700" },
                                    "Explore",
                                    React.createElement(lucide_react_1.ArrowUpRight, { className: "h-4 w-4" })))),
                        React.createElement("div", { className: "mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center" },
                            React.createElement(link_1["default"], { href: "/login", className: "group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#0C2340] bg-[#0C2340] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-[#0C2340]/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan hover:bg-brand-cyan hover:shadow-lg hover:shadow-brand-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 sm:w-auto sm:min-w-[150px] sm:px-7" },
                                primaryLabel,
                                React.createElement(lucide_react_1.ArrowUpRight, { className: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })),
                            React.createElement(contact_dialog_1["default"], { onSubmit: function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                    var response;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, fetch("/api/contact", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(data)
                                                })];
                                            case 1:
                                                response = _a.sent();
                                                if (!response.ok) {
                                                    throw new Error("Unable to send your message.");
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); } })),
                        React.createElement("div", { className: "mt-6 flex items-center gap-3 text-xs text-slate-500 sm:text-sm" },
                            React.createElement("span", { "aria-hidden": "true", className: "flex -space-x-2" },
                                React.createElement("span", { className: "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-amber-200 text-[10px] font-bold text-slate-800" }, "M"),
                                React.createElement("span", { className: "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-sky-200 text-[10px] font-bold text-slate-800" }, "C"),
                                React.createElement("span", { className: "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-200 text-[10px] font-bold text-slate-800" }, "T")),
                            React.createElement("span", null, "One team. Every detail. A better service.")))))),
        React.createElement("div", { className: "relative z-10" })));
};

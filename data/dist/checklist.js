"use strict";
exports.__esModule = true;
exports.formatServiceDate = exports.getServiceName = exports.getEffectiveServiceType = exports.getScheduledWednesdayService = exports.initialChecklistRecords = exports.serviceFilterOptions = exports.services = void 0;
exports.services = [
    {
        id: "BUSINESS",
        name: "Sunday Business Service",
        schedule: "Every Sunday · 8:00 AM",
        description: "Review preparation, equipment readiness, and operational checks for the Business Service."
    },
    {
        id: "CELEBRATION",
        name: "Sunday Celebration Service",
        schedule: "Every Sunday · 10:00 AM",
        description: "Monitor checklist completion and consistency across the Celebration Service's media production requirements."
    },
    {
        id: "MC_LIVE",
        name: "Wednesday Media Service (MC Live)",
        schedule: "Wednesdays · 6:00 PM",
        description: "Review records for the regular Wednesday MC Live service."
    },
    {
        id: "WOW",
        name: "Worship on Wednesday (WOW)",
        schedule: "Last Wednesday of each month",
        description: "Review the special monthly Wednesday service that replaces the regular MC Live service."
    },
];
exports.serviceFilterOptions = [
    { value: "ALL", label: "All Services" },
    { value: "BUSINESS", label: "Business Service" },
    { value: "CELEBRATION", label: "Celebration Service" },
    { value: "MC_LIVE", label: "MC Live" },
    { value: "WOW", label: "WOW" },
];
exports.initialChecklistRecords = [];
/**
 * Returns the scheduled Wednesday service for a date.
 *
 * The last Wednesday of each month is WOW.
 * Other Wednesdays are MC Live.
 */
function getScheduledWednesdayService(dateValue) {
    if (!dateValue)
        return null;
    var date = new Date(dateValue + "T12:00:00");
    if (Number.isNaN(date.getTime()) || date.getDay() !== 3) {
        return null;
    }
    var nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
    return nextWeek.getMonth() !== date.getMonth()
        ? "WOW"
        : "MC_LIVE";
}
exports.getScheduledWednesdayService = getScheduledWednesdayService;
/**
 * Derives the effective service type for a Wednesday record
 * from its service date. Non-Wednesday services retain their
 * recorded service type.
 */
function getEffectiveServiceType(record) {
    var scheduledWednesday = getScheduledWednesdayService(record.serviceDate);
    if (scheduledWednesday &&
        (record.serviceType === "MC_LIVE" ||
            record.serviceType === "WOW")) {
        return scheduledWednesday;
    }
    return record.serviceType;
}
exports.getEffectiveServiceType = getEffectiveServiceType;
function getServiceName(serviceType) {
    var _a, _b;
    return ((_b = (_a = exports.services.find(function (service) { return service.id === serviceType; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Unknown Service");
}
exports.getServiceName = getServiceName;
function formatServiceDate(dateValue) {
    if (!dateValue)
        return "Date unavailable";
    var date = new Date(dateValue + "T12:00:00");
    if (Number.isNaN(date.getTime()))
        return dateValue;
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(date);
}
exports.formatServiceDate = formatServiceDate;

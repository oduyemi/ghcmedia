"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
function isRealDateKey(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
        return false;
    var _a = value.split("-").map(Number), year = _a[0], month = _a[1], day = _a[2];
    var date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
var serviceOccurrenceSchema = new mongoose_1.Schema({
    serviceType: {
        type: String,
        "enum": ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW", "SPECIAL_PROGRAMME"],
        required: true,
        index: true
    },
    serviceDateKey: {
        type: String,
        required: true,
        validate: {
            validator: isRealDateKey,
            message: "serviceDateKey must be a real date in YYYY-MM-DD format."
        },
        index: true
    },
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
        "default": null
    },
    status: {
        type: String,
        "enum": ["SCHEDULED", "COMPLETED", "CANCELLED"],
        "default": "SCHEDULED",
        required: true,
        index: true
    },
    specialProgrammeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SpecialProgramme",
        "default": null
    },
    title: {
        type: String,
        trim: true,
        "default": null,
        maxlength: 200
    },
    notes: {
        type: String,
        trim: true,
        "default": null,
        maxlength: 3000
    },
    assignedReporterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        "default": null,
        index: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });
serviceOccurrenceSchema.pre("validate", function () {
    if (this.endsAt && this.startsAt && this.endsAt < this.startsAt)
        this.invalidate("endsAt", "Occurrence end time cannot precede its start time.");
    if (this.serviceType === "SPECIAL_PROGRAMME" && !this.specialProgrammeId)
        this.invalidate("specialProgrammeId", "Special-programme occurrences must reference a special programme.");
    if (this.serviceType !== "SPECIAL_PROGRAMME" && this.specialProgrammeId)
        this.invalidate("specialProgrammeId", "Only special-programme occurrences may reference a special programme.");
});
var regularServiceTypes = ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW"];
for (var _i = 0, regularServiceTypes_1 = regularServiceTypes; _i < regularServiceTypes_1.length; _i++) {
    var serviceType = regularServiceTypes_1[_i];
    serviceOccurrenceSchema.index({ serviceDateKey: 1 }, {
        unique: true,
        partialFilterExpression: { serviceType: serviceType },
        name: "unique_" + serviceType.toLowerCase() + "_occurrence_per_day"
    });
}
serviceOccurrenceSchema.index({ status: 1, startsAt: 1 });
serviceOccurrenceSchema.index({ specialProgrammeId: 1, startsAt: 1 });
var ServiceOccurrence = mongoose_1["default"].models.ServiceOccurrence || mongoose_1["default"].model("ServiceOccurrence", serviceOccurrenceSchema);
exports["default"] = ServiceOccurrence;

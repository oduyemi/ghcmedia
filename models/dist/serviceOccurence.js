"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var serviceOccurrenceSchema = new mongoose_1.Schema({
    serviceType: {
        type: String,
        "enum": [
            "BUSINESS",
            "CELEBRATION",
            "MC_LIVE",
            "WOW",
            "SPECIAL_PROGRAMME",
        ],
        required: true,
        index: true
    },
    // Local church date in YYYY-MM-DD format.
    serviceDateKey: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/,
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
        "default": null
    },
    notes: {
        type: String,
        trim: true,
        "default": null
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });
// One occurrence of each regular service per local date.
// Special programmes may have multiple occurrences on the same date.
serviceOccurrenceSchema.index({ serviceType: 1, serviceDateKey: 1 }, {
    unique: true,
    partialFilterExpression: {
        serviceType: {
            $in: ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW"]
        }
    }
});
var ServiceOccurrence = mongoose_1["default"].models.ServiceOccurrence ||
    mongoose_1["default"].model("ServiceOccurrence", serviceOccurrenceSchema);
exports["default"] = ServiceOccurrence;

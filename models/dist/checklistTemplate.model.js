"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var checklistTemplateItemSchema = new mongoose_1.Schema({
    itemId: { type: String, required: true, trim: true, minlength: 1 },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    requirement: { type: String, trim: true, "default": "", maxlength: 2000 },
    required: { type: Boolean, "default": true, required: true },
    sortOrder: { type: Number, "default": 0, min: 0, validate: Number.isInteger, required: true }
}, { _id: false });
var checklistTemplateSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, trim: true, "default": "", maxlength: 2000 },
    serviceTypes: {
        type: [{ type: String, "enum": ["BUSINESS", "CELEBRATION", "MC_LIVE", "WOW", "SPECIAL_PROGRAMME"] }],
        required: true,
        validate: [function (values) { return values.length > 0; }, "Select at least one applicable service type."]
    },
    version: { type: Number, required: true, min: 1, validate: Number.isInteger },
    status: { type: String, "enum": ["DRAFT", "ACTIVE", "ARCHIVED"], "default": "DRAFT", required: true, index: true },
    items: {
        type: [checklistTemplateItemSchema], "default": [],
        validate: [function (items) { return items.length > 0; }, "A checklist template must contain at least one item."]
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
checklistTemplateSchema.index({ name: 1, version: 1 }, { unique: true, name: "unique_checklist_template_version" });
checklistTemplateSchema.pre("validate", function () {
    if (new Set(this.serviceTypes).size !== this.serviceTypes.length)
        this.invalidate("serviceTypes", "Service types must not contain duplicates.");
    var ids = this.items.map(function (item) { return item.itemId.trim(); });
    if (new Set(ids).size !== ids.length)
        this.invalidate("items", "Checklist item IDs must be unique within a template version.");
});
var ChecklistTemplate = mongoose_1["default"].models.ChecklistTemplate || mongoose_1["default"].model("ChecklistTemplate", checklistTemplateSchema);
exports["default"] = ChecklistTemplate;

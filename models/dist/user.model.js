"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 254,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please use a valid email address",
        ]
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        "enum": ["member", "admin"],
        "default": "member",
        required: true
    },
    image: {
        type: String,
        "default": null,
        trim: true
    },
    imagePublicId: {
        type: String,
        "default": null,
        trim: true
    },
    sessionVersion: {
        type: Number,
        "default": 0,
        min: 0,
        required: true
    },
    firstLogin: {
        type: Boolean,
        "default": true,
        required: true
    },
    lastLogin: {
        type: Date,
        "default": null
    },
    setupTokenHash: {
        type: String,
        "default": null,
        select: false
    },
    setupTokenExpiresAt: {
        type: Date,
        "default": null,
        select: false
    }
}, {
    timestamps: true,
    versionKey: false
});
userSchema.index({ email: 1 }, { unique: true, name: "unique_user_email" });
var User = mongoose_1["default"].models.User ||
    mongoose_1["default"].model("User", userSchema);
exports["default"] = User;

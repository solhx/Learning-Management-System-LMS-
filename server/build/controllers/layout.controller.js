"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayoutByType = exports.editLayout = exports.createLayout = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catshAsyncError_1 = require("../middleware/catshAsyncError");
const layout_model_1 = __importDefault(require("../models/layout.model"));
const cloudinary_1 = __importDefault(require("cloudinary"));
// create layout 
exports.createLayout = (0, catshAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeExist = await layout_model_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} layout already exists`, 400));
        }
        if (type === "Banner") {
            const { image, badge, title, subtitle, description, primaryButton, secondaryButton, stats } = req.body;
            let imageData = { public_id: "", url: "" };
            if (image) {
                const mycloud = await cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "layout",
                });
                imageData = {
                    public_id: mycloud.public_id,
                    url: mycloud.secure_url,
                };
            }
            const banner = {
                type: "Banner",
                banner: {
                    image: imageData,
                    badge: badge || "🎓 Join 50,000+ learners worldwide",
                    title: title || "Transform Your",
                    subtitle: subtitle || "Learning Journey",
                    description: description || "Unlock your potential with cutting-edge courses, expert instructors, and a community of passionate learners. Start learning today.",
                    primaryButton: primaryButton || "Start Learning Free",
                    secondaryButton: secondaryButton || "Watch Demo",
                    stats: stats || [
                        { icon: 'Users', label: 'Active Students', value: '50K+', color: 'blue' },
                        { icon: 'BookOpen', label: 'Courses', value: '500+', color: 'purple' },
                        { icon: 'Award', label: 'Certificates', value: '30K+', color: 'indigo' },
                        { icon: 'TrendingUp', label: 'Success Rate', value: '95%', color: 'pink' },
                    ],
                }
            };
            await layout_model_1.default.create(banner);
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const faqItems = await Promise.all(faq.map(async (item) => {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            }));
            await layout_model_1.default.create({ type: "FAQ", faq: faqItems });
        }
        if (type === "Category") {
            const { categories } = req.body;
            const categoriesItems = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title,
                };
            }));
            await layout_model_1.default.create({ type: "Category", categories: categoriesItems });
        }
        res.status(201).json({
            success: true,
            message: "Layout created successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// edit layout
// edit layout
exports.editLayout = (0, catshAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            let bannerData = await layout_model_1.default.findOne({ type: "Banner" });
            const { image, badge, title, subtitle, description, primaryButton, secondaryButton, stats } = req.body;
            let imageData = { public_id: "", url: "" }; // Start with empty image
            // If image is provided and it's a base64 string (new upload)
            if (image && image.startsWith('data:image')) {
                // Delete old image if exists
                if (bannerData?.banner?.image?.public_id) {
                    await cloudinary_1.default.v2.uploader.destroy(bannerData.banner.image.public_id);
                }
                // Upload new image
                const mycloud = await cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "layout",
                });
                imageData = {
                    public_id: mycloud.public_id,
                    url: mycloud.secure_url,
                };
            }
            // If image is a URL (keeping existing image)
            else if (image && image.startsWith('http')) {
                imageData = bannerData?.banner?.image || { public_id: "", url: "" };
            }
            // If image is empty string or null (user wants to remove image)
            else if (!image || image === "") {
                // Delete old image from cloudinary if exists
                if (bannerData?.banner?.image?.public_id) {
                    await cloudinary_1.default.v2.uploader.destroy(bannerData.banner.image.public_id);
                }
                // Keep imageData as empty
                imageData = { public_id: "", url: "" };
            }
            const bannerContent = {
                image: imageData,
                badge: badge || "🎓 Join 50,000+ learners worldwide",
                title: title || "Transform Your",
                subtitle: subtitle || "Learning Journey",
                description: description || "Unlock your potential with cutting-edge courses.",
                primaryButton: primaryButton || "Start Learning Free",
                secondaryButton: secondaryButton || "Watch Demo",
                stats: stats || [
                    { icon: 'Users', label: 'Active Students', value: '50K+', color: 'blue' },
                    { icon: 'BookOpen', label: 'Courses', value: '500+', color: 'purple' },
                    { icon: 'Award', label: 'Certificates', value: '30K+', color: 'indigo' },
                    { icon: 'TrendingUp', label: 'Success Rate', value: '95%', color: 'pink' },
                ],
            };
            // If banner doesn't exist, create it
            if (!bannerData) {
                bannerData = await layout_model_1.default.create({
                    type: "Banner",
                    banner: bannerContent
                });
            }
            else {
                // Update existing banner
                await layout_model_1.default.findByIdAndUpdate(bannerData._id, { banner: bannerContent }, { new: true });
            }
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            let FaqItem = await layout_model_1.default.findOne({ type: "FAQ" });
            const faqItems = await Promise.all(faq.map(async (item) => {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            }));
            if (!FaqItem) {
                await layout_model_1.default.create({ type: "FAQ", faq: faqItems });
            }
            else {
                await layout_model_1.default.findByIdAndUpdate(FaqItem._id, { type: "FAQ", faq: faqItems }, { new: true });
            }
        }
        if (type === "Category") {
            const { categories } = req.body;
            let categoriesData = await layout_model_1.default.findOne({ type: "Category" });
            const categoriesItems = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title,
                };
            }));
            if (!categoriesData) {
                await layout_model_1.default.create({ type: "Category", categories: categoriesItems });
            }
            else {
                await layout_model_1.default.findByIdAndUpdate(categoriesData._id, { type: "Category", categories: categoriesItems }, { new: true });
            }
        }
        res.status(200).json({
            success: true,
            message: "Layout updated successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get layout by type
exports.getLayoutByType = (0, catshAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.params;
        const layout = await layout_model_1.default.findOne({ type });
        res.status(200).json({
            success: true,
            layout,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});

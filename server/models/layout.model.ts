import mongoose, { Document, Model, Schema } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface StatItem {
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface Banner extends Document {
  image: BannerImage;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
  stats: StatItem[];
}

interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: Category[];
  banner: Banner;
}

const faqSchema = new Schema<FaqItem>({
  question: { type: String },
  answer: { type: String },
});

const categorySchema = new Schema<Category>({
  title: { type: String },
});

const bannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const statItemSchema = new Schema<StatItem>({
  icon: { type: String },
  label: { type: String },
  value: { type: String },
  color: { type: String },
});

const bannerSchema = new Schema<Banner>({
  image: bannerImageSchema,
  badge: { type: String },
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  primaryButton: { type: String },
  secondaryButton: { type: String },
  stats: [statItemSchema],
});

const layoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: bannerSchema,
});

const LayoutModel: Model<Layout> = mongoose.model("Layout", layoutSchema);

export default LayoutModel;
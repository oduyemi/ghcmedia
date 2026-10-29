
import mongoose, {
    Schema,
    Types,
    model,
    models,
    type Document,
  } from "mongoose";
  
  export type ReportFeedbackStatus = "VISIBLE" | "HIDDEN";
  
  export interface IReportFeedback extends Document {
    reportId: Types.ObjectId;
    authorId: Types.ObjectId;
    message: string;
    status: ReportFeedbackStatus;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const reportFeedbackSchema = new Schema<IReportFeedback>(
    {
      reportId: {
        type: Schema.Types.ObjectId,
        ref: "ServiceReport",
        required: true,
        index: true,
      },
      authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 3000,
      },
      status: {
        type: String,
        enum: ["VISIBLE", "HIDDEN"],
        default: "VISIBLE",
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );
  
  reportFeedbackSchema.index({ reportId: 1, createdAt: -1 });
  reportFeedbackSchema.index({ authorId: 1, createdAt: -1 });
  
  const ReportFeedback =
    models.ReportFeedback ||
    model<IReportFeedback>("ReportFeedback", reportFeedbackSchema);
  
  export default ReportFeedback;
  
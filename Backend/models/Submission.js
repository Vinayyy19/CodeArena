import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: 'Auto-Inferred'
    },
    status: {
        type: String,
        required: true,
        enum: ['Accepted', 'Wrong Answer', 'Compile Error', 'Time Limit', 'Error']
    },
    message: {
        type: String
    },
    confidence: {
        type: Number,
        min: 0,
        max: 1,
        default: null // System-derived confidence score (0.0 to 1.0)
    }
}, { timestamps: true });

// ─── Indexes for fast query lookups ──────────────────────────────
submissionSchema.index({ user: 1, problem: 1 });   // Fast lookup: user's submissions for a problem
submissionSchema.index({ user: 1, createdAt: -1 }); // Fast lookup: user's submission history (newest first)

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;

import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    strictValidation: {
        type: Boolean,
        default: false, // Re-enables strict face-recognition validation
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

// ─── Indexes for fast query lookups ──────────────────────────────
contestSchema.index({ startTime: 1 });    // Fast sorting: contests by start time
contestSchema.index({ createdAt: -1 });   // Fast sorting: newest contests first

const Contest = mongoose.model('Contest', contestSchema);
export default Contest;

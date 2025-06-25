const workSchema = {
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
};

module.exports = workSchema;

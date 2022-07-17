const { Schema, model, Types } = require("mongoose")

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    { toJSON: { virtuals: true, getters: true }, id: false}
)

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
        type: String,
        required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },   
    {
        toJSON: { getters: true }     
    }
)

// creating reactionCount virtual to get length of thoughts array
UserSchema.virtual("reactionCount").get(function() {
    return this.reaction.length;
})

const Thought = model("Thought", thoughtSchema)
module.exports = Thought
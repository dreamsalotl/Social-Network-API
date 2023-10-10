const { Schema } = require('mongoose');
const { formatDate } = require('../utils/date-format');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        },
        {
            toJSON: {
                getters: true,
            },
        }
);


module.exports = thoughtSchema;
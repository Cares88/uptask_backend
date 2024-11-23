import moongose, {Schema, Document, Types} from 'mongoose'
import Note from './Note'

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

export type taskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface Itask extends Document {
    name: string
    description: string
    project: Types.ObjectId
    status: taskStatus
    completeBy: {
        user: Types.ObjectId,
        status: taskStatus
    }[]
    notes: Types.ObjectId[]
}

export const TaskSchema : Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    completeBy: [
        {
            user:{
                type: Types.ObjectId,
                ref: 'User',
                default: null
            },
            status:{
                type: String,
                enum: Object.values(taskStatus),
                default: taskStatus.PENDING
            }
        }
    ],
    notes: [
        {
            type: Types.ObjectId,
            ref: 'Note'
        }
    ]
}, {timestamps: true})

// Middleware
TaskSchema.pre('deleteOne', {document: true}, async function(){
    const taskId = this._id
    if(!taskId) return
    await Note.deleteMany({task: taskId})
})
const Task = moongose.model<Itask>('Task', TaskSchema)
export default Task
 

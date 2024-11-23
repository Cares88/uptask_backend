import moongose, { Schema, Document, Types } from 'mongoose';
declare const taskStatus: {
    readonly PENDING: "pending";
    readonly ON_HOLD: "onHold";
    readonly IN_PROGRESS: "inProgress";
    readonly UNDER_REVIEW: "underReview";
    readonly COMPLETED: "completed";
};
export type taskStatus = typeof taskStatus[keyof typeof taskStatus];
export interface Itask extends Document {
    name: string;
    description: string;
    project: Types.ObjectId;
    status: taskStatus;
    completeBy: {
        user: Types.ObjectId;
        status: taskStatus;
    }[];
    notes: Types.ObjectId[];
}
export declare const TaskSchema: Schema;
declare const Task: moongose.Model<Itask, {}, {}, {}, moongose.Document<unknown, {}, Itask> & Itask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Task;

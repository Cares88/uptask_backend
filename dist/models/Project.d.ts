import moongose, { Document, PopulatedDoc } from 'mongoose';
import { Itask } from './Task';
import { IUser } from './User';
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<Itask & Document>[];
    manager: PopulatedDoc<IUser & Document>;
    team: PopulatedDoc<IUser & Document>[];
}
declare const Project: moongose.Model<IProject, {}, {}, {}, moongose.Document<unknown, {}, IProject> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Project;

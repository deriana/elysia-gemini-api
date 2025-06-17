import { Mongoose, Schema, Document } from "mongoose";

export interface IPersona extends Document {
    name: string;
    baseNote: string;
    responseLevelLow: string;
    responseLevelMid: string;
    responseLevelHigh: string;
    imageUrl: string;
}

export const PersonaSchema = new Schema<IPersona>({
    name: { type: String, required: true },
    baseNote: { type: String, default: "Jawabanmu singkat dan jelas, maksimal 2-3 kalimat." },
    responseLevelLow: { type: String, required: true },
    responseLevelMid: { type: String, required: true },
    responseLevelHigh: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, {
    timestamps: true,
});

export const PersonaModel = (mongoose: Mongoose) => mongoose.model<IPersona>("Persona", PersonaSchema);
import mongoose from 'mongoose'
import { Schema, InferSchemaType} from 'mongoose'
import SDM from './sdm.enum'
import DepoStatus from './depo.status.enum'

const depoSchema = new Schema({
    /**
     * Deposit number (e.g. 21-2023)
     */
    _id: {type: String},
    depo_status: {type: String, enum: DepoStatus, required: true}, 
    /**
     * owner's album number (organisation-specific ID)
     */
    album: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    /**
     * Front-end should suggest album @ example.com by default.
     */
    mail: {type: String, required: true, lowercase: true, trim: true},
    /**
     * Description of deposit (e.g. "fridge, 2 boxes, electric fan")
     */
    content: {type: String, required: true},
    depo_date: {type: String, required: true},
    valid_to: {type: String, required: true},
    sdm:  {type: String, enum: SDM, required: true},
    authorized_by: {type: String},
    comission_chairman: {type: String},
},
{
    collection: 'depos',
    timestamps: true,
})

export type Depo = InferSchemaType<typeof depoSchema>

export default mongoose.model<Depo>('Depo', depoSchema)
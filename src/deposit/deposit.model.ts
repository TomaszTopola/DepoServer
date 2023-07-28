import mongoose from 'mongoose'
import { Schema, InferSchemaType} from 'mongoose'
import SDM from './sdm.enum'
import DepoStatus from './depo.status.enum'

const depoSchema = new Schema({
    _id: {type: String},    // deposit number
    depo_status: {type: String, enum: DepoStatus, required: true},// active/archive/utilised/utilisation in progress 
    album: {type: String, required: true},      // owner's album number (organisation-specific ID)
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    mail: {type: String, required: true, lowercase: true, trim: true},
    content: {type: String, required: true},    // contents of deposit
    depo_date: {type: String, required: true},  // Date when property was deposited
    valid_to: {type: String, required: true},   // Date when utilisation process begins
    sdm:  {type: String, enum: SDM, required: true},       // Korab / Pasat
    authorized_by: {type: String},         // person taking in the deposit, user ID
    comission_chairman: {type: String},    // person responsible for deposit, user ID
},
{
    collection: 'depos',
    timestamps: true,
})

export type Depo = InferSchemaType<typeof depoSchema>

export default mongoose.model<Depo>('Depo', depoSchema)
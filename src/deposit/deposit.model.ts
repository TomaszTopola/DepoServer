import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const depoSchema = new Schema({
    _id: {type: String},    // deposit number
    depo_status: {type: String, required: true},// active/archive/utilised/utilisation in progress 
    album: {type: String, required: true},      // owner's album number (organisation-specific ID)
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    mail: {type: String, required: true, lowercase: true, trim: true},
    content: {type: String, required: true},    // contents of deposit
    depo_date: {type: String, required: true},  // Date when property was deposited
    valid_to: {type: String, required: true},   // Date when utilisation process begins
    sdm:  {type: String, required: true},       // Korab / Pasat
    authorized_by: {type: mongoose.Types.ObjectId},         // person taking in the deposit, user ID
    comission_chairman: {type: mongoose.Types.ObjectId},    // person responsible for deposit, user ID
},
{
    collection: 'depos',
    timestamps: true,
})

const depoModel = mongoose.model('Depo', depoSchema)

export default depoModel
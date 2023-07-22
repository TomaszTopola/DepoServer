import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const DepoModel = new Schema({
    album: {type: String, required: true, unique: true},    // owner's album number (organisation-specific ID)
    first_name: {type: String, required: true},             
    last_name: {type: String, required: true},              
    phone: {type: String, required: true},                  
    mail: {type: String, required: true},                   
    content: {type: String, required: true},    // contents of deposit
    depo_date: {type: String, required: true},  // Date when property was deposited
    vaild_to: {type: String, required: true},   // Date when utilisation process begins
    sdm:  {type: String, required: true},       // Korab / Pasat
    authorized_by: {type: mongoose.Types.ObjectId, required: true}, // person taking in the deposit, user ID
    comission_chairman: {type: mongoose.Types.ObjectId},            // person responsible for deposit, user ID
},
{
    collection: 'depos',
    timestamps: true,
})

export default DepoModel
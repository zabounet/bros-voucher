import mongoose, { Schema } from "mongoose";

const UtilisateurSchema = new Schema({
    Prenom: { type: String, required: true },
    MotDePasse: { type: String, required: true },
    Vouchers: [
        {
            Id: { type: Number, required: true, },
            Type: { type: String, required: true },
            Quantite: { type: Number, required: true }
        }
    ]
});

export default mongoose.model('utilisateurs', UtilisateurSchema)
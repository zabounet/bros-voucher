import UserModel from '../models/users.model.js';
import mongoose from 'mongoose';

export const login = async (req, res) => {
    console.log("Login attempt for user:", req.body.Prenom);
    const post = await UserModel.findOne({ Prenom: req.body.Prenom });
    if (!post) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    if (post.MotDePasse !== req.body.MotDePasse) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    } else {
        res.status(200).json({ Prenom: post.Prenom, Vouchers: post.Vouchers });
    }
};

export const sendVoucher = async (req, res) => {
    const { Prenom, voucherId } = req.body;

    try {
        const user = await UserModel.findOne({ Prenom });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        if (!user.Vouchers[voucherId]) {
            user.Vouchers[2].Quantite += 1;
        } else {
            user.Vouchers[voucherId].Quantite += 1;
        }
        await user.save();

        res.status(200).json({ message: 'Voucher envoyé avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'envoi du voucher:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

export const redeemVoucher = async (req, res) => {
    const { Prenom, voucherId } = req.body;

    try {
        const user = await UserModel.findOne({ Prenom });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        if (user.Vouchers[voucherId].Quantite > 0) {
            user.Vouchers[voucherId].Quantite -= 1;
            await user.save();
            res.status(200).json({ message: 'Voucher échangé avec succès' });
        } else {
            res.status(400).json({ message: 'Pas assez de vouchers à échanger' });
        }
    } catch (error) {
        console.error("Erreur lors de l'échange du voucher:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

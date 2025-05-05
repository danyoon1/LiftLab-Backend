import { UserModel, DietModel } from "../models/db.mjs";

const loadDiets = async (req, res) => {
    const {username} = req.query;

    console.log('loading diets')

    console.log(username)
    const foundUser = await UserModel.findOne({username}).populate('diets');
    const diets = foundUser.diets;

    return res.status(200).json({ diets });
}

const loadDiet = async (req, res) => {
    const {username, dietId} = req.query;

    console.log(username)
    console.log(dietId)

    const foundUser = await UserModel.findOne({username}).populate('diets');
    const selectedDiet = await DietModel.findById(dietId).populate("diets");

    console.log(selectedDiet)

    return res.status(200).json({ selectedDiet });
}

const createDiet = async (req, res) => {
    const { username, name, bodyWeight, goal, desiredWeight, timeConstraint, calPerDay, proteinPerDay, carbPerDay, fatPerDay, otherNotes } = req.body;

    try {
        // 1. Find the user
        const foundUser = await UserModel.findOne({ username });

        if (!foundUser) {
            console.log('user not found');
            return res.status(404).json({ error: "User not found" });
        }

        const newDiet = await DietModel.create({
            username, name, bodyWeight, goal, desiredWeight, timeConstraint, calPerDay, proteinPerDay, carbPerDay, fatPerDay, otherNotes
        });

        foundUser.diets.push(newDiet._id);
        await foundUser.save();

        return res.status(201).json({ dietId: newDiet._id });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};


export {
    loadDiet,
    loadDiets,
    createDiet
}
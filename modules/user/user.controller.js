const { response, request } = require("express");
const User = require("./user.model");
const { processResponse, typeResponse } = require("../../utils");

const getAllUser = async (req = request, res = response) => {
    const data = await User.find();
    // .populate('user', 'name');

    res.json(processResponse(typeResponse.getAll, data));
};

const getOneUser = async (req, res = response) => {
    const { id } = req.params;

    console.log(id);

    const item = await User.findById(id);

    res.json(processResponse(typeResponse.getOne, [item]));
};

const createUser = async (req, res = response) => {
    const user = new User(req.body);

    try {
        user.user = req.uid;
        const data = await user.save();

        res.json(processResponse(typeResponse.create, [data]));
    } catch (error) {
        console.error(error);
        res.status(400).json(processResponse(typeResponse.error, [error]));
    }
};

const updateUser = async (req, res = response) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "User no existente por el id",
            });
        }

        const data = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });

        res.json(processResponse(typeResponse.update, [data]));
    } catch (error) {
        console.error(error);
        res.status(400).json(processResponse(typeResponse.error, [error]));
    }
};

const deleteUser = async (req, res = response) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "User no existente por el id",
            });
        }

        /** modificar el documento con el id especificado, e; 3er valor indica que devuelva con el documento ya actualizado */
        await User.findByIdAndDelete(id);

        res.json({ ok: true, });
    } catch (error) {
        console.error(error);
        res.status(400).json(processResponse(typeResponse.error, [error]));
    }
};

module.exports = {
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
};

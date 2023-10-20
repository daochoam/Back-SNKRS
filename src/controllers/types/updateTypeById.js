const { Type } = require('../../schemas');

const updateTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, gender } = req.body;
        const updatedType = await Type.findByIdAndUpdate(id, { type, gender, Category_id }, { new: true });

        if (updatedType) {
            res.status(200).json(updatedType);
        } else {
            res.status(404).json({ error: 'Marca no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = updateTypeById;

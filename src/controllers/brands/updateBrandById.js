const { Brand } = require('../../schemas');

const updateBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = req.body;

        // Utiliza el método findByIdAndUpdate para buscar y actualizar la marca por su ID
        const updatedBrand = await Brand.findByIdAndUpdate(id, brand, { new: true });

        if (updatedBrand) {
            res.status(200).json(updatedBrand);
        } else {
            res.status(404).json({ error: 'Marca no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = updateBrandById;

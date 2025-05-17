// controllers/shipmentController.js
const Shipment = require("../models/shipmentModel");

// Crear nuevo envío
exports.createShipment = async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    const savedShipment = await shipment.save();
    res.status(201).json(savedShipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los envíos
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate(
      "cliente productos.producto"
    );
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener envío por ID
exports.getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate(
      "cliente productos.producto"
    );
    if (!shipment)
      return res.status(404).json({ message: "Envío no encontrado" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado del envío
exports.updateShipmentStatus = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    if (!shipment)
      return res.status(404).json({ message: "Envío no encontrado" });
    res.json(shipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar envío
exports.deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!shipment)
      return res.status(404).json({ message: "Envío no encontrado" });
    res.json({ message: "Envío eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

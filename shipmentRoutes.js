// routes/shipmentRoutes.js
const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");

// POST: Crear envío
router.post("/", shipmentController.createShipment);

// GET: Obtener todos los envíos
router.get("/", shipmentController.getAllShipments);

// GET: Obtener un envío por ID
router.get("/:id", shipmentController.getShipmentById);

// PUT: Actualizar estado del envío
router.put("/:id", shipmentController.updateShipmentStatus);

// DELETE: Eliminar envío
router.delete("/:id", shipmentController.deleteShipment);

module.exports = router;

// models/shipmentModel.js
const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  direccionEnvio: {
    type: String,
    required: true,
  },
  fechaEnvio: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente",
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  metodoEnvio: {
    type: String,
    default: "mensajería",
  },
  costoEnvio: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Shipment", shipmentSchema);

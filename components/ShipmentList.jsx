import React, { useEffect, useState } from "react";
import { getShipments } from "../api/shipments";

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    getShipments()
      .then((res) => {
        setShipments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="uk-container">
      <h2 className="uk-heading-line">
        <span>Lista de Envíos</span>
      </h2>
      <table className="uk-table uk-table-divider">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((envio) => (
            <tr key={envio._id}>
              <td>{envio.cliente?.nombre || envio.cliente}</td>
              <td>{envio.direccionEnvio}</td>
              <td>{envio.estado}</td>
              <td>{new Date(envio.fechaEnvio).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentList;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerPokemonesAccion,
  siguientePokemonesAccion,
  anteriorPokeAccion,
  detallePokemonAccion,
} from "../Redux/pockeDucks";
import Poke from "./Poke";

export const Pokemones = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const pokemones = useSelector((store) => store.pokemones.results);
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  const activarBotonUno = () => {
    setLoading(true);
    dispatch(obtenerPokemonesAccion());
    setLoading("");
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>Lista de pokemones</h3>
        <br />
        <div className="d-flex justify-content-between">
          {pokemones.length === 0 && (
            <button className="btn btn-dark" onClick={() => activarBotonUno()}>
              Obtener pokemones
            </button>
          )}
          {next && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(siguientePokemonesAccion())}
            >
              Siguiente página
            </button>
          )}
          {previous && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(anteriorPokeAccion())}
            >
              Anterior página
            </button>
          )}
        </div>
        {loading ? (
          <span>Cargando...</span>
        ) : (
          <ul className="list-group mt-3">
            {pokemones.map((item) => (
              <li className="list-group-item text-uppercase" key={item.name}>
                {item.name}
                <button
                  onClick={() => dispatch(detallePokemonAccion(item.url))}
                  className="btn btn-dark btn-sm float-end"
                >
                  Ver detalle
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="col-md-6">
        <Poke />
      </div>
    </div>
  );
};

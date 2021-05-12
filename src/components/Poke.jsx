import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detallePokemonAccion } from "../Redux/pockeDucks";

const Poke = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const llamarData = () => {
      dispatch(detallePokemonAccion());
    };
    llamarData();
  }, [dispatch]);

  const pokemon = useSelector((store) => store.pokemones.unPokemon);
  console.log(pokemon);

  return pokemon ? (
    <>
      <h3 className="mt-2">Detalle pokemon</h3>
      <div
        className="card mt-4 text-center
      "
      >
        <div className="card-body">
          <img src={pokemon.foto} alt="" className="img fluid" />
          <div className="card-title text-uppercase ">{pokemon.nombre}</div>
          <p className="card-text">
            Alto: {pokemon.alto} | Ancho: {pokemon.ancho}
          </p>
        </div>
      </div>
    </>
  ) : null;
};

export default Poke;

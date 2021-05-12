import axios from "axios";

//constantes

const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";
const ANTERIOR_POKEMONES_EXITO = "ANTERIOR_POKE_EXITO";
const DETALLE_POKEMONES_EXITO = "DETALLE_POKE_EXITO";

//reducer
export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_POKEMONES_EXITO:
      return { ...state, ...action.payload };
    case SIGUIENTE_POKEMONES_EXITO:
      return {
        ...state,
        ...action.payload,
      };
    case ANTERIOR_POKEMONES_EXITO:
      return {
        ...state,
        ...action.payload,
      };
    case DETALLE_POKEMONES_EXITO:
      return { ...state, unPokemon: action.payload };
    default:
      return state;
  }
}

//acciones

export const obtenerPokemonesAccion = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
    );
    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
    return;
  }
};

export const siguientePokemonesAccion = () => async (dispatch, getState) => {
  /* const offset = getState().pokemones.offset;
  const next = offset + numero; */

  const { next } = getState().pokemones;
  try {
    const res = await axios.get(next);

    localStorage.setItem(next, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
  if (localStorage.getItem(next)) {
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(next)),
    });
  }
};

export const anteriorPokeAccion = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones;

  try {
    const res = await axios.get(previous);
    dispatch({
      type: ANTERIOR_POKEMONES_EXITO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detallePokemonAccion = (url) => async (dispatch) => {
  try {
    const res = await axios.get(url);
    dispatch({
      type: DETALLE_POKEMONES_EXITO,
      payload: {
        nombre: res.data.name,
        ancho: res.data.weight,
        alto: res.data.height,
        foto: res.data.sprites.front_default,
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

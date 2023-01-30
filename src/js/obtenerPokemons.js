const obtenerPokemons = async () => {
    const vec = obtenerVectorNumerico()
    return await obtenerVectorNombres(vec)
}

//Metodo que me de un vector con 4 numeros aleatorios
const obtenerVectorNumerico = () => {
    return [obtenerAleatorio(1,600),obtenerAleatorio(1,600),obtenerAleatorio(1,600),obtenerAleatorio(1,600)]
}

const obtenerVectorNombres = async ([p1, p2, p3, p4] = []) => {
    const nombreP1 = await obtenerNombreAPI(p1)
    const nombreP2 = await obtenerNombreAPI(p2)
    const nombreP3 = await obtenerNombreAPI(p3)
    const nombreP4 = await obtenerNombreAPI(p4)

    //Aqui necesito el nombre y el id para posteriormente enviar el id al paquete PokemonImg
    const vecNombres = [
        {nombre: nombreP1, id: p1},
        {nombre: nombreP2, id: p2},
        {nombre: nombreP3, id: p3},
        {nombre: nombreP4, id: p4},
    ]

    return vecNombres
}

const obtenerNombreAPI = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())
    return data.name
}

function obtenerAleatorio(min, max){//incluye
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Exportar la funcionalidad que voy a utilizar
    //Metodo Fachada
const obtenerPokemonsFachada = async () => {
    return await obtenerPokemons()
}

export default obtenerPokemonsFachada
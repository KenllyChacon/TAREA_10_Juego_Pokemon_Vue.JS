<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Quien es este pokemon</title>
    <meta name="description" content="quien es este pokemon">
    <meta name="author" content="Kenlly Chacon">
    <meta name="keywords" content="quien es este pokemon">
    <meta name="google-site-verification" content="">
    <meta name="googlebot" content="">
  </head>

  <body>
  <header>
    <h1>!Quien es este pokemon!</h1>
  </header>

  <nav>
  </nav>

  <section>
    <div v-if="mostrarJuego">
      <h1 v-if="!pokemonCorrecto">Espere por favor...</h1>
      <div v-else>
        <p>Puntaje: {{ puntaje }}</p>
        <p>Intentos: {{ intentos }}</p>
        <PokemonImg :id-pokemon="pokemonCorrecto.id" :mostrarPokemon="mostrarPokemon"/>

        <!-- $event representa al objeto enviado en la segunda posicion del evento hijo validarRespuesta-->
        <PokemonOpts :pokemons="pokemonArr" @selectionPokemon="numeroClicks($event)"/>
      </div>

      <div>
        <h2 v-if="mensajePerdedor">Incorrecto, la opcion correcta era: {{ pokemonCorrecto.nombre }} </h2>
      </div>
      <button v-if="mostrarPokemon" v-on:click="siguienteIntento()">Siguiente intento</button>
    </div>

    <div id="res1" v-if="resultado">
      <div v-if="metodoResultado()">
        <h1>GANASTES</h1>
        <img src="../img/victoria.gif" alt="">
      </div>

      <div id="res2" v-else>
        <h1>Perdistes</h1>
        <img src="../img/perdida.gif" alt="">
      </div>
    </div>

    <button v-if="mostrarReiniciar" v-on:click="reiniciar()">Reiniciar</button>
  </section>

  <footer>
    Derechos Reservados 2023-2024
  </footer>
  </body>

</template>

<script>
import PokemonImg from "@/components/PokemonImg.vue";
import PokemonOpts from "@/components/PokemonOpts.vue";
import obtenerPokemons from "/src/js/obtenerPokemons"

export default {
  name: "PokemonPage",
  data() {
    return {
      pokemonArr: [],
      pokemonCorrecto: null,
      mostrarPokemon: false,

      mensajePerdedor: false,

      puntaje: 0,
      intentos: 3,
      mostrarJuego: true,
      resultado: false,

      clicks: 0,
      mostrarReiniciar: false,
    }
  },
  components: {
    PokemonImg,
    PokemonOpts
  },
  //En los metodos de ciclo de vida no hace falta el await
  mounted() {
    this.cargaPokemonInicial()
  },
  methods: {
    async cargaPokemonInicial() {

      const vec = await obtenerPokemons()
      this.pokemonArr = vec

      const numero = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      this.pokemonCorrecto = this.pokemonArr[numero]
      console.log(this.pokemonCorrecto.nombre)
    },
    numeroClicks(event) {
      if (this.clicks < 2) {
        this.clicks += 1;
        this.validarRespuesta(event, this.clicks);
      }
    },
    validarRespuesta(pokemonSeleccionadoHijo, clicks) {

      const idSeleccionado = pokemonSeleccionadoHijo.idPoke

      if (idSeleccionado === this.pokemonCorrecto.id) {
        this.mostrarPokemon = true
        this.resultadoPuntaje(clicks)
        this.clicks += 1;

      } else if (clicks === 2) {
        this.mostrarPokemon = true
        this.mensajePerdedor = true
      }

    },
    siguienteIntento() {
      this.intentos -= 1

      if (this.intentos < 1 || this.puntaje >= 10) {
        this.mostrarJuego = false
        this.resultado = true
        this.mostrarReiniciar = true
      }

      this.clicks = 0

      this.pokemonArr = []

      this.pokemonCorrecto = null
      this.mostrarPokemon = false

      this.mensajePerdedor = false

      this.cargaPokemonInicial()
    },
    reiniciar() {
      this.pokemonArr = []

      this.pokemonCorrecto = null
      this.mostrarPokemon = false

      this.mensajePerdedor = false

      this.cargaPokemonInicial()

      this.puntaje = 0
      this.intentos = 3

      this.mostrarJuego = true
      this.resultado = false

      this.clicks = 0
      this.mostrarReiniciar = false
    },
    resultadoPuntaje(cont) {
      if (cont === 1) {
        this.puntaje += 5
      } else {
        this.puntaje += 3
      }
    },
    metodoResultado() {
      console.log(this.puntaje)
      return this.puntaje >= 10;
    },
  }
}
</script>

<style scoped>

header, nav, section, footer, aside, article {
  display: block;
}

section input, label, p, ul li {
  text-align: center;
  display: inline-block;
  width: 25%;
  margin: 30px 0;
  font-size: 25px;
  padding: 7px;
  border-radius: 10px;
}

h1 {
  margin: 25px;
  text-align: center;
}

footer {
  font-size: 18px;
  margin: 50px auto;
  clear: both;
  text-align: center;
}

img {
  width: 300px;
  height: 350px;
  margin: 15px;
}

section button {
  transition-duration: 0.4s;
  padding: 15px;
  margin: 25px auto;
  display: block;
  text-align: center;
  font-size: 16px;
  border-radius: 10px;
  width: 25%;
  background-color: #3E4251;
  cursor: pointer;
  color: white;
}

body {
  background-color: #1B1F27;
}

button:hover {
  background-color: #1F2E3C; /* Green */
  color: white;
}

#res1 h1 {
  color: green;
}

#res2 h1 {
  color: red;
}

</style>
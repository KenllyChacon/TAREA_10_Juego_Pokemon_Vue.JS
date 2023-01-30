<template>
  <div class="pokemon-container">
    <img v-if="!mostrarPokemon"
         :src="urlImg"
         alt="no se puede" class="ocultar_pokemon">
    <img v-if="mostrarPokemon"
         :src="urlImg"
         alt="no se puede">
  </div>
</template>

<script>
export default {
  name: "PokemonImg",
  data(){
    return{
      url: null
    }
  },
  props:{
    idPokemon:{
      type: Number
    },
    mostrarPokemon:{
      type: Boolean
    }
  },
  computed:{
    urlImg(){
      return this.url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + this.idPokemon + ".svg"
    }
  }
}
</script>

<style scoped>
.ocultar_pokemon {
  filter: brightness(0);
}

img {
  left: 550px;
  margin: 20px;
  position: absolute;
  width: 300px;
  height: 350px;
  right: 62%;
  -webkit-user-drag: none;
}

</style>
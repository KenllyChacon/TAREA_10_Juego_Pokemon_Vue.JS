<template>
  <div class="options-container">
    <ul>
      <!--                                                             (nombre del evento, valor)-->
      <li v-for="poke in pokemons" :key="poke.id"
          @click="$emit('selectionPokemon',{idPoke:poke.id, inventado:20, nombre:poke.nombre}), selected = poke"
          :class="{ selected: selected === poke }"> {{ poke.nombre }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PokemonOpts",
  props: {
    pokemons: {
      type: Array,
      require: true,
    }
  },
  data() {
    return {
      selected: null
    }
  }
}

</script>

<style scoped>

ul {
  margin: 5% 5% 5% 55%;
  list-style: none;
  width: 20%;
}

.options-container {
  justify-content: center;
  display: block;
}

section input, label, p, li {
  text-align: center;
  display: block;
  font-size: 25px;
  padding: 7px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 250px;
  margin-top: 15px;
  cursor: pointer;
  color: black;
}

.selected {
  background-color: aqua;
}

</style>
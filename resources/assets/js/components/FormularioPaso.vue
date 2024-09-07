<template>
    <div>
        <button id="botoncito" @click="pruebaSori">Click me</button>
        <form id="formularioDePaso" @submit="fetchPokemonData">
            <input type="hidden" id="inputPaso">
        </form>
    </div>
</template>

<script>

export default ({
    setup() {

    },
    methods: {
        pruebaSori() {
            console.log("Soriano estuvo aquí");
            this.fetchPokemonData();
            this.fetchWolframData();
        },
        fetchPokemonData() {
            console.log("Pokemon:");
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/pikachu`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.pokemonData = data;
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching Pokémon data:', error);
                });
        },
        async fetchWolframData() {
            const endpoint = `https://api.wolframalpha.com/v2/query?input=a&appid=RKWAT3-H4Q6UG65UW&output=JSON`;
            try {
                const response = await axios.get(endpoint);
                if (response.data.queryresult.success) {
                    this.result = response.data.queryresult.pods[0].subpods[0].plaintext;
                    return true;
                } else {
                    this.result = 'No result found';
                    return false;
                }
            } catch (error) {
                console.error(error);
                this.result = 'Error retrieving data';
                return false;
            }
        },
    }
})
</script>

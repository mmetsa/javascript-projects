<template>
    <ul>
        <li v-for="(item, index) in gasStations" :key="index">
            {{item.name}}
        </li>
    </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { IGasStation } from "@/domain/IGasStation";

@Options({
    components: {},
})
export default class GasStations extends Vue {
    mounted(): void {
        console.log("I mounted");
        store.dispatch('loadGasStations');
        console.log(store.state.gasstations)
    }

    get gasStations(): IGasStation[] | null {
        return store.state.gasstations;
    }
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-around">
            <div
                v-for="(item, index) in gasStations"
                :key="index"
                class="col-sm-12 col-md-12 col-lg-6 pb-3"
            >
                <GasStation :gasStation="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { IGasStation } from "@/domain/IGasStation";
import GasStation from "@/components/GasStation.vue";

@Options({
    components: {
        GasStation,
    }
})
export default class Favorites extends Vue {
    async mounted(): Promise<void> {
        await store.dispatch("loadFavorites");
        this.gasStats = store.state.favorites;
        console.log(store.state.favorites);
    }

    gasStats: IGasStation[] | null = null;

    get gasStations(): IGasStation[] | null {
        return this.gasStats;
    }
}
</script>

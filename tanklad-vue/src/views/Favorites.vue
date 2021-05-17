<template>
    <div class="container">
        <div class="row justify-content-around">
            <h1 v-if="!loading && (gasStations == null || gasStations.length == 0)">Oops! No Favorite Gas Stations yet!</h1>
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
        GasStation
    }
})
export default class Favorites extends Vue {
    loading: boolean = false;
    async mounted(): Promise<void> {
        this.loading = true;
        await store.dispatch("loadFavorites");
        this.gasStats = store.state.favorites;
        this.loading = false;
    }

    gasStats: IGasStation[] | null = null;

    get gasStations(): IGasStation[] | null {
        return this.gasStats;
    }
}
</script>

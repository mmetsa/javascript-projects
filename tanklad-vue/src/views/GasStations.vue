<template>
    <div class="container">
        <div class="row justify-content-center">
            <select name="retailer" @change="retailerChange()" v-model="retailer" class="form-select form-select-lg mb-3 col-3 mr-5 p-3">
                <option selected value="all">Kõik tanklaketid</option>
                <option v-for="(retailer, index) in retailers" :key="index" v-bind:value="retailer.id">{{retailer.name}}</option>
            </select>
            <select id="sort" @change="sortChange()" v-model="sort" class="form-select form-select-lg mb-3 col-2 p-3">
                <option selected value="no-sort">Sorteeri</option>
                <option value="price-growing">Kütuse hinna järgi: Kasvavalt</option>
            </select>
        </div>
        <div class="row justify-content-around">
            <div
                v-for="(item, index) in gasStations"
                :key="index"
                class="col-sm-12 col-md-12 col-lg-6 pb-3"
            >
                <GasStation :gasStation="item" @update:favorite="updateFavorites" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { IGasStation } from "@/domain/IGasStation";
import GasStation from "@/components/GasStation.vue";
import { IRetailer } from "@/domain/IRetailer";

@Options({
    components: {
        GasStation,
    }
})
export default class GasStations extends Vue {
    async mounted(): Promise<void> {
        await store.dispatch("loadGasStations");
        await store.dispatch('loadRetailers');
        this.gasStats = store.state.gasstations;
        console.log(store.state.gasstations);
    }

    gasStats: IGasStation[] | null = null;
    retailer: string = "all";
    sort: string = "no-sort";

    updateFavorites(gasStation: IGasStation): void {
        if (!(store.state.favorites.filter(e => e.id === gasStation.id).length > 0)) {
            store.dispatch('addFavorite', gasStation);
        }
    }

    get retailers(): IRetailer[] | null {
        return store.state.retailers;
    }

    get gasStations(): IGasStation[] | null {
        return this.gasStats;
    }

    retailerChange(): void {
        if (this.retailer === "all") {
            this.gasStats = store.state.gasstations;
            return;
        }
        this.gasStats = store.state.gasstations.filter(f => {
            return (f.retailerId.includes(this.retailer))
        });
    }

    sortChange(): void {
        if (this.sort === "no-sort") {
        }
        if (this.sort === "price-growing" && this.gasStats != null) {
            this.gasStats.sort((a, b) => (a.fuelTypes[0].price > b.fuelTypes[0].price) ? 1 : (a.fuelTypes[0].price === b.fuelTypes[0].price) ? 0 : -1);
        }
    }
}
</script>

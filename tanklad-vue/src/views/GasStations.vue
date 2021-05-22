<template>
    <div v-if="loading" class="row justify-content-center">
        <h1>Loading data...</h1>
    </div>
    <div v-if="!loading" class="container">
        <div class="row justify-content-center">
            <select
                name="retailer"
                @change="retailerChange()"
                v-model="retailer"
                class="form-select form-select-lg mb-3 col-3 mr-5 p-3"
            >
                <option selected value="all">Kõik tanklaketid</option>
                <option
                    v-for="(retailer, index) in retailers"
                    :key="index"
                    v-bind:value="retailer.id"
                >
                    {{ retailer.name }}
                </option>
            </select>
            <select
                id="sort"
                @change="sortChange()"
                v-model="sort"
                class="form-select form-select-lg mb-3 col-2 p-3"
            >
                <option selected value="no-sort">Sorteeri</option>
                <option value="price-growing">
                    Kütuse hinna järgi: Kasvavalt
                </option>
            </select>
        </div>
        <div class="row justify-content-around">
            <div
                v-for="(item, index) in gasStations"
                :key="index"
                class="col-sm-12 col-md-12 col-lg-6 pb-3"
            >
                <GasStation
                    :gasStation="item"
                    :inFavorites="inFavorites(item)"
                    @update:favorite="updateFavorites"
                    @remove:favorite="removeFavorite"
                />
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
    },
})
export default class GasStations extends Vue {
    async mounted(): Promise<void> {
        await store.dispatch("loadGasStations");
        await store.dispatch("loadRetailers");
        await store.dispatch("loadFavorites");
        this.gasStats = store.state.gasstations;
        this.loading = false;
    }

    loading: boolean = true;

    gasStats: IGasStation[] | null = null;
    retailer: string = "all";
    sort: string = "no-sort";

    get favorites(): IGasStation[] | null {
        return store.state.favorites;
    }

    inFavorites(gasStation: IGasStation): boolean {
        console.log("am here");
        if (this.favorites === null) {
            return false;
        }
        return this.favorites.filter((e) => e.id === gasStation.id).length > 0;
    }

    updateFavorites(gasStation: IGasStation): void {
        console.log("adding favs");
        if (
            !(
                store.state.favorites.filter((e) => e.id === gasStation.id)
                    .length > 0
            )
        ) {
            store.dispatch("addFavorite", gasStation.id);
        }
    }

    removeFavorite(gasStation: IGasStation): void {
        if (
            store.state.favorites.filter((e) => e.id === gasStation.id).length >
            0
        ) {
            store.dispatch("removeFavorite", gasStation.id);
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
        this.gasStats = store.state.gasstations.filter((f) => {
            return f.retailerId.includes(this.retailer);
        });
    }

    sortChange(): void {
        if (this.sort === "no-sort") {
        }
        if (this.sort === "price-growing" && this.gasStats != null) {
            this.gasStats.sort(function (a, b) {
                if (a.fuelTypes?.length === 0 || b.fuelTypes?.length === 0) {
                    return 0;
                }
                if (a.fuelTypes[0].price > b.fuelTypes[0].price) {
                    return 1;
                } else if (a.fuelTypes[0].price === b.fuelTypes[0].price) {
                    return 0;
                }
                return -1;
            });
        }
    }
}
</script>

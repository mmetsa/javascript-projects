<template>
    <div class="card h-100 gasstation-card">
        <div class="card-body row">
            <div class="h-85 col-4">
                <img v-if="gasStation.retailerId.includes('0e080da8-57d1-49eb-8083-8f73326443ea')" class="logo" src="https://seeklogo.com/images/A/alexela-logo-D0EC116C33-seeklogo.com.png"/>
                <img v-if="gasStation.retailerId.includes('5326c126-2157-4a52-a3c7-58b2ad1180e3')" class="logo" src="https://ehl.org.ee/wp-content/uploads/2018/10/Olerex-logo.jpg"/>
                <p class="card-text d-none d-sm-block">
                    <small class="text-muted">Last updated today</small>
                </p>
            </div>
            <div class="h-100 col-8">
                <h5 class="row card-title justify-content-center">
                    <div class="row col-11 justify-content-center">
                        {{ gasStation.name.toUpperCase() }}
                    </div>
                    <div class="row col-1">
                        <button @click="addFavorite(gasStation)" class="btn btn-outline-primary btn-sm">+</button>
                    </div>
                </h5>
                <div class="row" v-for="(item, index) in gasStation.fuelTypes" :key="index">
                    <p class="row card-text justify-content-end col-6">
                        <b>{{ gasStation.fuelTypes[index].fuelType.name.toUpperCase() }}:</b>
                    </p>
                    <p class="row card-text justify-content-end col-6">
                        <b>{{ gasStation.fuelTypes[index].price }}€</b>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IGasStation } from "@/domain/IGasStation";
@Options({
    components: {},
    // List all the external properties this component uses.
    props: {
        gasStation: Object,
    },
})
export default class GasStation extends Vue {
    gasStation!: IGasStation;

    addFavorite(gasStation: IGasStation): void {
        this.$emit('update:favorite', gasStation);
    }
}
</script>
<style scoped>
.gasstation-card {
    background-color: paleturquoise;
}

.logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.card-title {
    font-size: 1.5em;
    font-weight: bold;
}
</style>

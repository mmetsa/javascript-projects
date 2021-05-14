<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a class="navbar-brand" href="#">TANKLAD.EE</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
        >
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li v-if="token != null" class="nav-item">
                    <router-link class="nav-link" to="/favorites">Favorites</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/gasstations">Gas Stations</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/map">Map</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About & Help</router-link>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li v-if="token == null" class="nav-item">
                    <router-link class="nav-link" to="/identity/register">Register</router-link>
                </li>
                <li v-if="token == null" class="nav-item">
                    <router-link class="nav-link" to="/identity/login"
                        >Login</router-link
                    >
                </li>
                <li v-if="token != null" class="nav-item">
                    <router-link class="nav-link" to="/identity/profile">{{firstname}} {{lastname}}</router-link>
                </li>
                <li v-if="token != null" class="nav-item">
                    <a href="#" class="nav-link" @click="logOut()">Log out</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <main role="main" class="pb-3">
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
@Options({
    components: {},
})
export default class App extends Vue {
    get token(): string | null {
        return store.state.token;
    }

    get firstname(): string | null {
        return store.state.firstname;
    }

    get lastname(): string | null {
        return store.state.lastname;
    }

    logOut(): void {
        store.commit('logOut');
        this.$router.push('/');
    }
}
</script>

<style scoped>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>

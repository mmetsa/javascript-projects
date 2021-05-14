import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/identity/Login.vue";
import Register from "../views/identity/Register.vue";
import GasStations from "../views/GasStations.vue";
import Map from "../views/Map.vue";
import Profile from "../views/identity/Profile.vue";
import Favorites from "../views/Favorites.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/identity/login",
        name: "identity-login",
        component: Login
    },
    {
        path: "/identity/register",
        name: "identity-register",
        component: Register
    },
    {
        path: "/gasstations",
        name: "gasstations",
        component: GasStations
    },
    {
        path: "/favorites",
        name: "favorites",
        component: Favorites
    },
    {
        path: "/map",
        name: "map",
        component: Map
    },
    {
        path: "/identity/profile",
        name: "identity-profile",
        component: Profile
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

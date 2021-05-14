<template>
    <div>Hello, {{ name }}!</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
    components: {},
    // List all the external properties this component uses.
    props: {
        name: String, // String interface
    },
})
export default class Greeting extends Vue {
    name!: string;
}
</script>

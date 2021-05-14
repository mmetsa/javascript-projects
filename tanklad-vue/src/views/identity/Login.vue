<template>
    <h1>Log in</h1>
    <div class="row">
        <div class="col-md-4">
            <section>
                <form id="account" method="post">
                    <h4>Use a local account to log in.</h4>
                    <hr />
                    <div
                        class="text-danger validation-summary-valid"
                        data-valmsg-summary="true"
                    >
                        <ul>
                            <li style="display: none"></li>
                        </ul>
                    </div>
                    <div class="form-group">
                        <label for="Input_Email">Email</label>
                        <input
                            class="form-control valid"
                            type="email"
                            id="Input_Email"
                            name="Input.Email"
                            v-model="email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="Input_Password">Password</label>
                        <input
                            class="form-control valid"
                            type="password"
                            id="Input_Password"
                            name="Input.Password"
                            v-model="password"
                        />
                    </div>
                    <div class="form-group">
                        <button
                            @click="loginClicked($event)"
                            type="submit"
                            class="btn btn-primary"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
@Options({
    components: {},
})
export default class Login extends Vue {
    email: string = "admin@admin.com";
    password: string = "Foo.Bar1";

    async loginClicked(event: Event): Promise<void> {
        event.preventDefault();
        store.dispatch("logIn", { email: this.email, password: this.password });
        this.$router.push('/')
    }
}
</script>

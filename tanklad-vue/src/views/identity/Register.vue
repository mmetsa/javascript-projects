<template>
    <h1>Register</h1>
    <div class="row">
        <div class="col-md-4">
            <section>
                <form id="account" method="post">
                    <h4>Create a new account.</h4>
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
                        <label for="Input_Firstname">First name</label>
                        <input
                            class="form-control valid"
                            type="text"
                            id="Input_Firstname"
                            name="Input.Firstname"
                            v-model="firstname"
                        />
                    </div>
                    <div class="form-group">
                        <label for="Input_Lastname">Last name</label>
                        <input
                            class="form-control valid"
                            type="text"
                            id="Input_Lastname"
                            name="Input.Lastname"
                            v-model="lastname"
                        />
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
                        <label for="Input_Confirmpassword">Confirm Password</label>
                        <input
                            class="form-control valid"
                            type="password"
                            id="Input_Confirmpassword"
                            name="Input.Confirmpassword"
                            v-model="confirmPassword"
                        />
                    </div>
                    <div class="form-group">
                        <button
                            @click="registerClicked($event)"
                            type="submit"
                            class="btn btn-primary"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </div>
        <div class="col-md-4 justify-content-center">
            <ul class="list-group">
                <li class="list-group-item list-group-item-danger" v-for="(message, index) in messages" :key="index">
                    {{message}}
                </li>
            </ul>
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
    firstname: string = "";
    lastname: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    messages: string[] | null = null;

    valid(): boolean {
        return this.password !== "" && this.password === this.confirmPassword;
    }

    async registerClicked(event: Event): Promise<void> {
        event.preventDefault();
        if (this.valid()) {
            console.log(this.password);
            const result = await store.dispatch("register", { firstname: this.firstname, lastname: this.lastname, email: this.email, password: this.password });
            if (result === true) {
                this.$router.push('/')
            } else {
                this.messages = result;
            }
        } else {
            this.messages = ["Passwords do not match"];
        }
    }
}
</script>

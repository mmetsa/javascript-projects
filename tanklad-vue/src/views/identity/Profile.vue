<template>
    <div class="row justify-content-center">
        <h1>Edit Profile</h1>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="form-group">
                    <label for="firstname"><b>First name</b></label>
                    <input type="text" v-model="firstName" class="form-control" id="firstname" aria-describedby="firstnamehelp" placeholder="Enter First name">
                    <small id="firstnamehelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="lastname"><b>Last name</b></label>
                    <input type="text" v-model="lastName" class="form-control" id="lastname" aria-describedby="lastnamehelp" placeholder="Enter Last name">
                    <small id="lastnamehelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="email"><b>E-mail</b></label>
                    <input type="text" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter new E-mail address">
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <button class="btn btn-primary" @click="confirm()">Confirm</button>
            </div>
            <div class="col-lg-4 col-md-4"></div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="form-group">
                    <label for="password"><b>Current Password</b></label>
                    <input type="password" v-model="pass" class="form-control" id="password" aria-describedby="passwordhelp" placeholder="Enter current password">
                    <small id="passwordhelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="lastname"><b>New password</b></label>
                    <input type="password" v-model="newPass" class="form-control" id="newPassword" aria-describedby="newPasswordHelp" placeholder="Enter new password">
                    <small id="newPasswordHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="repeatNewPassword"><b>Repeat new password</b></label>
                    <input type="password" v-model="confirmPass" class="form-control" id="repeatNewPassword" aria-describedby="repeatnewPasswordHelp" placeholder="Repeat new password">
                    <small id="repeatnewPasswordHelp" class="form-text text-muted"></small>
                </div>
                <button class="btn btn-primary" @click="confirm()">Confirm</button>
            </div>
        </div>
        <div class="row justify-content-center mt-5">
            <ul class="list-group">
                <li class="list-group-item list-group-item-danger" v-for="(error, index) in errors" :key="index">
                    {{error}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import jwtDecode from 'jwt-decode';
import { error } from "node_modules/@types/jquery";
@Options({
    components: {},
})
export default class Profile extends Vue {
    errors: string[] | null = null;

    firstName: string = "";
    lastName: string = "";
    email: string = "";
    pass: string = "";
    newPass: string = "";
    confirmPass: string = "";

    mounted(): void {
        this.firstName = store.state.firstname;
        this.lastName = store.state.lastname;
        if (store.state.token !== null) {
            var decoded: any = jwtDecode(store.state.token)
            this.email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        }
    }

    valid(): boolean {
        return this.newPass === this.confirmPass;
    }

    async confirm(): Promise<void> {
        if (this.valid()) {
            console.log(this.firstName);
            const errors = await store.dispatch('editProfile', { firstname: this.firstName, lastname: this.lastName, email: this.email, password: this.newPass !== "" ? this.newPass : null, currentPassword: this.pass !== "" ? this.pass : null });
            this.errors = errors;
            if (this.errors === undefined) {
                this.errors = ["Successfully updated!"];
            }
        } else {
            this.errors = ["Passwords do not match!"];
        }
    }
}
</script>

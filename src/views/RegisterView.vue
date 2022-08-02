<template>
	<div>
		<h1>Register</h1>
		<form @submit.prevent="registerUser()">
			<input v-model="email" placeholder="Email" type="email" />
			<br />
			<input v-model="password" placeholder="Password" type="password" />
			<br />
			<button type="submit" :disabled="userStore.loadingUser">
				Submit
			</button>
		</form>
	</div>
</template>

<script setup>
import { useUserStore } from "../stores/user.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

const registerUser = () => {
	userStore.registerUser(email.value, password.value);
	router.push({ name: "home" });
	email.value = "";
	password.value = "";
};

const email = ref("");
const password = ref("");
</script>

<style lang="scss" scoped></style>

<template>
	<div>
		<h1>Login</h1>
		<form @submit.prevent="login()">
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
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const userStore = useUserStore();

const router = useRouter();

const login = () => {
	userStore.emailSignIn(email.value, password.value);
	email.value = "";
	password.value = "";
	router.push({ name: "home" });
};
const email = ref("");
const password = ref("");
</script>

<style lang="scss" scoped></style>

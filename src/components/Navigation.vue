<template>
	<nav>
		<router-link v-if="userStore.isUserLogged" :to="{ name: 'home' }"
			>Home |
		</router-link>
		<router-link v-if="!userStore.isUserLogged" :to="{ name: 'login' }"
			>Login |
		</router-link>
		<router-link v-if="!userStore.isUserLogged" :to="{ name: 'register' }"
			>Register
		</router-link>
		<button
			v-if="userStore.isUserLogged"
			@click="userStore.userSignOut()"
			:disabled="userStore.loadingUser"
		>
			Sign Out
		</button>
	</nav>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();
</script>

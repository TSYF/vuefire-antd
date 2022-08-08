<template>
	<nav>
		<router-link v-if="isLogged" :to="{ name: 'home' }"
			>Home |
		</router-link>
		<router-link v-if="!isLogged" :to="{ name: 'login' }"
			>Login |
		</router-link>
		<router-link v-if="!isLogged" :to="{ name: 'register' }"
			>Register
		</router-link>
		<button v-if="isLogged" @click="signOut()" :disabled="loadingUser">
			Sign Out
		</button>
	</nav>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import { computed } from "vue";
const userStore = useUserStore();

const isLogged = computed(() => userStore.isUserLogged);

const signOut = userStore.userSignOut;

const loadingUser = userStore.loadingUser;
</script>

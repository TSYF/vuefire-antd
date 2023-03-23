<template>
	<a-menu
		v-model:selectedKeys="selectedKeys"
		theme="dark"
		mode="horizontal"
		:style="{ lineHeight: '64px' }"
	>
		<a-menu-item
			key="home"
			v-if="isLogged"
		>
			<router-link :to="{ name: 'home' }">Home</router-link>
		</a-menu-item>
		<a-menu-item
			key="profile"
			v-if="isLogged"
		>
			<router-link :to="{ name: 'profile' }">Profile</router-link>
		</a-menu-item>
		<a-menu-item
		key="login"
		v-if="!isLogged"
		>
			<router-link :to="{ name: 'login' }">Login</router-link>
		</a-menu-item>
		<a-menu-item
			key="register"
			v-if="!isLogged"
		>
			<router-link :to="{ name: 'register' }">Register</router-link>
		</a-menu-item>
		<a-menu-item
			@click="signOut()"
			:disabled="loadingUser"
			key="logout"
			v-if="isLogged"
		>
			Sign Out
		</a-menu-item>
	</a-menu>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const userStore = useUserStore();

const isLogged = computed(() => userStore.isUserLogged);

const router = useRouter();

const signOut = () => userStore.userSignOut().then(() => router.push({ name: "login" }));

const loadingUser = userStore.loadingUser;

const route = useRoute();

const selectedKeys = ref([]);

watch(
	() => route.name,
	() => (selectedKeys.value = [route.name])
);
</script>

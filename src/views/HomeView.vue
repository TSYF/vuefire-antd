<template>
	<div>
		<h1>Hellow</h1>
		<h3>{{ userStore.user.email }}</h3>
		<h3>{{ userStore.user.uid }}</h3>
		<br />
		<URLForm />
		<URLList />
	</div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import URLList from "../components/URLList.vue";
import URLForm from "../components/URLForm.vue";

const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>

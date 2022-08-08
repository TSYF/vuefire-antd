<template>
	<div>
		<h1>Hellow</h1>
		<h3>{{ userStore.user.email }}</h3>
		<h3>{{ userStore.user.uid }}</h3>
		<br />
	</div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>

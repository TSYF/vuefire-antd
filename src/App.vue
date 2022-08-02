<template>
	<navigation v-if="!userStore.loadingSession" />
	<h2 v-else>Loading User...</h2>
	<router-view></router-view>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import Navigation from "./components/Navigation.vue";

const userStore = useUserStore();
</script>

<style scoped></style>

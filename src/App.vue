<template>
	<a-layout class="layout">
		<a-layout-header v-if="!loadingSession">
			<navigation />
		</a-layout-header>
		<a-layout-content style="padding: 0 50px">
			<h2 v-if="loadingSession">Loading User...</h2>
			<router-view></router-view>
		</a-layout-content>
	</a-layout>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import Navigation from "@/components/Navigation.vue";

const userStore = useUserStore();
const loadingSession = userStore.loadingSession;
</script>

<style scoped>
main {
	min-height: 100%;
	margin-top: 2rem;
}

section {
	min-height: 100vh;
}
</style>

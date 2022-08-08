<template>
	<form @submit.prevent="handleSubmit()">
		<input v-model="url" placeholder="Insert URL" type="text" name="url" />
		<button type="submit">Agregar</button>
	</form>
</template>

<script setup>
import { ref } from "vue";
import { useURLStore } from "@/stores/urls.js";

const URLStore = useURLStore();

const url = ref("");

const handleSubmit = () => {
	URLStore.addURL(url.value);
	url.value = "";
};
</script>

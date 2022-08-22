<template>
	<form @submit.prevent="handleSubmit()">
		<h3>Editar URL</h3>
		<input
			v-model="url"
			type="text"
			placeholder="Insert URL"
			name="url_edit"
		/>
		<button type="submit">Edit</button>
	</form>
</template>

<script setup>
import { ref } from "vue";
import { useURLStore } from "@/stores/urls.js";

const URLStore = useURLStore();

const { doc } = defineProps({
	doc: Object,
});

const url = ref("");

const handleSubmit = () => {
	URLStore.editURL(doc.id, url.value);
	url.value = "";
};
</script>

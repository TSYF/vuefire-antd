<template>
	<div>
		<p v-if="URLStore.loadingDocs">Loading...</p>
		<ul v-else>
			<li v-for="document of documents" :key="document.id">
				<pre v-if="!document.editing">
ID: {{ document.id }}
NAME: {{ document.name }}
SHORT:{{ document.short }}
USER: {{ document.user }}
<button @click="URLStore.deleteURL(document.id)">Delete</button>
<button @click="document.editing = true">Edit</button>
				</pre>
				<EditURL v-else :doc="document" />
			</li>
		</ul>
	</div>
</template>

<script setup>
import { useURLStore } from "@/stores/urls.js";
import { computed } from "vue";
import EditURL from "./EditURL.vue";

const URLStore = useURLStore();

const documents = computed(() => URLStore.documents);

URLStore.getURLS();
</script>

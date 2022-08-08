<template>
	<div>
		<p v-if="URLStore.loadingDocs">Loading...</p>
		<ul v-else>
			<li v-for="document of documents" :key="document.id">
				<pre>
ID: {{ document.id }}
NAME: {{ document.name }}
SHORT:{{ document.short }}
USER: {{ document.user }}
				</pre
				>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { useURLStore } from "@/stores/urls.js";
import { computed } from "vue";

const URLStore = useURLStore();

const documents = computed(() => URLStore.documents);

URLStore.getURLS();
</script>

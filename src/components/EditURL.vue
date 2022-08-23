<template>
	<a-form
		name="editForm"
		:model="formState"
		layout="vertical"
		@finish="handleSubmit()"
	>
		<a-form-item
			name="editURL"
			:label="'Edit URL ' + doc.name + ':'"
			style="max-width: 40%"
			:rules="{
				required: true,
				whitespace: true,
				message: 'Enter a valid URL',
				pattern: URLStore.regex
			}"
		>
			<a-input
				v-model:value="formState.url"
				type="text"
				placeholder="URL"
				name="url_edit"
			/>
		</a-form-item>
		<a-row>
			<a-form-item style="margin-right: 1rem;">
				<a-button
					html-type="submit"
					type="primary"
				>Edit</a-button>
			</a-form-item>
			<a-form-item>
				<a-button @click="doc.editing = false">Cancel</a-button>
			</a-form-item>
		</a-row>
	</a-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useURLStore } from "@/stores/urls.js";

const URLStore = useURLStore();

const { doc } = defineProps({
	doc: Object,
});

const handleSubmit = () => {
	URLStore.editURL(doc.id, formState.url)
		.then((res) => formState.url = "" || res)
		.then(() => message.success("URL Edited!"))
		.catch(() => message.error("Something went wrong... :c"));
};

const formState = reactive({
	url: ""
})
</script>

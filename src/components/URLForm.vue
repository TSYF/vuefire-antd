<template>
	<a-form
		name="URLForm"
		autocomplete="off"
		layout="inline"
		:model="formState"
		@finish="handleSubmit()"
	>
		<a-form-item
			name="url"
			label="URL"
			:rules="{
				required: true,
				whitespace: true,
				pattern: URLStore.regex,
				message: 'Enter a valid URL'
			}"
		>
			<a-input
				v-model:value="formState.url"
				placeholder="URL"
				type="text"
				name="url"
			/>
		</a-form-item>
		<a-form-item>
			<a-button
				html-type="submit"
				type="primary"
				:disabled="URLStore.loadingAddingDocs"
				:loading="URLStore.loadingAddingDocs"
			>Agregar</a-button>
		</a-form-item>
	</a-form>
</template>

<script setup>
import { reactive } from 'vue';
import { useURLStore } from "@/stores/urls.js";
import { message } from 'ant-design-vue';

const URLStore = useURLStore();


const formState = reactive({ url: "" })

const handleSubmit = () => {
	URLStore.addURL(formState.url)
		.then((res) => formState.url = "" || res)
		.then(() => message.success("URL Added!"))
		.catch(() => message.error("Something went wrong... :c"));
};
</script>

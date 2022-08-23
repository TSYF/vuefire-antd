<template>
	<a-row :style="{
		padding: '3em'
	}">
		<a-col
			:xs="{ span: 24 }"
			:lg="{ span: 12, offset: 6 }"
		>
			<a-form
				name="login"
				:model="user"
				autocomplete="on"
				layout="vertical"
				:rules="{
					required: true,
					whitespace: true
				
				}"
				@finish="registerUser()"
			>

				<a-form-item
					name="email"
					:rules="{
						message: 'Email must not be empty and must be valid',
						type: 'email',
					}"
				>
					<a-input
						v-model:value="user.email"
						placeholder="Email"
						type="email"
					>
						<template #prefix>
							<UserOutlined />&nbsp;
						</template>
					</a-input>
				</a-form-item>


				<a-form-item
					name="password"
					:rules="{
						message: 'Password must not be empty and must have at least 6 characters',
						min: 6,
					}"
				>
					<a-input-password
						v-model:value="user.password"
						placeholder="Password"
						html-type="password"
					>
						<template #prefix>
							<LockOutlined />&nbsp;
						</template>
					</a-input-password>
				</a-form-item>


				<a-form-item
					name="checkPassword"
					autocomplete="off"
					:rules="{
						min: 6,
						validator: checkPass,
					}"
				>
					<a-input-password
						v-model:value="user.checkPassword"
						placeholder="Confirm Password"
						html-type="password"
					>
						<template #prefix>
							<LockOutlined />&nbsp;
						</template>
					</a-input-password>
				</a-form-item>


				<a-form-item>
					<a-button
						name="registerButton"
						html-type="submit"
						:disabled="userStore.loadingUser"
						:loading="userStore.loadingUser"
					>
						Submit
					</a-button>
				</a-form-item>
			</a-form>
		</a-col>
	</a-row>
</template>

<script setup>
import { useUserStore } from "../stores/user.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

const userStore = useUserStore();

const router = useRouter();

const registerUser = () => {
	userStore.registerUser(user.email, user.password)
		.then((res) => {
			user.email = "";
			user.password = "";
			return res;
		}).then((errorCode) => {
			if (!errorCode) return message.success("Successful registry");

			switch (errorCode) {
				case "auth/invalid-email":
					message.error("Credentials don't meet requirements.")
					break;
				case "auth/invalid-password":
					message.error("Credentials don't meet requirements.")
					break;
				case "auth/email-already-in-use":
					message.error("Email already in use")
					break;
				default:
					message.error("Something went wrong... :c")
					break;
			}
		});
};

const user = reactive({
	email: "",
	password: "",
	checkPassword: ""
})

const checkPass = async (_rule, value) => ((value !== user.password) ? Promise.reject('Passwords don\'t match') : Promise.resolve());

</script>

<style lang="scss" scoped>
</style>

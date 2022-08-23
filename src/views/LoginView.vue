<template>
	<a-row :style="{
		padding: '3em'
	}">
		<!--Definitions:

			span: int = Defines ammount of column space which current column uses. There's 24 columns per row.
			offset: int = Defines ammount of empty columns before current one.

			Span and offset can be set as individual attributes, or as an attribute
			belonging to an object binded to a breakpoint prop.

			Breakpoints' prop names:
				xs, sm, md, lg, xl, xxl, xxxl
		-->
		<a-col
			:xs="{ span: 24 }"
			:lg="{ span: 12, offset: 6 }"
		>
			<!--Definitions:

				:model: {} = Variable that is to be used for validation purposes
				name = ?
				autocomplete: [on|off] = Self-explainatory
				@finish = Replaces @submit.prevent for the purpose of applying validations beforehand
				layout: [vertical|horizontal] = Defines the form's content distribution
			-->
			<a-form
				:model="user"
				name="login"
				autocomplete="on"
				layout="vertical"
				@finish="login()"
			>
				<!--Definitions:

					name = ?
					:rules: {} = Object which content will define how antd goes about validating
			-->
				<a-form-item
					name="email"
					:rules="{
						required: true, //: boolean = Self-explainatory
						message: 'Email must not be empty and must be valid', //: string = Message to be displayed when rules aren't met
						type: 'email', //: string = For field type specific validations (like with email syntax)
						whitespace: true //: boolean = For treating whitespace as an error
					}"
				>
					<a-input
						v-model:value="user.email"
						placeholder="Email"
						type="email"
					>
						<template #prefix>
							<user-outlined class="user-outlined" />&nbsp;
						</template>
					</a-input>
				</a-form-item>
				<a-form-item
					name="password"
					:rules="{
						required: true,
						message: 'Password must not be empty and must have at least 6 characters',
						min: 6, //: int = Minimum character length to be accepted
						whitespace: true
					}"
				>
					<a-input-password
						v-model:value="user.password"
						placeholder="Password"
					>
						<template #prefix>
							<lock-outlined />&nbsp;
						</template>
					</a-input-password>
				</a-form-item>
				<a-form-item>
					<a-button
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
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue"
import { useUserStore } from "@/stores/user.js"
import { useRouter } from "vue-router";
import { reactive } from "vue";

const userStore = useUserStore();

const router = useRouter();

const login = async () => {
	userStore.emailSignIn(user.email, user.password)
		.then((res) => {
			router.push({ name: "home" })
			user.email = "";
			user.password = "";
			return res;
		}).then((errorCode) => {
			if (!errorCode) return message.success("Successful sign in");

			switch (errorCode) {
				case "auth/user-not-found":
					message.error("Invalid credentials.");
					break;
				case "auth/wrong-password":
					message.error("Invalid credentials.")
					break;
				case "auth/invalid-password":
					message.error("Credentials don't meet requirements.")
					break;
				default:
					message.error("Something went wrong... :c")
					break;
			}
		});

};

const user = reactive({
	email: 'tomas.y@tutanota.com',
	password: '123456',
})
</script>

<style lang="scss" scoped>
</style>

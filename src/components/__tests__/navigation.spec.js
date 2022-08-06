import Navigation from "../Navigation.vue";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import "@/main.js";

describe("Navigation", () => {
	const wp = mount(Navigation);

	it("Exists", () => {
		expect(wp.exists()).toBe(true);
	});
});

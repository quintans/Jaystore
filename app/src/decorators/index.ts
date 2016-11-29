'use strict';
import * as Vue from 'vue';
import { createDecorator } from 'vue-class-component';

/**
 * listen bus events factory.
 * based on https://github.com/kaorun343/vue-property-decorator/blob/master/src/vue-property-decorator.ts
 */
export function listenFactory(bus: Vue): (event?: string) => MethodDecorator {
	return (event) => {
		return createDecorator((componentOptions, propertyKey) => {
			const key = event || propertyKey;
			const mix = {
				created: function () {
					bus.$on(key, this[propertyKey]);
				},
				beforeDestroy: function () {
					bus.$off(key, this[propertyKey]);
				}
			};
			(componentOptions.mixins || (componentOptions.mixins = [])).push(mix);
		});
	}
}

/**
 * @desc State redirects the calls to $store.state. see http://vuex.vuejs.org/en/state.html
 * @param {state} name of the state to use. If the name is empty, uses the original function name
 * @param {module} comma separated modules
 */
export function State(state?: string, modules?: string): MethodDecorator {
	let parts;
	if (modules) {
		parts = modules.split('.');
	}

	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const key = state || propertyKey;
		descriptor.get = function () {
			let obj = this.$store.state;
			if (parts) {
				parts.forEach(e => obj = obj[e]);
			}
			return obj[key];
		};

		return descriptor;
	}
}

/**
 * @desc Getter redirects the calls to store Action. see http://vuex.vuejs.org/en/getters.html
 * @param {getter} name of the getter to use. If the name is empty, uses the original function name
 */
export function Getter(getter?: string): MethodDecorator {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const key = getter || propertyKey;
		descriptor.get = function () {
			return this.$store.getters[key];
		};

		return descriptor;
	}
}

/**
 * @desc Mutation redirects the calls to $store.commit. see http://vuex.vuejs.org/en/mutations.html
 * @param {mutation} name of the action to dispath. If the name is empty, uses the original function name
 */
export function Mutation(mutation?: string): MethodDecorator {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const key = mutation || propertyKey;
		descriptor.value = function (payload: any) {
			return this.$store.commit(key, payload);
		};

		return descriptor;
	}
}

/**
 * @desc Action redirects the calls to $store.dispatch. see http://vuex.vuejs.org/en/actions.html
 * @param {action} name of the action to dispath. If the name is empty, uses the original function name
 */
export function Action(action?: string): MethodDecorator {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const key = action || propertyKey;
		descriptor.value = function (payload: any) {
			return this.$store.dispatch(key, payload);
		};

		return descriptor;
	}
}

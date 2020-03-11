require('jsdom-global')();

const assert = require('assert');

const Vue = require('vue');
const VueTestUtils = require('@vue/test-utils');

const App = Vue.component('app', {
    data() {
        return {
            regular: '',
            lazy: '',
        };
    },

    template: `
        <div>
            <input type="text" v-model="regular" class="regular">
            <input type="text" v-model.lazy="lazy" class="lazy">
        </div>
    `
});

const wrapper = VueTestUtils.mount(App);

const regular = wrapper.find('.regular');
const lazy = wrapper.find('.lazy');

regular.setValue('regular');
lazy.setValue('lazy');

assert.strictEqual(wrapper.vm.$data.regular, 'regular'); // - OK!


assert.strictEqual(wrapper.vm.$data.lazy, 'lazy'); // - FAIL!


lazy.trigger('change'); // Must be called for model update to occur
assert.strictEqual(wrapper.vm.$data.lazy, 'lazy'); // - OK

process.stdout.write("Tests complete.\n");

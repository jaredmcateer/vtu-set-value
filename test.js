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

assert.strictEqual(wrapper.vm.$data.regular, 'regular');
assert.strictEqual('lazy', wrapper.vm.$data.lazy);


lazy.trigger('change');
assert.strictEqual(wrapper.vm.$data.lazy, 'lazy');

process.stdout.write("Tests complete.\n");

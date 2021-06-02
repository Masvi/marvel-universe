import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue';

const wrapper = shallowMount(Footer)

describe('Footer.vue', () => {
  it('Footer should be a valid vue component', () => {
    expect(wrapper).toMatchSnapshot();
  })
});

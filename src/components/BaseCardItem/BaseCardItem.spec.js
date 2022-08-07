import { createLocalVue, shallowMount } from "@vue/test-utils"
import BaseCardItem from "./BaseCardItem.vue";

const mock = { 
  name: 'Frajola',
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16/',
    extension: 'jpg'
  }
}

const localVue = createLocalVue();

describe("[BaseCardItem]", () => {
  test('should render correctly', () => {
    const wrapper = shallowMount(BaseCardItem, {
      localVue,
      propsData: {
        character: {
          ...mock
        }
      }
    });
    expect(wrapper.props().character.name).toBe('Frajola');
  });
});

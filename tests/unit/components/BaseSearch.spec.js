import { shallowMount } from "@vue/test-utils";
import BaseSearch from "@/components/BaseSearch.vue";

describe("SearchBox.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseSearch);
  });

  it("Emits a input event when Value is changed", async () => {
    const textInput = wrapper.find('input[type="text"]')
    await textInput.setValue('Hulk')

    expect(wrapper.find('input[type="text"]').element.value).toBe('Hulk');
  });

  it('Expect to have the default props defined', () => {
    expect(wrapper.vm.value).toBe('')
  })

  it("Displays error when Error is truthy", async () => {
    await wrapper.setData({
      error: true,
    });
    expect(wrapper.find(".base-search__warning").isVisible()).toBeTruthy();
  });
});

import { shallowMount } from '@vue/test-utils'
import BaseToggle from "@/components/BaseToggle.vue";

describe("BaseButton.vue", () => {
  let wrapper;
  let toggle;

  beforeEach(() => {
    wrapper = shallowMount(BaseToggle);
    toggle = wrapper.find(".base-toggle");
  });

  it("Emits a click event when it's clicked", () => {
    toggle.trigger("click");
    expect(wrapper.emitted().click);
  });
  
});

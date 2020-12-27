import { shallowMount } from '@vue/test-utils'
import 'jest-localstorage-mock';
import Records from '@/components/Records.vue'

describe('Records.vue', () => {
  it('gets records from local storage', () => {
    shallowMount(Records, {})
    expect(localStorage.getItem).toHaveBeenCalledWith('records');
  })
})

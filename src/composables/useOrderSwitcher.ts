import { Ref, computed, reactive } from 'vue'
import { OrderType } from '@/types/BasicTypes.ts'

export interface OrderOptionInterface {
  id: number,
  title: string
  value: OrderType,
  selected: boolean,
}

export interface SelectedOptionParams {
  width: number,
  height: number,
  top: number,
  left: number,
}

const state = reactive({
  orderOptions: [
    {
      id: 1,
      title: 'Latest',
      value: 'latest'
    },
    {
      id: 2,
      title: 'Popular',
      value: 'popular'
    }
  ] as OrderOptionInterface[],

  // selectedValue: props.order as OrderType,
  selectedValue: 'popular' as OrderType,

  selectedOptionParams: {
    width: 0,
    left: 0,
    top: 0,
    height: 0
  } as SelectedOptionParams
})

export function useOrderSwitcher(elements: Ref<HTMLElement[]>) {
  const orderOptions = computed(() => {
    return state.orderOptions
  })

  const styles = computed(() => {
    return Object
      .keys(state.selectedOptionParams)
      .map((key) => `${key}: ${state.selectedOptionParams[key as keyof SelectedOptionParams]}px`)
      .join('; ')
  })

  function isSelectedOption(selected: OrderType, value: OrderType) {
    return selected === value
  }

  function getSelectedOptionParams() {
    if (elements) {
      const target = elements.value.find((option: HTMLElement) => option.classList.contains('selected'))
      const { offsetWidth, offsetLeft, offsetTop, offsetHeight } = target as HTMLElement

      return {
        width: offsetWidth,
        height: offsetHeight,
        left: offsetLeft,
        top: offsetTop
      }
    } else {
      console.log('option not found')
    }
  }

  function setSelectedOptionParams() {
    const params = getSelectedOptionParams()

    if (params) {
      state.selectedOptionParams = params
    }
  }

  return {
    styles,
    orderOptions,
    isSelectedOption,
    setSelectedOptionParams
  }
}
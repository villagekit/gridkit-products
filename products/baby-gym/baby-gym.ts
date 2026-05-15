import type { Params, Parts, PartsFn, Presets } from '@villagekit/design/kit'

export const parameters = {
  ladderLength: {
    label: 'Ladder length',
    shortId: 'll',
    type: 'number',
    min: 5,
    max: 20,
    step: 5,
  },
  rungSpacing: {
    label: 'Rung spacing',
    shortId: 'rs',
    type: 'number',
    min: 2,
    max: 6,
  },
} satisfies Params

export const presets: Presets<typeof parameters> = [
  {
    id: 'regular',
    label: 'Regular',
    values: {
      ladderLength: 20,
      rungSpacing: 4
    },
  },
]

export const parts: PartsFn<typeof parameters> = (parameters) => {
  const { ladderLength, rungSpacing } = parameters

  return [] satisfies Parts
}

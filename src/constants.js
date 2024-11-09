// import {ref} from "vue"
import BackspaceSvg from './assets/backspace-outline.svg'
import DivisionSvg from './assets/division.svg'
import MultiplySvg from './assets/multiply-line.svg'
import PlusMinusSvg from './assets/round-plus-minus.svg'

export const buttons = [
  { id: 1, title: 'AC', color: 'red-500', dark: 'slate-500' },
  {
    id: 2,
    title: 'backspace',
    color: '',
    src: BackspaceSvg,
    show: true,
    alt: 'backspace',
    dark: 'slate-500'
  },
  { id: 3, title: '%', color: 'emerald-600', dark: 'slate-50' },
  {
    id: 4,
    title: '/',
    color: 'emerald-600',
    src: DivisionSvg,
    show: true,
    alt: 'division',
    dark: 'slate-50'
  },
  { id: 5, title: '7', color: 'slate-400' },
  { id: 6, title: '8', color: 'slate-400' },
  { id: 7, title: '9', color: 'slate-400' },
  {
    id: 8,
    title: '*',
    color: 'emerald-600',
    src: MultiplySvg,
    show: true,
    alt: 'multiply',
    dark: 'slate-50'
  },
  { id: 9, title: '4', color: 'slate-400' },
  { id: 10, title: '5', color: 'slate-400' },
  { id: 11, title: '6', color: 'slate-400' },
  { id: 12, title: '-', color: 'emerald-600', dark: 'slate-50' },
  { id: 13, title: '1', color: 'slate-400' },
  { id: 14, title: '2', color: 'slate-400' },
  { id: 15, title: '3', color: 'slate-400' },
  { id: 16, title: '+', color: 'emerald-600', dark: 'slate-50' },
  { id: 17, title: '+/-', color: 'gray-600', src: PlusMinusSvg, show: true, alt: 'plus-minus' },
  { id: 18, title: '0', color: 'slate-400' },
  { id: 19, title: '.', color: 'gray-600' },
  { id: 20, title: '=', color: 'emerald-600', dark: 'slate-50' }
]

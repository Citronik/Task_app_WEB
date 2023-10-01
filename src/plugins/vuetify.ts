/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, ThemeDefinition } from 'vuetify'

// Utilities
const plateformLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const plateformDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#121212',
    primary: '#BB86FC',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#CF6679',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#37474F',
          secondary: '#5CBBF6',
        },
      },
      plateformLightTheme,
      plateformDarkTheme,
    },
  },
})

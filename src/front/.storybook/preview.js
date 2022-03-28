// import '../src/index.css';
import '../src/components/Layout/reset.css';
import 'semantic-ui-css/semantic.min.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}



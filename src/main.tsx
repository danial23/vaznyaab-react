import App from './App.tsx'
import r2wc from '@r2wc/react-to-web-component'

const WebComponent = r2wc(App)

customElements.define('vaznyaab-wc', WebComponent)

export default App

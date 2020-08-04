import App from 'lib/app'
import Component from 'lib/component'

// Include Global Application styles
import '@/scss/styles.scss'

// Test class for a custom defined component
class Subheader extends Component {
    constructor() {
        super('Subheader', '<h4>Beep boop!</h4>')
    }
}

// Create a new application
new App(`
    <h1>Hello World</h2>
    <Subheader></Subheader>
`, { Subheader })

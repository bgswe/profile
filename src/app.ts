import App from 'lib/app'

import Subheader from '@/components/subheader'


// Include Global Application styles
import '@/scss/styles.scss'

// Create a new application
class MyApp extends App {
    constructor() {
        super(`
            <h1>Hello World</h2>
            <Subheader ref="sub"></Subheader>
        `, { Subheader })
    }
}

new MyApp()


import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import ImageLoader from '../lib'

let preloader = new Preloader()
preloader.register( new ImageLoader() )

preloader.load( 'http://fillmurray.com/100/100?jpg' )
preloader.load( 'http://fillmurray.com/200/200?jpg' )
preloader.load( './awesomes.jpg' )

preloader.on( EVENTS.LOAD, event => {
    console.log( '-- load' )
    console.log( event )
})
preloader.on( EVENTS.COMPLETE, res => {
    console.log( '-- COMPLETE' )
    console.log( res )
})

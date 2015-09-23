
import tape from 'tape'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import ImageLoader from '../lib'

tape( 'Should expose imageLoader as the name of the module loader', t => {
    t.plan( 1 )

    let imageLoader = new ImageLoader()

    t.equal( imageLoader.name, 'imageLoader' )
})

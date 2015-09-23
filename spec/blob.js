
import tape from 'tape'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import ImageLoader from '../lib'

tape( 'imageLoader should default to returning the raw response not a blob', t => {
    t.plan( 1 )

    let imageLoader = new ImageLoader()

    t.notOk( imageLoader.blob )
})

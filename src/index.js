
import 'whatwg-fetch'
import { EVENTS } from 'preload.io'

export default class ImageLoader {
    constructor() {
        this.name = 'imageLoader'
        this.match = /jpg$|jpeg$|png$/
    }

    load( ctx, opts ) {
        let image = new Image()
        image.addEventListener( 'load', event => {
            ctx.emit( EVENTS.LOAD, {
                id: opts.id,
                status: 200,
                res: event
            })
        })
        image.addEventListener( 'error', event => {
            ctx.emit( EVENTS.LOAD, {
                id: opts.id,
                status: 500,
                error: event
            })
            ctx.emit( EVENTS.LOAD_ERROR, {
                id: opts.id,
                error: event
            })
        })
        image.src = opts.url
    }
}

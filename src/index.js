
import 'whatwg-fetch'
import { EVENTS } from 'preload.io'


class IOError extends Error {
    constructor( opts ) {
        super( opts.message )

        this.name = 'IOError'
        this.stack = ( new Error() ).stack

        Object.keys( opts ).forEach( key => {
            this[ key ] = opts[ key ]
        })
    }
}


export default class ImageLoader {
    constructor() {
        this.name = 'imageLoader'
        this.match = /jpg$|jpeg$|png$/
    }

    async load( ctx, opts ) {
        // @TODO optionally use old school tag loading
        try {
            let res = await fetch( opts.url )
                .then( response => {
                    if ( response.status >=200 && response.status < 300 ) {
                        return response
                    }

                    throw new IOError({
                        message: response.statusText,
                        status: response.status
                    })
                })

            let blob = await res.blob()

            ctx.emit( EVENTS.LOAD, {
                id: opts.id,
                status: res.status,
                res: blob
            })
        } catch( err ) {
            ctx.emit( EVENTS.LOAD_ERROR, {
                id: opts.id,
                status: err.status,
                res: err
            })
        }
    }
}

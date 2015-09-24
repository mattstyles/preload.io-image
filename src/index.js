import 'regenerator/runtime'
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
    constructor( opts ) {
        this.opts = Object.assign({
            blob: false
        }, opts )
        this.name = 'imageLoader'
        this.match = /jpg$|jpeg$|png$/
    }

    async load( ctx, opts ) {
        // @TODO optionally use old school tag loading
        let res = null
        let blob = null
        try {
            res = await fetch( opts.resource )
                .then( response => {
                    if ( response.status >=200 && response.status < 300 ) {
                        return response
                    }

                    throw new IOError({
                        message: response.statusText,
                        status: response.status
                    })
                })

            if ( this.opts.blob ) {
                blob = await res.blob()
            }
        } catch( err ) {
            ctx.emit( EVENTS.LOAD_ERROR, {
                id: opts.id,
                status: err.status,
                res: err
            })
            return
        }

        ctx.emit( EVENTS.LOAD, {
            id: opts.id,
            status: res.status,
            res: blob || res
        })
    }
}

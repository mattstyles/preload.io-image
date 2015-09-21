
import 'whatwg-fetch'

export default class ImageLoader {
    constructor() {
        this.name = 'imageLoader'
        this.match = /jpg$|jpeg$|png$/
    }

    load( ctx, opts ) {
        return new Promise( async ( resolve, reject ) => {
            let image = new Image()
            image.addEventListener( 'load', event => {
                resolve({
                    id: opts.id,
                    status: 200,
                    res: event
                })
            })
            image.addEventListener( 'error', event => {
                reject({
                    id: opts.id,
                    status: 200,
                    res: event
                })
            })
            image.src = opts.url
        })
    }
}

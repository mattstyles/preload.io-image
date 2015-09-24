# preload.io-image

> Preload.io loader for images

```shell
npm i -S preload.io-image
```

## Getting Started

Install [preload.io](https://github.com/mattstyles/preload.io) and register the image loader with it

```js
import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import ImageLoader from 'preload.io-image'

let preloader = new Preloader()
preloader.register( new ImageLoader() )
```

Then load the resource and it’ll be preloaded by the browser and cached

```js
preloader.load( '/assets/avatar.jpg' )
```

## Matches

The `ImageLoader` will match on `jpg`, `jpeg` and `png` resources.

## Accessing the blob

The blob returned by fetch when grabbing an image can also be processed if you really need to but this is done at instantiation for all resources loaded with the loader (although there is nothing stopping you instantiating multiple image loaders)

```js
preloader.register( new ImageLoader({
    blob: true
}))

let id = preloader.load( '/assets/user.jpg' )

preloader.on( EVENTS.LOAD, event => {
    if ( event.id === id ) {
        let image = new Image()
        let urlCreator = window.URL || window.webkitURL
        let imageURL = urlCreator.createObjectURL( event.res )
        image.src = imageURL

        document.body.appendChild( image )
    }
})
```

The blob instantiation parameter will return the blob with the load event, or you can search for it from all of the responses on the load complete event.

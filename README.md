# preload.io-image

> Preload.io loader for images

## Installation

```sh
npm i -S preload.io-image
```

## Polyfills

Image requires a few polyfills to work everywhere, to give some flexibility they are not included by default.

```sh
npm i -S whatwg-fetch regenerator
```

```js
import 'regenerator/runtime'
import 'whatwg-fetch'
```

`Regenerator` is currently a requirement for the async stuff, but a version is included with `babel-polyfill` so if you’re using that then you’re good to go. Use whichever version of `fetch` you like, if necessary.

There will be a fairly obvious console error logged if these are omitted.

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

## Passing options to fetch

`ImageLoader` uses `fetch` to preload the resource, options you supply will be passed to `fetch`, in this order of precedence:

```js
preloader.load({
  resource: 'image.jpg',
  options: {
    mode: 'no-cors'
  }
})
```

```js
const imageLoader = new ImageLoader({
  mode: 'no-cors'
})
```

```js
const preloader = new Preloader({
  mode: 'no-cors'
})
```

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

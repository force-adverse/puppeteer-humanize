# Puppeteer-Humanize

![puppeteer-humanize](https://user-images.githubusercontent.com/65471523/127490800-15cba5e4-f94e-4d19-9960-e02c847b9361.jpg)


Humanizer functions for Puppeteer

## Install

```shell
$ npm install @forad/puppeteer-humanize
```

## Example

Below is an example of the `typeInto` function.

```typescript

import { typeInto, TypeIntoConfig } from "@forad/puppeteer-humanize"
import { launch, Browser, Page, ElementHandle } from "puppeteer-extra"


;( async () => {
    const browser: Browser = await launch()
    const page: Page = await browser.newPage()

    await page.goto(`https://foo.bar`)

    const input: ElementHandle | undefined = await page.$(`input#my-input`)

    if (input) {
        // Text to enter into input.
        const text: string = `Zero Cool? Crashed fifteen hundred and seven computers in one day? Biggest crash in history, front page New York Times August 10th, 1988. I thought you was black, man. YO THIS IS ZERO COOL!`
        // Optional action configuration.
        // See `schemas/configs.ts` for full configuration shape.
        const config: TypeIntoConfig = {
            mistakes: {
                chance: 8,
                delay: {
                    min: 50,
                    max: 500
                }
            },
            delays: {
                space: {
                    chance: 70,
                    min: 10,
                    max: 50
                }
            }
        }
        // Deploy the action...
        await typeInto(input, text, config)
    }

    console.log(`Input complete!`)
} )()


```

## Implemented

- [x] `typeInto(element, text, config)`

## Roadmap

- [ ] GAN Mouse movement actions
- [ ] Improve typing actions
- [ ] Suggest stuff in [Discord](https://extra.community/) or [Discussions](https://github.com/force-adverse/puppeteer-humanize/discussions) (Not Issue Tracker)

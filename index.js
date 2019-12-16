const ctrl = new ScrollMagic.Controller()
TweenLite.defaultOverwrite = false

const select = queryString => {
  const query = document.querySelectorAll(queryString)
  return query.length > 1 ? query : query[0]
}

const pathLength = pathElement => pathElement.getTotalLength()
// const multipleOf100 = (frame = 0) => frame * 100
// const viewportPercentageString = (number = 0) => `${number}%`

const TOTALFRAMES = '600%' // viewport scroll relative duration
const FRAMES1 = '100%'
const FRAMES2 = '200%'
const FRAMES3 = '300%'
const FRAMES4 = '400%'
const FRAMES5 = '500%'

function hideWithDashOffset(pathSelector) {
  const path = document.querySelector(pathSelector)

  const strokeLength = pathLength(path)
  path.setAttribute('stroke-dasharray', strokeLength)
  path.setAttribute('stroke-dashoffset', strokeLength)

  return path
}

// ROOTS
const waterRoot = hideWithDashOffset('#water_1_')
const powerRoot = hideWithDashOffset('#power_1_')
const chloraRoot = hideWithDashOffset('#chlora_1_')
// PORT
const waterPort = document.querySelector('#water_port_1_')
const chloraPort = document.querySelector('#chlora_port_1_')
const powerPort = document.querySelector('#power_port_1_')
// OTHER
const seedStem = document.querySelector('#power_stem_1_')
const seedCover = document.querySelector('#seed_2_')
const sky = document.querySelector('.sky')
const metalPot = document.querySelector('.pot.metal')
const hybrid = document.querySelector('svg')

// const rootingTimeline = new TimelineMax().fromTo(
//   [waterRoot, powerRoot, chloraRoot],
//   1, // duration
//   {
//     strokeWidth: 1
//   },
//   {
//     strokeDashoffset: 0,
//     ease: Linear.easeIn,
//     strokeWidth: 6,
//
//   }
// )

const viewboxPin = new ScrollMagic.Scene({
  tweenChanges: true,
  triggerHook: 'onLeave',
  duration: TOTALFRAMES // 6 times the viewport scrolling height
})
  .setPin('#viewbox.pin')
  .addIndicators({ name: 'pin viewbox' })
  .addTo(ctrl)

// const growPorts = new ScrollMagic.Scene({
//   triggerHook: 'onLeave',
//   tweenChanges: true,
//   duration: '10%'
// }).setTween(
//   new TimelineMax().fromTo(
//     [chloraPort, waterPort, powerPort],
//     1,
//     { scale: 0 },
//     { scale: 1 }
//   )
// )

const growHybrid = new ScrollMagic.Scene({ tweenChanges: true })

const growRoots = new ScrollMagic.Scene({
  triggerHook: 'onLeave',
  tweenChanges: true,
  duration: FRAMES2
})
  .setTween(
    new TimelineMax()
      .fromTo(
        [waterPort, powerPort, chloraPort, waterRoot, powerRoot, chloraRoot],
        0.1, // duration
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, transformOrigin: 'center' }
      )

      .fromTo(
        [waterRoot, powerRoot, chloraRoot],
        0.9, // duration
        {
          strokeWidth: 1
        },
        {
          strokeDashoffset: 0,
          ease: Linear.easeIn,
          strokeWidth: 6,
          immediateRender: false
        }
      )
  )
  .addIndicators({ name: 'grow roots' })
  .addTo(ctrl)

const growHeight = new ScrollMagic.Scene({
  triggerHook: 'onLeave',
  offset: '150',
  tweenChanges: true,
  duration: FRAMES3
})
  .setTween(TweenLite.fromTo(hybrid, 1, { yPercent: 55 }, { yPercent: 1 }))
  .addIndicators({ name: 'grow height' })
  .addTo(ctrl)

const receedSeedStem = new ScrollMagic.Scene({
  triggerHook: 'onLeave',
  tweenChanges: true,
  duration: '25%'
})
  .setTween(
    TweenLite.fromTo(
      seedStem,
      1,
      { strokeDasharray: 'none', strokeDashoffset: 'none' },
      {
        strokeDasharray: pathLength(seedStem),
        strokeDashoffset: pathLength(seedStem),
        immediateRender: false
      }
    )
  )
  .addIndicators({ name: 'receed stem' })
  .addTo(ctrl)

const increaseSky = new ScrollMagic.Scene({
  triggerHook: 'onLeave',
  duration: FRAMES3, // end phase1 dirt completely gone
  tweenChanges: true
})
  .setTween(TweenLite.fromTo(sky, 1, { height: '33vh' }, { height: '100vh' }))
  .addIndicators({ name: 'lower dirt' })
  .addTo(ctrl)

const removePot = new ScrollMagic.Scene({
  triggerHook: 'onLeave',
  tweenChanges: true,
  duration: FRAMES2
})
  .setTween(
    TweenLite.fromTo(metalPot, 1, { borderWidth: '2rem' }, { borderWidth: 0 })
  )
  .addIndicators({ name: 'remove pot' })
  .addTo(ctrl)

// END PHASE 1

const growFlower = new ScrollMagic.Scene({
  triggerHook: 'onLeave',
  duration: FRAMES3,
  offset: FRAMES3,
  tweenChanges: true
})
  .setTween(
    new TimelineMax()
      .fromTo(
        document.querySelector('#seed_2_'),
        1,
        { rotateX: '90deg' },
        { rotateX: '0deg' }
      )
      .fromTo(
        document.querySelector('#flower'),
        1,
        { scale: 0, transformBox: 'fill-box', transformOrigin: 'center' },
        {
          scale: 1,

          transformOrigin: 'center'
        }
      )
      .fromTo(
        document.querySelector('#center'),
        1,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, transformOrigin: 'center' }
      )
      .fromTo(
        document.querySelector('#panels'),
        1,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, transformOrigin: 'center' }
      )
      .fromTo(
        document.querySelector('#arms'),
        1,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, transformOrigin: 'center' },
        '-=1.25'
      )
      .fromTo(
        document.querySelector('#Tesla_1_'),
        1,
        { opacity: 0 },
        { opacity: 1 }
      )
  )
  .addIndicators({ name: 'grow flower' })
  .addTo(ctrl)

console.log(ctrl)

// const hidePorts = new ScrollMagic.Scene({
//   triggerHook: 'onLeave',
//   duration: 100,
//   offset: FRAME3,
//   tweenChanges: true
// }).setTween(
//   TweenMax.fromTo(
//     seedCover,
//     1,
//     { rotateY: '90', transformOrigin: 'center top' },
//     { rotateY: '0', transformOrigin: 'center top' }
//   )
// )

const ctrl = new ScrollMagic.Controller()

const pathLength = pathElement => pathElement.getTotalLength()
// const multipleOf100 = (frame = 0) => frame * 100
// const viewportPercentageString = (number = 0) => `${number}%`

const TOTALFRAMES = '600%' // viewport scroll relative duration
const FRAME1 = '100%'
const FRAME2 = '200%'
const FRAME3 = '300%'
const FRAME4 = '400%'
const FRAME5 = '500%'

function hideWithDashOffset(pathSelector) {
  const path = document.querySelector(pathSelector)

  const strokeLength = pathLength(path)
  path.setAttribute('stroke-dasharray', strokeLength)
  path.setAttribute('stroke-dashoffset', strokeLength)

  return path
}

const waterRoot = hideWithDashOffset('#water_1_')
const powerRoot = hideWithDashOffset('#power_1_')
const chloraRoot = hideWithDashOffset('#chlora_1_')
const seedStem = document.querySelector('#power_stem_1_')
const sky = document.querySelector('.sky')
const metalPot = document.querySelector('.pot.metal')
const hybrid = document.querySelector('svg')

console.log(hybrid)

const rootingTimeline = new TimelineMax().fromTo(
  [waterRoot, powerRoot, chloraRoot],
  1, // duration
  {
    strokeWidth: 1
  },
  {
    strokeDashoffset: 0,
    ease: Linear.easeIn,
    strokeWidth: 6
  }
)

const viewboxPin = new ScrollMagic.Scene({
  triggerHook: 0,
  duration: TOTALFRAMES // 6 times the viewport scrolling height
})
  .setPin('#viewbox.pin')
  .addIndicators({ name: 'pin viewbox' })
  .addTo(ctrl)

const growRoots = new ScrollMagic.Scene({
  triggerHook: 0,
  tweenChanges: true,
  duration: FRAME2
})
  .setTween(rootingTimeline)
  .addIndicators({ name: 'grow root' })
  .addTo(ctrl)

const growHeight = new ScrollMagic.Scene({
  triggerHook: 0,
  tweenChanges: true,
  duration: FRAME3
})
  .setTween(TweenLite.fromTo(hybrid, 2, { yPercent: 55 }, { yPercent: 0 }))
  .addIndicators({ name: 'grow height' })
  .addTo(ctrl)

const receedSeedStem = new ScrollMagic.Scene({
  triggerHook: 0,
  tweenChanges: true,
  duration: '50%'
})
  .setTween(
    TweenLite.fromTo(
      seedStem,
      1,
      {},
      {
        strokeDasharray: pathLength(seedStem),
        strokeDashoffset: pathLength(seedStem)
      }
    )
  )
  .addIndicators({ name: 'receed stem' })
  .addTo(ctrl)

// transform: translateY(55%);
const increaseSky = new ScrollMagic.Scene({
  triggerHook: 0,
  duration: FRAME3, // end phase1 dirt completely gone
  tweenChanges: true
})
  .setTween(TweenLite.fromTo(sky, 1, { height: '33vh' }, { height: '100vh' }))
  .addIndicators({ name: 'lower dirt' })
  .addTo(ctrl)

const removePot = new ScrollMagic.Scene({
  triggerHook: 0,
  tweenChanges: true,
  duration: FRAME2
})
  .setTween(
    TweenLite.fromTo(metalPot, 1, { borderWidth: '2rem' }, { borderWidth: 0 })
  )
  .addIndicators({ name: 'remove pot' })
  .addTo(ctrl)

const controller = new ScrollMagic.Controller()

const roots = document.querySelector('.roots')
console.log(roots)

function hideWithDashOffset(pathSelector) {
  const path = document.querySelector(pathSelector)

  const strokeLength = path.getTotalLength()
  path.setAttribute('stroke-dasharray', strokeLength)
  path.setAttribute('stroke-dashoffset', strokeLength)

  return path
}

const waterRoot = hideWithDashOffset('#water_1_')
const powerRoot = hideWithDashOffset('#power_1_')
const chloraRoot = hideWithDashOffset('#chlora_1_')
const seedStem = hideWithDashOffset('#power_stem_1_')

const rootTween = new TimelineMax().to(
  [waterRoot, powerRoot, chloraRoot],
  0.9,
  {
    strokeDashoffset: 0,
    ease: Linear.easeNone,
    'stroke-width': 6
  }
)

const viewboxPin = new ScrollMagic.Scene({ triggerHook: 0 })
  .duration('600%')
  .setPin('#viewbox.pin')
  // .setTween(rootTween)
  .addIndicators({ name: 'pin test' })
  .addTo(controller)

const growRoots = new ScrollMagic.Scene({
  triggerHook: 0,
  tweenChanges: true,
  duration: '100%'
})
  .setTween(rootTween)
  .addIndicators({ name: 'root tween' })
  .addTo(controller)

console.log(rootTween)

/* 
root
  water
  power
  chlora
*/

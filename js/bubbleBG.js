const extend = (base, ...extensions) => Object.assign({}, base, ...extensions)

const parseColor = ({ h, s, l, a }) => `hsla(${h},${s}%,${l}%,${a})`

const Color = extend.bind(null, { h: 0, s: 100, l: 100, a: 1 })

const Vector = extend.bind(null, { x: 0, y: 0 })

const Particle = extend.bind(null, {
  pos: Vector(),
  vel: Vector(),
  angle: 0,
  speed: 0,
  radius: 0,
  rotation: 0,
  color: Color()
})

const colors = [
  // orange
  Color({ h: 20, s: 100, l: 50 }),
  // cyan
  Color({ h: 179, s: 100, l: 70 }),
  // yellow
  Color({ h: 60, l: 50 }),
  // blue
  Color({ h: 230, l: 50 }),
  // green
  Color({ h: 110, l: 50}),
  // red
  Color({ h: 0, l: 50}),
  // pink
  Color({ h: 330, l: 70}),
  // Turquoise
  Color({ h: 171, l: 50}),
  // purple
  Color({ h: 300, l: 50}),
  // Yellow green
  Color({ h: 80, l: 50}),
  
]

const animationLoop = scope => {
  if (scope.animation) {
    scope.animation(animationLoop.bind(null, scope))
  }

  const { ctx } = scope
  const { canvas } = ctx
  const rc = rough.canvas(canvas)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  scope.particles.map((p, i) => {
    p.pos.y -= p.speed
    // random angle
    if (i % 2) {
      p.pos.x = p.pos.x + Math.sin(p.angle) * .4
    } else {
      p.pos.x = p.pos.x - Math.cos(p.angle) * .4
    }
    p.angle += .01
    // circle shape
    rc.circle(p.pos.x, p.pos.y, p.radius, {
      fill: parseColor(p.color),
      // circle rounghness
      roughness: Math.random() * 2.2,
      hachureGap: p.hachureGap,
      hachureAngle: p.hachureAngle
    })

    if (p.pos.y + p.radius * 3 < 0) {
      p.pos.y = canvas.height + p.radius * 3
      p.pos.x = Math.random() * (canvas.width - p.radius)
    }
  })
}

const scope = {
  animation: requestAnimationFrame.bind(null),
  ctx: document.getElementById('myCanvas').getContext('2d'),
  rotation: 0,
  particles: []
}

~(scope => {
  const { ctx: { canvas } } = scope

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

// number of bubble
  let particleCount = 30
  while (particleCount--) {
    scope.particles.push(Particle({
      pos: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      },
      // bubbles speed
      speed: Math.random() + 0.4,
      radius: Math.random() * 80 + 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      // bubbles patten
      hachureAngle: Math.random() * 90,
      hachureGap: Math.random() * 6 + 0.1
    }))
  }

  animationLoop(scope)
})(scope)
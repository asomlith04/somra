import { useState, useEffect, useCallback, useId, useRef } from 'react'
import { motion } from 'motion/react'

function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
}) {
  const id = useId()
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [squares, setSquares] = useState([])

  const getPos = useCallback(() => [
    Math.floor((Math.random() * dimensions.width) / width),
    Math.floor((Math.random() * dimensions.height) / height),
  ], [dimensions.height, dimensions.width, height, width])

  const generateSquares = useCallback((count) =>
    Array.from({ length: count }, (_, i) => ({ id: i, pos: getPos(), iteration: 0 })),
  [getPos])

  const updateSquarePosition = useCallback((squareId) => {
    setSquares((cur) => {
      const current = cur[squareId]
      if (!current || current.id !== squareId) return cur
      const next = cur.slice()
      next[squareId] = { ...current, pos: getPos(), iteration: current.iteration + 1 }
      return next
    })
  }, [getPos])

  useEffect(() => {
    if (dimensions.width && dimensions.height) setSquares(generateSquares(numSquares))
  }, [dimensions.width, dimensions.height, generateSquares, numSquares])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions((d) => {
          const w = entry.contentRect.width
          const h = entry.contentRect.height
          return d.width === w && d.height === h ? d : { width: w, height: h }
        })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        fill: 'rgba(17,7,158,0.045)',
        stroke: 'rgba(17,7,158,0.075)',
        color: 'rgba(17,7,158,0.045)',
        zIndex: 0,
      }}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} style={{ overflow: 'visible' }}>
        {squares.map(({ pos: [sx, sy], id: sid, iteration }, index) => (
          <motion.rect
            key={`${sid}-${iteration}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{ duration, repeat: 1, delay: index * 0.1, repeatType: 'reverse', repeatDelay }}
            onAnimationComplete={() => updateSquarePosition(sid)}
            width={width - 1}
            height={height - 1}
            x={sx * width + 1}
            y={sy * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  )
}

const Icon = ({ name, size = 18, className = '' }) => {
  const paths = {
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    pen: (
      <>
        <path d="M12 19l7-7 3 3-7 7H12v-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
    repeat: (
      <>
        <path d="M17 1l4 4-4 4" />
        <path d="M3 11V9a4 4 0 014-4h14" />
        <path d="M7 23l-4-4 4-4" />
        <path d="M21 13v2a4 4 0 01-4 4H3" />
      </>
    ),
    reply: (
      <>
        <path d="M9 17l-5-5 5-5" />
        <path d="M20 18v-2a4 4 0 00-4-4H4" />
      </>
    ),
    trending: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </>
    ),
    megaphone: (
      <>
        <path d="M3 11v2a2 2 0 002 2h1l3 6h3v-6l9 3V4l-9 3H5a2 2 0 00-2 2z" />
      </>
    ),
    workflow: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <path d="M9 6h7a2 2 0 012 2v7" />
      </>
    ),
    layers: (
      <>
        <path d="M12 2l10 6-10 6L2 8l10-6z" />
        <path d="M2 14l10 6 10-6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </>
    ),
    check: <path d="M5 12l5 5L20 7" />,
    x: (
      <>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),
    arrowDown: (
      <>
        <path d="M12 5v14" />
        <path d="M6 13l6 6 6-6" />
      </>
    ),
    cpu: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </>
    ),
    heart: (
      <>
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </>
    ),
    building: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M3 9h6M3 15h6M15 9h6M15 15h6" />
      </>
    ),
    star: (
      <>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 3v4M16 3v4" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.6l-1.7-4.6L6 9.3l4.3-1.7L12 3z" />
        <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    list: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <circle cx="4" cy="6" r="1.2" fill="currentColor" />
        <circle cx="4" cy="12" r="1.2" fill="currentColor" />
        <circle cx="4" cy="18" r="1.2" fill="currentColor" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 3 5-7" />
      </>
    ),
    quote: (
      <>
        <path d="M9 7c-3 0-5 3-5 6v6h6v-7H5c0-3 2-4 4-5V7zm10 0c-3 0-5 3-5 6v6h6v-7h-5c0-3 2-4 4-5V7z" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    minus: <path d="M5 12h14" />,
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function SomraLeafMark({ size = 28 }) {
  // Rounded-square navy "app icon" with a white origami leaf inside, matching brand mark.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="11" fill="#0a0560" />
      {/* Slim vertical leaf-fold (stem) on the left */}
      <path d="M14 14 L22 14 L22 31 L14 26 Z" fill="#ffffff" />
      {/* Small connecting wedge below the stem */}
      <path d="M14 28 L22 32 L14 32 Z" fill="#ffffff" />
      {/* Large diagonal blade pointing right */}
      <path d="M22 32 L36 32 L22 18 Z" fill="#ffffff" />
    </svg>
  )
}

const VERTICALS = [
  {
    id: 'cdp',
    label: 'Customer data & marketing',
    full: 'Customer data and marketing software',
    description: 'Sold to marketing, operations, and data leaders. Decisions involve several stakeholders and close scrutiny.',
    icon: 'layers',
  },
  {
    id: 'revops',
    label: 'Revenue & sales ops',
    full: 'Revenue operations and sales process software',
    description: 'Tools that help sales teams improve forecasting, process control, and pipeline visibility.',
    icon: 'trending',
  },
  {
    id: 'workflow',
    label: 'Workflow & automation',
    full: 'Workflow and automation platforms',
    description: 'Products that connect systems, reduce manual work, and improve operational consistency.',
    icon: 'workflow',
  },
  {
    id: 'agencies',
    label: 'Specialist agencies',
    full: 'Specialist agencies with high-value contracts',
    description: 'Paid media, analytics, lifecycle, or RevOps services sold to senior commercial buyers.',
    icon: 'briefcase',
  },
  {
    id: 'finance',
    label: 'Finance & risk',
    full: 'Finance, compliance, and risk software',
    description: 'Sold to finance, operations, compliance, and risk leaders, where trust and process discipline matter early.',
    icon: 'lock',
  },
  {
    id: 'professional',
    label: 'Professional services',
    full: 'Consulting, accounting, and advisory firms',
    description: 'High-value retainer services sold to commercial and operational leaders. Outbound works when the offer is specific and the firm has a clear point of view.',
    icon: 'briefcase',
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    full: 'Cybersecurity and information security software',
    description: 'Sold to CISOs, IT security leads, and heads of infrastructure. Long evaluation cycles with high scrutiny — outbound must open doors, not alarm them.',
    icon: 'cpu',
  },
  {
    id: 'hrtech',
    label: 'HR & people tech',
    full: 'HR, workforce, and people operations software',
    description: 'Sold to CHROs, heads of people, and people ops leads. Multi-stakeholder buying with HR, finance, and legal all involved at different stages.',
    icon: 'users',
  },
  {
    id: 'healthtech',
    label: 'Healthcare B2B',
    full: 'Health tech and medical operations software',
    description: 'Sold to hospital operations, clinic networks, and healthcare administrators — not clinicians. Longer procurement, high trust requirements, and strict compliance awareness.',
    icon: 'heart',
  },
]

const PAINS = [
  { icon: 'user', t: 'Founder-dependent prospecting', b: "It only happens in the founder's spare time." },
  { icon: 'workflow', t: 'No clear process owner', b: 'Tools exist, but no one owns the workflow.' },
  { icon: 'list', t: 'Broad or stale lists', b: 'Targeting is wide instead of well-defined.' },
  { icon: 'mail', t: 'Generic outreach', b: 'Messages read like every other inbox.' },
  { icon: 'clock', t: 'Slow reply handling', b: 'Real interest cools before someone responds.' },
  { icon: 'chart', t: 'Activity, not insight', b: 'Reports show volume, not progress.' },
]

const OPTIONS = [
  {
    icon: 'user',
    t: 'Founder-led outreach',
    d: 'The founder runs outbound between product, hiring, and sales calls.',
    p: 'It drops the moment something urgent appears.',
  },
  {
    icon: 'users',
    t: 'Internal hire with disconnected tools',
    d: 'A junior hire is handed a data source, an email platform, and a CRM.',
    p: 'Without an operating system, every part of the process drifts.',
  },
  {
    icon: 'megaphone',
    t: 'Generic lead generation agency',
    d: 'An outside provider runs broad campaigns on shared infrastructure.',
    p: 'Weak segmentation, recycled copy, and damage to your domain reputation.',
  },
]

const STAGES = [
  { n: '01', icon: 'target', t: 'Market focus and segmentation', d: 'The right accounts, roles, and buying signals.' },
  { n: '02', icon: 'database', t: 'Lead sourcing and verification', d: 'Cleaner lists with better data quality.' },
  { n: '03', icon: 'shield', t: 'Sending infrastructure', d: 'Dedicated domains and responsible deliverability.' },
  { n: '04', icon: 'pen', t: 'Message strategy', d: "Outreach written for the buyer's context." },
  { n: '05', icon: 'repeat', t: 'Cadence and follow-up', d: 'A disciplined sequence across the committee.' },
  { n: '06', icon: 'reply', t: 'Reply handling and qualification', d: 'Prompt, structured, and routed with context.' },
  { n: '07', icon: 'trending', t: 'Reporting and improvement', d: 'Regular reviews focused on what is improving.' },
]

const OUTCOMES = [
  'More consistent top-of-funnel activity',
  'Better-fit sales conversations',
  'Faster response to genuine interest',
  'Less dependence on the founder',
  'A process that improves over time',
]

const COMPARE = [
  { dim: 'Planning', a: 'Thoughtful but inconsistent', b: 'Fast but shallow', c: 'Built around buyer context and signals' },
  { dim: 'List quality', a: 'Variable, time-dependent', b: 'Broad and lightly verified', c: 'Cleaner, segmented, reviewed each campaign' },
  { dim: 'Sending setup', a: 'Often the primary domain', b: 'Shared, overloaded inboxes', c: 'Dedicated domains, proper warmup' },
  { dim: 'Message quality', a: 'Authentic but unscaled', b: 'Templated, recycled across clients', c: "Written for the buyer's role and context" },
  { dim: 'Follow-up discipline', a: 'Drops when other work appears', b: 'Aggressive and undifferentiated', c: 'A planned sequence across the committee' },
  { dim: 'Reply handling', a: 'Slow and bottlenecked', b: 'Auto-qualified, low context', c: 'Prompt, structured, full context' },
  { dim: 'Reporting', a: "In the founder's head", b: 'Activity dashboards, little insight', c: "Regular reviews of what's improving" },
  { dim: 'Ongoing improvement', a: 'Restarts each quarter', b: 'Same playbook every client', c: 'Refined into a documented system' },
]

const GOOD_FIT = [
  'Higher-value software or specialist services',
  'Longer buying cycles and multiple decision-makers',
  'Founders or revenue leaders ready to commit to a system',
  'Teams that want managed, not DIY',
]

const NOT_FIT = [
  'Low-priced offers reliant on high-volume sending',
  'Teams chasing instant results or guaranteed revenue',
  'Businesses set on aggressive mass outreach',
  'Anyone unwilling to protect domain health',
]

const TRUST_SIGNALS = [
  { icon: 'shield', label: 'Dedicated infrastructure', sub: 'No shared domains or inboxes across clients' },
  { icon: 'lock',   label: 'Full playbook ownership', sub: 'Everything built stays with you' },
  { icon: 'users',  label: 'One client per vertical slot', sub: 'No competing campaigns in your market' },
  { icon: 'star',   label: '7-stage managed system', sub: 'Every stage owned and operated end to end' },
]

const STEPS = [
  {
    n: '01',
    t: 'Strategy call',
    d: 'A 30-minute conversation to review your ICP, current setup, and what you have already tried. We will tell you directly whether Somra is the right fit.',
    icon: 'calendar',
  },
  {
    n: '02',
    t: 'System build',
    d: 'Over four to six weeks we set up dedicated infrastructure, build the target list, and write the first sequences. You review and approve before anything sends.',
    icon: 'workflow',
  },
  {
    n: '03',
    t: 'Ongoing management',
    d: 'We run the full system — sending, reply handling, qualification, and reporting — with a regular review cycle to improve each campaign.',
    icon: 'trending',
  },
]

const HERO_STAGES = [
  { label: 'Target accounts', icon: 'target' },
  { label: 'Lead data', icon: 'database' },
  { label: 'Sending setup', icon: 'shield' },
  { label: 'Messaging', icon: 'pen' },
  { label: 'Follow-up', icon: 'repeat' },
  { label: 'Replies', icon: 'reply' },
  { label: 'Reporting', icon: 'trending' },
]

const FAQS = [
  {
    q: 'How long until we see meetings?',
    a: 'Infrastructure setup and warmup runs four to six weeks. First qualified conversations typically land in weeks six to ten. The system gets sharper each quarter afterwards.',
  },
  {
    q: 'Will you use our primary domain?',
    a: 'No. Somra builds dedicated sending domains and warms them properly, so cold outbound never touches your transactional, customer, or marketing email.',
  },
  {
    q: 'Who writes the messaging?',
    a: 'We do, in close collaboration with you. Every sequence is built around your positioning, your category language, and the specific objections your buyers raise.',
  },
  {
    q: 'Do we own the data and the playbook?',
    a: 'Yes. The list, the sequences, the qualification rules, and the playbook stay with you. If we ever part ways, you walk with everything.',
  },
  {
    q: 'How is this different from hiring an SDR?',
    a: 'An SDR is a person. Somra is a system — infrastructure, data, messaging, cadence, and reporting built and run as a managed function. You get the output of a well-run outbound team without the cost, ramp time, or management overhead of a hire.',
  },
  {
    q: 'What do you need from us to get started?',
    a: 'A 90-minute onboarding session covering your ICP, deal history, positioning, and any outbound you have already tried. We handle everything after that — research, infrastructure, copy, and execution.',
  },
  {
    q: 'Do you guarantee a number of meetings?',
    a: 'No. Anyone guaranteeing meeting volumes is either padding the definition of a meeting or burning your domain to hit a number. What we commit to is a disciplined process, honest reporting, and a system that improves with each cycle.',
  },
  {
    q: 'What is the minimum engagement length?',
    a: 'We ask for a three-month initial commitment. The first month is infrastructure and setup. Results compound from month two onwards. Outbound done properly is not a one-month experiment.',
  },
  {
    q: 'Can you work with our existing CRM and tools?',
    a: 'Yes. We route qualified replies and meeting bookings into whatever CRM you use. We do not require you to change your stack — we sit alongside it.',
  },
  {
    q: 'What if results slow down over time?',
    a: 'Every engagement includes a regular review cycle. If reply rates drop, we look at list quality, message fatigue, and market signal shifts before changing anything. The playbook is built to be iterated, not restarted.',
  },
]

function SomraSystemDiagram() {
  return (
    <div className="s-diagram-card" role="img" aria-label="Somra outbound system — ICP, Infrastructure, Sequences, Reply handling, and Learning loop connected to a central managed system">
      {/* Dashed connecting lines */}
      <svg className="s-diagram-svg" viewBox="0 0 500 420" fill="none" aria-hidden="true">
        <line x1="250" y1="210" x2="85"  y2="56"  stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="250" y1="210" x2="415" y2="47"  stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="250" y1="210" x2="75"  y2="266" stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="250" y1="210" x2="415" y2="274" stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="250" y1="210" x2="250" y2="381" stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" strokeDasharray="5 4" />
      </svg>
      {/* Center node */}
      <div className="s-diagram-center">
        <div className="s-diagram-center-dot" />
        <span className="s-diagram-center-lbl">SOMRA{'\n'}SYSTEM</span>
      </div>
      {/* Peripheral nodes */}
      <div className="s-diagram-node" style={{ top: '9%', left: '6%' }}>
        <span className="s-diagram-node-icon"><Icon name="target" size={13} /></span>ICP
      </div>
      <div className="s-diagram-node" style={{ top: '7%', right: '3%' }}>
        <span className="s-diagram-node-icon"><Icon name="shield" size={13} /></span>Infrastructure
      </div>
      <div className="s-diagram-node" style={{ top: '59%', left: '4%' }}>
        <span className="s-diagram-node-icon"><Icon name="pen" size={13} /></span>Sequences
      </div>
      <div className="s-diagram-node" style={{ top: '61%', right: '3%' }}>
        <span className="s-diagram-node-icon"><Icon name="reply" size={13} /></span>Reply handling
      </div>
      <div className="s-diagram-node" style={{ bottom: '5%', left: '50%', transform: 'translateX(-50%)' }}>
        <span className="s-diagram-node-icon"><Icon name="repeat" size={13} /></span>Learning loop
      </div>
    </div>
  )
}

function useScrollReveal() {
  useEffect(() => {
    const mo = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mo.matches) {
      document.querySelectorAll('.s-reveal').forEach(el => el.classList.add('s-reveal-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('s-reveal-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.s-reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function PainCard({ icon, t, b, className = '', style = {} }) {
  return (
    <div className={`s-pain ${className}`} style={style}>
      <div className="s-pain-icon"><Icon name={icon} size={18} /></div>
      <div>
        <div className="s-pain-t">{t}</div>
        <div className="s-pain-b">{b}</div>
      </div>
    </div>
  )
}

function OptionCard({ icon, t, d, p, className = '', style = {} }) {
  return (
    <div className={`s-option ${className}`} style={style}>
      <div className="s-option-head">
        <div className="s-option-icon"><Icon name={icon} size={18} /></div>
        <div className="s-option-t">{t}</div>
      </div>
      <div className="s-option-d">{d}</div>
      <div className="s-option-divider" />
      <div className="s-option-pl">Problem</div>
      <div className="s-option-p">{p}</div>
    </div>
  )
}

function StageCard({ n, icon, t, d, className = '', style = {} }) {
  return (
    <div className={`s-stage ${className}`} style={style}>
      <div className="s-stage-num">
        <Icon name={icon} size={18} />
      </div>
      <div className="s-stage-body">
        <div className="s-stage-meta">Stage {n}</div>
        <div className="s-stage-t">{t}</div>
        <div className="s-stage-d">{d}</div>
      </div>
    </div>
  )
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`s-faq-item ${open ? 'open' : ''}`}>
      <button className="s-faq-q" aria-expanded={open} onClick={onToggle}>
        <span>{q}</span>
        <span className="s-faq-toggle"><Icon name={open ? 'minus' : 'plus'} size={16} /></span>
      </button>
      <div className={`s-faq-a-wrap ${open ? 'open' : ''}`}>
        <div className="s-faq-a"><div className="s-faq-a-inner">{a}</div></div>
      </div>
    </div>
  )
}

export default function SomraPage() {
  const [activeTab, setActiveTab] = useState(VERTICALS[0].id)
  const [openFaq, setOpenFaq] = useState(0)
  const active = VERTICALS.find((v) => v.id === activeTab) ?? VERTICALS[0]
  useScrollReveal()

  useEffect(() => {
    const prevHtml = document.documentElement.style.background
    const prevBody = document.body.style.background
    document.documentElement.style.background = '#ffffff'
    document.body.style.background = '#ffffff'
    return () => {
      document.documentElement.style.background = prevHtml
      document.body.style.background = prevBody
    }
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="s-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .s-root {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #ffffff;
          color: #07033c;
          min-height: 100vh;
          position: relative;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          font-feature-settings: 'cv11', 'ss01', 'ss03', 'zero', 'tnum';
          font-variant-ligatures: contextual;
        }
        .s-root h1, .s-root h2, .s-root h3, .s-display {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-feature-settings: 'ss01', 'ss02', 'zero';
        }
        .s-root *, .s-root *::before, .s-root *::after { box-sizing: border-box; }
        .s-root button { font-family: inherit; }
        .s-mono {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-variant-ligatures: none;
        }
        .s-tnum { font-variant-numeric: tabular-nums; }

        /* PAGE GLOW — fixed so it persists as user scrolls (indigo center glow) */
        .s-page-glow {
          position: fixed;
          top: -25%;
          left: -15%;
          right: -15%;
          height: 90vh;
          z-index: 0;
          pointer-events: none;
          background-image: radial-gradient(
            circle at 50% 35%,
            rgba(99, 102, 241, 0.22),
            rgba(99, 102, 241, 0.08) 35%,
            transparent 65%
          );
        }

        /* NAV */
        .s-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid #e6e6e6;
          height: 64px;
        }
        .s-nav-inner {
          max-width: 1280px; margin: 0 auto; height: 100%;
          padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .s-wordmark {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-size: 18px; font-weight: 700; color: #07033c;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .s-wordmark-mark {
          display: inline-flex; align-items: center; justify-content: center;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .s-wordmark:hover .s-wordmark-mark { transform: scale(1.06) rotate(-2deg); }
        .s-nav-right { display: flex; align-items: center; gap: 2rem; }
        .s-nav-link {
          background: none; border: 0; padding: 0; cursor: pointer;
          color: #6a6a8a; font-size: 13.5px; font-weight: 500;
          letter-spacing: -0.005em;
          transition: color 0.18s;
        }
        .s-nav-link:hover { color: #07033c; }
        .s-btn {
          background: #07033c; color: #fff; border: 0; cursor: pointer;
          padding: 10px 18px; border-radius: 999px;
          font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
          display: inline-flex; align-items: center; gap: 7px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 4px 12px -6px rgba(7,3,60,0.4);
        }
        .s-btn:hover { background: #0c056d; transform: translateY(-1px); }
        .s-btn-primary { background: #11079e; box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 8px 20px -8px rgba(17,7,158,0.55); }
        .s-btn-primary:hover { background: #0c056d; }
        .s-btn-lg { padding: 13px 24px; font-size: 14.5px; }
        .s-btn-ghost {
          background: transparent; color: #07033c; border: 1px solid #cccccc;
          padding: 10px 18px; border-radius: 999px;
          font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
          cursor: pointer; transition: border-color 0.18s, background 0.18s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .s-btn-ghost:hover { border-color: #11079e; background: #fff; }

        /* HERO */
        .s-hero-wrap {
          position: relative;
          min-height: calc(100dvh - 64px);
          display: flex; flex-direction: column; justify-content: center;
        }
        .s-hero {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto; width: 100%;
          padding: 4rem 2.5rem 5rem;
          display: grid; grid-template-columns: 55fr 45fr;
          align-items: center; gap: 3.5rem;
        }
        .s-hero-content { display: flex; flex-direction: column; align-items: flex-start; }
        .s-hero-visual { display: flex; align-items: center; justify-content: flex-end; }
        .s-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 500; color: #11079e;
          letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 1.5rem; display: inline-block;
        }
        .s-h1 {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-size: clamp(2.75rem, 5vw, 4.5rem);
          font-weight: 800; line-height: 0.97; letter-spacing: -0.05em;
          color: #07033c; margin: 0 0 1.5rem;
        }
        .s-h1-accent {
          background: linear-gradient(180deg, #11079e 0%, #0c056d 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .s-hero-sub {
          font-size: 1.05rem; color: #5a5a7a; line-height: 1.65;
          margin: 0 0 2.25rem; letter-spacing: -0.005em; max-width: 500px;
        }
        .s-cta-row { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .s-btn-text-link {
          background: none; border: 0; cursor: pointer; font-family: inherit;
          font-size: 14.5px; font-weight: 500; color: #07033c;
          letter-spacing: -0.005em; padding: 0;
          display: inline-flex; align-items: center; gap: 6px;
          transition: gap 0.18s ease, color 0.18s;
        }
        .s-btn-text-link:hover { color: #11079e; gap: 10px; }

        /* NODE DIAGRAM */
        .s-diagram-card {
          position: relative;
          background: linear-gradient(150deg, #f8f8fc 0%, #f0f0f8 100%);
          border: 1px solid #e6e6e6; border-radius: 22px;
          aspect-ratio: 500 / 420; width: 100%; max-width: 520px;
          box-shadow: 0 4px 32px -8px rgba(17,7,158,0.10), 0 1px 0 rgba(255,255,255,0.8) inset;
        }
        .s-diagram-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .s-diagram-center {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -46%);
          width: 88px; height: 88px;
          background: #eaebfc; border: 1.5px solid #c5c1f5; border-radius: 22px;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 6px;
          box-shadow: 0 4px 16px -6px rgba(17,7,158,0.2);
        }
        .s-diagram-center-dot {
          width: 18px; height: 18px; background: #11079e; border-radius: 50%;
          box-shadow: 0 0 0 5px rgba(17,7,158,0.12);
        }
        .s-diagram-center-lbl {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 7px; font-weight: 600; color: #11079e;
          letter-spacing: 0.1em; text-align: center; line-height: 1.5; white-space: pre-line;
        }
        .s-diagram-node {
          position: absolute; background: #fff; border: 1px solid #e8e8ee;
          border-radius: 10px; padding: 7px 12px;
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 500; color: #07033c;
          white-space: nowrap; letter-spacing: -0.005em;
          box-shadow: 0 2px 10px -4px rgba(0,0,0,0.08);
        }
        .s-diagram-node-icon { color: #11079e; display: flex; }

        /* TRUST BAR */
        .s-trust-bar {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 16px; position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto 0;
          box-shadow: 0 2px 12px -6px rgba(17,7,158,0.07);
        }
        .s-trust-bar-outer { padding: 0 2.5rem 3rem; }
        .s-trust-bar-inner {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
        }
        .s-trust-item {
          padding: 1.75rem 1.75rem;
          border-right: 1px solid #e8e8ee;
        }
        .s-trust-item:last-child { border-right: 0; }
        .s-trust-label {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px; font-weight: 600; color: #11079e;
          letter-spacing: 0.18em; text-transform: uppercase;
          margin-bottom: 0.625rem;
        }
        .s-trust-sub {
          font-size: 13.5px; color: #5a5a7a; line-height: 1.5;
          letter-spacing: -0.005em;
        }
        @media (max-width: 900px) {
          .s-trust-bar-inner { grid-template-columns: 1fr 1fr; }
          .s-trust-item:nth-child(2) { border-right: 0; }
          .s-trust-item:nth-child(1), .s-trust-item:nth-child(2) { border-bottom: 1px solid #e8e8ee; }
        }
        @media (max-width: 640px) {
          .s-trust-bar-outer { padding: 0 1.25rem 2rem; }
          .s-trust-bar-inner { grid-template-columns: 1fr; }
          .s-trust-item { border-right: 0; border-bottom: 1px solid #e8e8ee; }
          .s-trust-item:last-child { border-bottom: 0; }
        }

        /* STEPS */
        .s-steps {
          display: grid; gap: 1rem;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 760px) { .s-steps { grid-template-columns: 1fr; } }
        .s-step {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 14px; padding: 1.75rem;
          position: relative;
          transition: border-color 0.18s, box-shadow 0.18s, transform 0.2s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .s-step:hover { border-color: #c5c1f5; transform: translateY(-2px); box-shadow: 0 8px 24px -12px rgba(17,7,158,0.18); }
        .s-step-num {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
          color: #11079e; text-transform: uppercase; margin-bottom: 1rem;
          display: flex; align-items: center; gap: 8px;
        }
        .s-step-num::before {
          content: ''; width: 18px; height: 1px; background: #c5c1f5;
        }
        .s-step-icon {
          width: 40px; height: 40px;
          background: #eaebfc; color: #11079e;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .s-step-t {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-size: 1.05rem; font-weight: 600; color: #07033c;
          letter-spacing: -0.02em; margin-bottom: 0.5rem;
        }
        .s-step-d { font-size: 13.5px; color: #6a6a8a; line-height: 1.55; letter-spacing: -0.005em; }

        /* SECTIONS */
        .s-section { max-width: 1280px; margin: 0 auto; padding: 6.5rem 2.5rem; position: relative; z-index: 1; }
        .s-section-tinted { background: #f0f0f8; position: relative; z-index: 1; border-top: 1px solid #e6e6e6; border-bottom: 1px solid #e6e6e6; }
        .s-section-tinted-wrap { padding: 6.5rem 0; }

        /* PAGE FRAME — vertical guide lines that span the entire site width */
        .s-frame-lines {
          position: absolute;
          top: 64px;
          bottom: 0;
          left: 0; right: 0;
          z-index: 0;
          pointer-events: none;
          max-width: 1280px;
          margin: 0 auto;
        }
        .s-frame-lines::before, .s-frame-lines::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent 0%, rgba(17,7,158,0.10) 8%, rgba(17,7,158,0.10) 92%, transparent 100%);
        }
        .s-frame-lines::before { left: 2.5rem; }
        .s-frame-lines::after { right: 2.5rem; }
        @media (max-width: 640px) {
          .s-frame-lines::before { left: 1.25rem; }
          .s-frame-lines::after { right: 1.25rem; }
        }
        .s-section-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
          color: #11079e; margin-bottom: 1rem;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .s-section-eyebrow::before {
          content: ''; width: 22px; height: 1px; background: #11079e;
        }
        .s-section-h {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          font-size: clamp(1.875rem, 3.4vw, 2.75rem);
          font-weight: 600; color: #07033c;
          letter-spacing: -0.035em; line-height: 1.08;
          max-width: 820px; margin: 0 0 1rem;
        }
        .s-section-sub {
          font-size: 1rem; color: #5a5a7a; line-height: 1.55;
          max-width: 640px; margin: 0 0 2.75rem;
          letter-spacing: -0.005em;
        }
        .s-section-center { text-align: center; }
        .s-section-center .s-section-h, .s-section-center .s-section-sub { margin-left: auto; margin-right: auto; }
        .s-section-center .s-section-eyebrow::before { display: none; }

        /* PAINS */
        .s-pains {
          display: grid; gap: 0.875rem;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
        .s-pain {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 12px; padding: 1.125rem 1.25rem;
          display: flex; gap: 0.875rem; align-items: flex-start;
          transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .s-pain:hover { border-color: #c5c1f5; box-shadow: 0 6px 16px -10px rgba(17,7,158,0.18); }
        .s-pain-icon {
          width: 34px; height: 34px; min-width: 34px;
          background: #eaebfc; color: #11079e;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-pain-t { font-size: 14.5px; font-weight: 600; color: #07033c; margin-bottom: 3px; letter-spacing: -0.012em; }
        .s-pain-b { font-size: 13.5px; color: #6a6a8a; line-height: 1.5; letter-spacing: -0.005em; }

        /* OPTIONS */
        .s-options {
          display: grid; gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .s-option {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 14px; padding: 1.5rem;
        }
        .s-option-head {
          display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;
        }
        .s-option-icon {
          width: 34px; height: 34px;
          background: #f0f0f8; color: #07033c;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-option-t { font-size: 15.5px; font-weight: 600; color: #07033c; letter-spacing: -0.015em; }
        .s-option-d { font-size: 13.5px; color: #6a6a8a; line-height: 1.55; letter-spacing: -0.005em; }
        .s-option-divider { height: 1px; background: #e6e6e6; margin: 1rem 0; }
        .s-option-pl {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          color: #C73659; margin-bottom: 0.4rem;
        }
        .s-option-p { font-size: 13.5px; color: #1a1455; line-height: 1.55; letter-spacing: -0.005em; }
        .s-options-closer {
          margin-top: 1.75rem; font-size: 14.5px; color: #1a1455; line-height: 1.55;
          background: #fff; border: 1px solid #e6e6e6; border-radius: 12px;
          padding: 1.125rem 1.4rem;
          letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .s-options-closer-mark {
          color: #11079e; flex-shrink: 0;
        }

        /* STAGES */
        .s-stages {
          display: grid; gap: 0.75rem;
          grid-template-columns: 1fr;
        }
        .s-stage {
          display: flex; gap: 1rem; align-items: stretch;
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 12px; padding: 1.125rem 1.25rem;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .s-stage:hover { border-color: #c5c1f5; box-shadow: 0 6px 18px -12px rgba(17,7,158,0.2); }
        .s-stage-num {
          width: 40px; min-width: 40px; height: 40px;
          background: #eaebfc; color: #11079e;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-stage-body { flex: 1; }
        .s-stage-meta {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #8888a0;
          margin-bottom: 4px;
          font-variant-numeric: tabular-nums slashed-zero;
        }
        .s-stage-t { font-size: 15px; font-weight: 600; color: #07033c; margin-bottom: 3px; letter-spacing: -0.015em; }
        .s-stage-d { font-size: 13.5px; color: #6a6a8a; line-height: 1.5; letter-spacing: -0.005em; }
        @media (min-width: 760px) {
          .s-stages { grid-template-columns: 1fr 1fr; }
        }

        /* OUTCOMES */
        .s-outcomes {
          display: grid; gap: 0.75rem;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .s-outcome {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 12px; padding: 1rem 1.125rem;
          display: flex; gap: 0.75rem; align-items: flex-start;
          font-size: 14px; color: #07033c; line-height: 1.45;
          letter-spacing: -0.005em;
        }
        .s-outcome-check {
          color: #11079e;
          background: #eaebfc;
          border-radius: 999px;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* SCROLL REVEAL — slower, deeper fade with subtle blur */
        .s-reveal {
          opacity: 0;
          transform: translateY(36px);
          filter: blur(6px);
          transition:
            opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
            transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms),
            filter 0.85s cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0ms);
          will-change: opacity, transform, filter;
        }
        .s-reveal-in { opacity: 1; transform: none; filter: blur(0); }
        @media (prefers-reduced-motion: reduce) {
          .s-reveal { opacity: 1; transform: none; filter: none; transition: none; }
        }

        /* HERO PARALLAX FADE — content fades as user scrolls past */
        .s-hero-content {
          animation: heroFadeOnScroll linear both;
          animation-timeline: scroll(root);
          animation-range: 0 75vh;
        }
        @keyframes heroFadeOnScroll {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0.1; transform: translateY(-32px); }
        }
        @supports not (animation-timeline: scroll()) {
          .s-hero-content { animation: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .s-hero-content { animation: none; }
        }

        /* MICRO-INTERACTIONS */
        .s-btn { will-change: transform; }
        .s-btn:active { transform: scale(0.97) !important; }
        .s-btn-primary:hover {
          box-shadow: 0 0 0 3px rgba(17,7,158,0.15), 0 8px 24px -8px rgba(17,7,158,0.55) !important;
        }
        .s-btn-ghost:active { transform: scale(0.97); }
        .s-pain { will-change: transform; }
        .s-pain:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 20px -12px rgba(17,7,158,0.18); }
        .s-option { will-change: transform; }
        .s-option:hover { transform: translateY(-2px); }
        .s-stage { will-change: transform; }
        .s-stage:hover { transform: translateY(-2px) !important; }
        .s-diagram-node { transition: border-color 0.18s, box-shadow 0.18s, transform 0.2s cubic-bezier(0.16,1,0.3,1); }
        .s-diagram-node:hover { border-color: #c5c1f5; transform: translateY(-1px); box-shadow: 0 4px 16px -6px rgba(17,7,158,0.18); }
        .s-nav-link { position: relative; }
        .s-nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
          height: 1.5px; background: #11079e;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .s-nav-link:hover::after { transform: scaleX(1); }
        .s-tab { will-change: transform; }
        .s-tab:active { transform: scale(0.96); }
        .s-faq-q { transition: color 0.15s; }
        .s-faq-item:not(.open):hover .s-faq-q { color: #11079e; }
        .s-faq-toggle { transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.18s; }
        .s-faq-item.open .s-faq-toggle { transform: rotate(0deg); background: #d0ceee; }
        .s-outcome { transition: border-color 0.18s, transform 0.2s cubic-bezier(0.16,1,0.3,1); will-change: transform; }
        .s-outcome:hover { border-color: #c5c1f5; transform: translateY(-1px); }
        .s-fit { transition: box-shadow 0.2s, transform 0.2s cubic-bezier(0.16,1,0.3,1); will-change: transform; }
        .s-fit:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -12px rgba(7,3,60,0.12); }

        /* TABLE */
        .s-table-wrap {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 14px; overflow: hidden;
        }
        .s-table-scroll { overflow-x: auto; }
        .s-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 720px; }
        .s-table th, .s-table td {
          padding: 14px 18px; text-align: left;
          border-bottom: 1px solid #e8e8ee; vertical-align: top;
          letter-spacing: -0.005em;
        }
        .s-table thead th {
          background: #f6f6fa; color: #07033c;
          font-size: 12.5px; font-weight: 600; letter-spacing: -0.005em;
        }
        .s-table thead th.somra-col { background: #eaebfc; color: #11079e; }
        .s-table td.dim { color: #07033c; font-weight: 500; width: 22%; }
        .s-table td.col-a, .s-table td.col-b { color: #6a6a8a; }
        .s-table td.somra-col { background: #f5f5ff; color: #07033c; border-left: 1px solid #d0ceee; border-right: 1px solid #d0ceee; font-weight: 500; }
        .s-table tbody tr:last-child td { border-bottom: 0; }
        .s-stacked { display: none; }
        @media (max-width: 720px) {
          .s-table-scroll { display: none; }
          .s-stacked { display: block; padding: 0.75rem; background: #fff; border: 1px solid #e6e6e6; border-radius: 14px; }
          .s-stacked-card { padding: 0.875rem; border-bottom: 1px solid #e8e8ee; }
          .s-stacked-card:last-child { border-bottom: 0; }
          .s-stacked-dim { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #11079e; margin-bottom: 0.5rem; }
          .s-stacked-row { font-size: 13.5px; line-height: 1.5; margin-bottom: 0.35rem; color: #6a6a8a; }
          .s-stacked-row .lbl { color: #07033c; font-weight: 500; margin-right: 0.4rem; }
          .s-stacked-row.somra { color: #07033c; }
        }

        /* FIT */
        .s-fit-grid {
          display: grid; gap: 1rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 760px) { .s-fit-grid { grid-template-columns: 1fr 1fr; } }
        .s-fit {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 14px; padding: 1.75rem;
        }
        .s-fit.good { border-color: #c5c1f5; background: #f5f5ff; }
        .s-fit-h {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 1rem;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .s-fit.good .s-fit-h { color: #11079e; }
        .s-fit.not .s-fit-h { color: #8888a0; }
        .s-fit-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.625rem; }
        .s-fit-item { display: flex; gap: 0.625rem; font-size: 14px; color: #07033c; line-height: 1.5; letter-spacing: -0.005em; }
        .s-fit-icon { flex-shrink: 0; margin-top: 1px; }
        .s-fit.good .s-fit-icon { color: #11079e; }
        .s-fit.not .s-fit-icon { color: #cccccc; }
        .s-fit.not .s-fit-item { color: #6a6a8a; }

        /* TABS */
        .s-tabs {
          display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
          margin-top: 1.75rem; margin-bottom: 1.5rem;
        }
        .s-tab {
          background: #fff; border: 1px solid #e6e6e6; color: #6a6a8a;
          font-size: 13px; font-weight: 500; cursor: pointer;
          padding: 8px 14px; border-radius: 999px;
          transition: all 0.18s;
          display: inline-flex; align-items: center; gap: 7px;
          letter-spacing: -0.005em;
        }
        .s-tab:hover { color: #07033c; border-color: #c5c1f5; }
        .s-tab[aria-selected="true"] {
          background: #eaebfc; border-color: #c5c1f5; color: #11079e;
        }
        .s-tab-icon { color: inherit; opacity: 0.85; }
        .s-tab-panel {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 14px; padding: 1.875rem 2rem;
          max-width: 720px; margin: 0 auto;
          animation: sFade 0.2s ease-out;
          text-align: left;
          display: flex; gap: 1rem; align-items: flex-start;
        }
        .s-tab-panel-icon {
          width: 42px; height: 42px; min-width: 42px;
          background: #eaebfc; color: #11079e;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-tab-panel-h { font-size: 1.15rem; font-weight: 600; color: #07033c; margin-bottom: 0.5rem; letter-spacing: -0.018em; }
        .s-tab-panel-d { font-size: 14.5px; color: #6a6a8a; line-height: 1.55; letter-spacing: -0.005em; }
        @keyframes sFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* FAQ */
        .s-faq-list {
          display: flex; flex-direction: column; gap: 0.5rem;
          max-width: 720px; margin: 0 auto;
        }
        .s-faq-item {
          background: #fff; border: 1px solid #e6e6e6;
          border-radius: 12px; overflow: hidden;
          transition: border-color 0.18s;
        }
        .s-faq-item.open { border-color: #c5c1f5; }
        .s-faq-q {
          width: 100%; background: transparent; border: 0; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.05rem 1.25rem; text-align: left;
          font-size: 14.5px; font-weight: 600; color: #07033c;
          letter-spacing: -0.015em;
        }
        .s-faq-toggle {
          color: #11079e; display: flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; border-radius: 999px; background: #eaebfc;
        }
        .s-faq-a-wrap {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.25s ease;
        }
        .s-faq-a-wrap.open { grid-template-rows: 1fr; }
        .s-faq-a-wrap > .s-faq-a { overflow: hidden; min-height: 0; }
        .s-faq-a-inner {
          font-size: 13.5px; color: #6a6a8a; line-height: 1.6;
          padding: 0 1.25rem 1.05rem;
          letter-spacing: -0.005em;
          text-align: left;
        }

        /* FINAL CTA */
        .s-final {
          background: linear-gradient(180deg, #ffffff 0%, #f0f0ff 100%);
          border: 1px solid #d0ceee;
          border-radius: 20px; padding: 3.5rem 2rem;
          text-align: center; max-width: 820px; margin: 0 auto;
          box-shadow: 0 1px 0 rgba(7,3,60,0.02), 0 24px 60px -28px rgba(17,7,158,0.28);
          position: relative; overflow: hidden;
        }
        .s-final-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          color: #11079e; margin-bottom: 1rem;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .s-final-h {
          font-size: clamp(1.65rem, 3.2vw, 2.25rem); font-weight: 600;
          color: #07033c; letter-spacing: -0.03em; line-height: 1.12;
          margin: 0 0 1rem; max-width: 620px; margin-left: auto; margin-right: auto;
        }
        .s-final-sub { font-size: 1rem; color: #5a5a7a; line-height: 1.55; max-width: 540px; margin: 0 auto 1.75rem; letter-spacing: -0.005em; }
        .s-final-fine {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px; color: #8888a0; margin-top: 1rem;
          letter-spacing: -0.005em;
        }

        /* FOOTER */
        .s-footer {
          border-top: 1px solid #e6e6e6;
          margin-top: 3rem;
          position: relative; z-index: 1;
        }
        .s-footer-inner {
          max-width: 1280px; margin: 0 auto; padding: 2.5rem 2rem;
          display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;
        }
        .s-footer-tag { font-size: 13px; color: #8888a0; margin-top: 0.5rem; letter-spacing: -0.005em; }
        .s-footer-right {
          display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;
        }
        .s-footer-email {
          color: #07033c; font-size: 13.5px; text-decoration: none; font-weight: 500;
          display: inline-flex; align-items: center; gap: 6px;
          letter-spacing: -0.005em;
        }
        .s-footer-email:hover { color: #11079e; }
        .s-footer-copy {
          text-align: center; font-size: 12px; color: #8888a0; padding: 0 2rem 2rem;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: -0.005em;
        }

        @media (max-width: 900px) {
          .s-hero { grid-template-columns: 1fr; gap: 2.5rem; }
          .s-hero-visual { display: none; }
        }
        @media (max-width: 640px) {
          .s-nav-inner { padding: 0 1.25rem; }
          .s-nav-right { gap: 0.875rem; }
          .s-nav-right .s-nav-link { display: none; }
          .s-hero { padding: 3rem 1.25rem 2.5rem; }
          .s-h1 { font-size: clamp(2.25rem, 8vw, 3rem); }
          .s-section, .s-footer-inner { padding-left: 1.25rem; padding-right: 1.25rem; }
          .s-section { padding-top: 4rem; padding-bottom: 4rem; }
          .s-section-tinted-wrap { padding: 4rem 0; }
          .s-final { padding: 2.5rem 1.5rem; }
          .s-tab-panel { flex-direction: column; }
        }
      `}</style>

      {/* PAGE-WIDE GRID PATTERN */}
      <AnimatedGridPattern numSquares={60} maxOpacity={0.35} duration={3.5} repeatDelay={1} width={44} height={44} />

      {/* PAGE-WIDE GLOW — fixed at viewport top */}
      <div className="s-page-glow" aria-hidden="true" />

      {/* FULL-SITE VERTICAL FRAME LINES */}
      <div className="s-frame-lines" aria-hidden="true" />

      {/* NAV */}
      <nav className="s-nav">
        <div className="s-nav-inner">
          <div className="s-wordmark">
            <span className="s-wordmark-mark" aria-hidden="true">
              <SomraLeafMark size={30} />
            </span>
            Somra
          </div>
          <div className="s-nav-right">
            <button className="s-nav-link" onClick={scrollTo('how-it-works')}>The system</button>
            <button className="s-nav-link" onClick={scrollTo('problem')}>The problem</button>
            <button className="s-nav-link" onClick={scrollTo('faq')}>FAQ</button>
            <button className="s-nav-link" onClick={scrollTo('verticals')}>Use cases</button>
            <button className="s-btn s-btn-primary">
              Book a Diagnostic Call
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="s-hero-wrap">
        <section className="s-hero">
          {/* LEFT — copy */}
          <div className="s-hero-content">
            <span className="s-eyebrow s-reveal s-reveal-in">
              For businesses with high-value contracts and complex sales cycles
            </span>
            <h1 className="s-h1">
              The outbound system built for <span className="s-h1-accent">complex sales cycles.</span>
            </h1>
            <p className="s-hero-sub">
              We design and run the outbound system your business should already have — without burning your domain, your founder's calendar, or your ICP.
            </p>
            <div className="s-cta-row">
              <button className="s-btn s-btn-primary s-btn-lg">
                <Icon name="calendar" size={15} />
                Book a Diagnostic Call
              </button>
              <button className="s-btn-text-link" onClick={scrollTo('how-it-works')}>
                See how the system works
                <Icon name="arrowRight" size={15} />
              </button>
            </div>
          </div>
          {/* RIGHT — node diagram */}
          <div className="s-hero-visual">
            <SomraSystemDiagram />
          </div>
        </section>
      </div>

      {/* TRUST SIGNALS BAR */}
      <div className="s-trust-bar-outer">
        <div className="s-trust-bar">
          <div className="s-trust-bar-inner">
            {TRUST_SIGNALS.map((sig, i) => (
              <div key={i} className="s-trust-item s-reveal" style={{ '--reveal-delay': `${i * 60}ms` }}>
                <div className="s-trust-label">{sig.label}</div>
                <div className="s-trust-sub">{sig.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY MOST EFFORTS STALL */}
      <section id="problem" className="s-section">
        <div className="s-reveal">
          <div className="s-section-eyebrow">The problem</div>
          <h2 className="s-section-h">Most outbound stalls before it produces real conversations.</h2>
          <p className="s-section-sub">The market is rarely the problem. The system behind it is.</p>
        </div>
        <div className="s-pains">
          {PAINS.map((p, i) => (
            <PainCard key={i} icon={p.icon} t={p.t} b={p.b}
              className="s-reveal" style={{ '--reveal-delay': `${i * 55}ms` }} />
          ))}
        </div>
      </section>

      {/* WHY CURRENT OPTIONS UNDERPERFORM */}
      <div className="s-section-tinted">
        <div className="s-section-tinted-wrap">
          <div className="s-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="s-reveal">
              <div className="s-section-eyebrow">Common approaches</div>
              <h2 className="s-section-h">Why most outbound approaches fall short.</h2>
              <p className="s-section-sub">Three patterns. All create activity. None create a system.</p>
            </div>
            <div className="s-options">
              {OPTIONS.map((o, i) => (
                <OptionCard key={i} icon={o.icon} t={o.t} d={o.d} p={o.p}
                  className="s-reveal" style={{ '--reveal-delay': `${i * 80}ms` }} />
              ))}
            </div>
            <div className="s-options-closer s-reveal" style={{ '--reveal-delay': '240ms' }}>
              <span className="s-options-closer-mark"><Icon name="sparkle" size={18} /></span>
              The issue isn't effort. It's that outbound is run as a series of tasks, not a system.
            </div>
          </div>
        </div>
      </div>

      {/* WHAT SOMRA BUILDS */}
      <section id="how-it-works" className="s-section">
        <div className="s-reveal">
          <div className="s-section-eyebrow">The system</div>
          <h2 className="s-section-h">What Somra puts in place instead.</h2>
          <p className="s-section-sub">
            A fully managed outbound system — built, operated, and improved over time.
          </p>
        </div>
        <div className="s-stages">
          {STAGES.map((s, i) => (
            <StageCard key={s.n} n={s.n} icon={s.icon} t={s.t} d={s.d}
              className="s-reveal" style={{ '--reveal-delay': `${i * 60}ms` }} />
          ))}
        </div>
      </section>

      {/* OUTCOMES */}
      <div className="s-section-tinted">
        <div className="s-section-tinted-wrap">
          <div className="s-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="s-reveal">
              <div className="s-section-eyebrow">The outcome</div>
              <h2 className="s-section-h">What the system is meant to create.</h2>
              <p className="s-section-sub">Not more activity. A steadier path from cold outreach to qualified conversations.</p>
            </div>
            <div className="s-outcomes">
              {OUTCOMES.map((o, i) => (
                <div key={i} className="s-outcome s-reveal" style={{ '--reveal-delay': `${i * 50}ms` }}>
                  <span className="s-outcome-check"><Icon name="check" size={14} /></span>
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COMPARISON */}
      <section className="s-section">
        <div className="s-reveal">
          <div className="s-section-eyebrow">Comparison</div>
          <h2 className="s-section-h">Three ways companies run outbound.</h2>
          <p className="s-section-sub">Same goal. Three very different ways. Only one compounds.</p>
        </div>
        <div className="s-table-wrap s-reveal" style={{ '--reveal-delay': '100ms' }}>
          <div className="s-table-scroll">
            <table className="s-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Founder-led effort</th>
                  <th>Generic agency</th>
                  <th className="somra-col">Somra managed system</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r, i) => (
                  <tr key={i}>
                    <td className="dim">{r.dim}</td>
                    <td className="col-a">{r.a}</td>
                    <td className="col-b">{r.b}</td>
                    <td className="somra-col">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="s-stacked" aria-hidden="false">
          {COMPARE.map((r, i) => (
            <div className="s-stacked-card" key={i}>
              <div className="s-stacked-dim">{r.dim}</div>
              <div className="s-stacked-row"><span className="lbl">Founder-led:</span>{r.a}</div>
              <div className="s-stacked-row"><span className="lbl">Generic agency:</span>{r.b}</div>
              <div className="s-stacked-row somra"><span className="lbl">Somra:</span>{r.c}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <div id="who-its-for" className="s-section-tinted">
        <div className="s-section-tinted-wrap">
          <div className="s-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="s-reveal">
              <div className="s-section-eyebrow">Who it's for</div>
              <h2 className="s-section-h">Who Somra is built for.</h2>
              <p className="s-section-sub">Not for everyone. Honest about both sides.</p>
            </div>
            <div className="s-fit-grid">
              <div className="s-fit good s-reveal">
                <div className="s-fit-h"><Icon name="check" size={14} /> Good fit</div>
                <ul className="s-fit-list">
                  {GOOD_FIT.map((g, i) => (
                    <li key={i} className="s-fit-item">
                      <span className="s-fit-icon"><Icon name="check" size={16} /></span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="s-fit not s-reveal" style={{ '--reveal-delay': '80ms' }}>
                <div className="s-fit-h"><Icon name="x" size={14} /> Not a fit</div>
                <ul className="s-fit-list">
                  {NOT_FIT.map((g, i) => (
                    <li key={i} className="s-fit-item">
                      <span className="s-fit-icon"><Icon name="x" size={16} /></span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHO WE WORK WITH */}
      <section id="verticals" className="s-section s-section-center">
        <div className="s-reveal">
          <div className="s-section-eyebrow">Who Somra works with</div>
          <h2 className="s-section-h">The same system, adapted to your buyers.</h2>
          <p className="s-section-sub">
          One outbound structure. Targeting, messaging, and signals tuned to what you sell.
        </p>
        </div>
        <div className="s-tabs s-reveal" style={{ '--reveal-delay': '80ms' }} role="tablist">
          {VERTICALS.map((v) => (
            <button
              key={v.id}
              className="s-tab"
              role="tab"
              aria-selected={activeTab === v.id}
              onClick={() => setActiveTab(v.id)}
              type="button"
            >
              <span className="s-tab-icon"><Icon name={v.icon} size={14} /></span>
              {v.label}
            </button>
          ))}
        </div>
        <div className="s-tab-panel" key={active.id}>
          <div className="s-tab-panel-icon"><Icon name={active.icon} size={20} /></div>
          <div>
            <div className="s-tab-panel-h">{active.full}</div>
            <div className="s-tab-panel-d">{active.description}</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq" className="s-section-tinted">
        <div className="s-section-tinted-wrap">
          <div className="s-section s-section-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="s-reveal">
              <div className="s-section-eyebrow">FAQ</div>
              <h2 className="s-section-h">Questions worth asking before a call.</h2>
              <p className="s-section-sub">Short answers to what people ask most.</p>
            </div>
            <div className="s-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className="s-reveal" style={{ '--reveal-delay': `${i * 60}ms` }}>
                <FaqItem
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HOW TO GET STARTED */}
      <section className="s-section">
        <div className="s-reveal">
          <div className="s-section-eyebrow">Getting started</div>
          <h2 className="s-section-h">Three steps from conversation to live system.</h2>
          <p className="s-section-sub">No lengthy onboarding. No stack requirements. A clear process from the first call.</p>
        </div>
        <div className="s-steps">
          {STEPS.map((s, i) => (
            <div key={s.n} className="s-step s-reveal" style={{ '--reveal-delay': `${i * 90}ms` }}>
              <div className="s-step-num">Step {s.n}</div>
              <div className="s-step-icon"><Icon name={s.icon} size={18} /></div>
              <div className="s-step-t">{s.t}</div>
              <div className="s-step-d">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="s-section">
        <div className="s-final s-reveal">
          <div className="s-final-eyebrow"><Icon name="sparkle" size={12} /> Take the next step</div>
          <h2 className="s-final-h">Replace scattered outbound with a managed system.</h2>
          <p className="s-final-sub">
            A 30-minute call. We'll review your setup, name the gaps, and tell you if Somra is the right fit.
          </p>
          <button className="s-btn s-btn-primary s-btn-lg">
            <Icon name="calendar" size={15} />
            Book a Diagnostic Call
          </button>
          <div className="s-final-fine">No deck  ·  No pitch  ·  Real conversation about your outbound</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="s-footer">
        <div className="s-footer-inner">
          <div>
            <div className="s-wordmark">
              <span className="s-wordmark-mark" aria-hidden="true">
                <SomraLeafMark size={30} />
              </span>
              Somra
            </div>
            <div className="s-footer-tag">A managed outbound system for higher-value commercial sales.</div>
          </div>
          <div className="s-footer-right">
            <a className="s-footer-email" href="mailto:hello@somra.io">
              <Icon name="mail" size={14} />
              hello@somra.io
            </a>
          </div>
        </div>
        <div className="s-footer-copy">© 2026 Somra  ·  All rights reserved</div>
      </footer>
    </div>
  )
}

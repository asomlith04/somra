import { useState, useEffect } from 'react'

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
]

const PAINS = [
  { icon: 'user', t: 'Founder-dependent prospecting', b: 'It only happens in the founder’s spare time.' },
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
  { n: '04', icon: 'pen', t: 'Message strategy', d: 'Outreach written for the buyer’s context.' },
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
  { dim: 'Message quality', a: 'Authentic but unscaled', b: 'Templated, recycled across clients', c: 'Written for the buyer’s role and context' },
  { dim: 'Follow-up discipline', a: 'Drops when other work appears', b: 'Aggressive and undifferentiated', c: 'A planned sequence across the committee' },
  { dim: 'Reply handling', a: 'Slow and bottlenecked', b: 'Auto-qualified, low context', c: 'Prompt, structured, full context' },
  { dim: 'Reporting', a: 'In the founder’s head', b: 'Activity dashboards, little insight', c: 'Regular reviews of what’s improving' },
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
]

function PainCard({ icon, t, b }) {
  return (
    <div className="s-pain">
      <div className="s-pain-icon"><Icon name={icon} size={18} /></div>
      <div>
        <div className="s-pain-t">{t}</div>
        <div className="s-pain-b">{b}</div>
      </div>
    </div>
  )
}

function OptionCard({ icon, t, d, p }) {
  return (
    <div className="s-option">
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

function StageCard({ n, icon, t, d }) {
  return (
    <div className="s-stage">
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

  useEffect(() => {
    const prevHtml = document.documentElement.style.background
    const prevBody = document.body.style.background
    document.documentElement.style.background = '#FAF8F6'
    document.body.style.background = '#FAF8F6'
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .s-root {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #FAF8F6;
          color: #171725;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          font-feature-settings: 'cv11', 'ss01', 'ss03';
          font-variant-ligatures: contextual;
        }
        .s-root *, .s-root *::before, .s-root *::after { box-sizing: border-box; }
        .s-root button { font-family: inherit; }
        .s-mono {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
          font-variant-ligatures: none;
        }
        .s-tnum { font-variant-numeric: tabular-nums; }

        /* NAV */
        .s-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250, 248, 246, 0.82);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid #E6E0DA;
          height: 64px;
        }
        .s-nav-inner {
          max-width: 1120px; margin: 0 auto; height: 100%;
          padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .s-wordmark {
          font-size: 16px; font-weight: 600; color: #171725;
          letter-spacing: -0.02em;
          display: inline-flex; align-items: center; gap: 9px;
        }
        .s-wordmark-mark {
          width: 22px; height: 22px; border-radius: 7px;
          background: linear-gradient(135deg, #6E63E9 0%, #8E78F5 100%);
          display: inline-flex; align-items: center; justify-content: center;
          color: #fff; font-size: 11px; font-weight: 700; letter-spacing: -0.02em;
          box-shadow: 0 4px 10px -4px rgba(110,99,233,0.5);
        }
        .s-nav-right { display: flex; align-items: center; gap: 2rem; }
        .s-nav-link {
          background: none; border: 0; padding: 0; cursor: pointer;
          color: #6A6A78; font-size: 13.5px; font-weight: 500;
          letter-spacing: -0.005em;
          transition: color 0.18s;
        }
        .s-nav-link:hover { color: #171725; }
        .s-btn {
          background: #171725; color: #fff; border: 0; cursor: pointer;
          padding: 10px 18px; border-radius: 999px;
          font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
          display: inline-flex; align-items: center; gap: 7px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 4px 12px -6px rgba(23,23,37,0.4);
        }
        .s-btn:hover { background: #2A2A3D; transform: translateY(-1px); }
        .s-btn-primary { background: #6E63E9; box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 8px 20px -8px rgba(110,99,233,0.55); }
        .s-btn-primary:hover { background: #5E54D8; }
        .s-btn-lg { padding: 13px 24px; font-size: 14.5px; }
        .s-btn-ghost {
          background: transparent; color: #171725; border: 1px solid #E0DAD3;
          padding: 10px 18px; border-radius: 999px;
          font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
          cursor: pointer; transition: border-color 0.18s, background 0.18s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .s-btn-ghost:hover { border-color: #171725; background: #fff; }

        /* HERO */
        .s-hero-wrap {
          position: relative;
          overflow: hidden;
        }
        .s-hero-glow {
          position: absolute;
          inset: -10% -10% 0 -10%;
          z-index: 0;
          pointer-events: none;
          background-image: radial-gradient(ellipse 60% 55% at 50% 18%, rgba(130, 73, 252, 0.22), rgba(130, 73, 252, 0.08) 40%, transparent 70%);
        }
        .s-hero {
          position: relative; z-index: 1;
          max-width: 1120px; margin: 0 auto;
          padding: 5rem 2rem 4rem;
          text-align: center;
        }
        .s-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11.5px; font-weight: 500; color: #6E63E9;
          background: rgba(110, 99, 233, 0.08);
          border: 1px solid rgba(110, 99, 233, 0.18);
          padding: 6px 13px; border-radius: 999px;
          letter-spacing: 0.02em; text-transform: uppercase;
        }
        .s-eyebrow svg { color: #6E63E9; }
        .s-h1 {
          font-size: clamp(2.25rem, 5vw, 3.75rem);
          font-weight: 600; line-height: 1.04; letter-spacing: -0.038em;
          color: #171725; margin: 1.4rem auto 1.25rem;
          max-width: 820px;
        }
        .s-h1-accent {
          background: linear-gradient(180deg, #171725 0%, #3F3F4D 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .s-hero-sub {
          font-size: 1.075rem; color: #5A5A68; line-height: 1.55;
          max-width: 620px; margin: 0 auto 2rem;
          letter-spacing: -0.005em;
        }
        .s-cta-row { display: flex; gap: 0.625rem; justify-content: center; align-items: center; flex-wrap: wrap; }
        .s-microline {
          margin-top: 1.25rem; font-size: 12.5px; color: #8B8B96;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: -0.005em;
        }

        /* HERO WORKFLOW */
        .s-flow {
          margin: 3.25rem auto 0; max-width: 1040px;
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 18px; padding: 1.5rem;
          box-shadow: 0 1px 0 rgba(23,23,37,0.02), 0 16px 40px -20px rgba(110,99,233,0.18);
        }
        .s-flow-label {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          color: #8B8B96; margin-bottom: 1rem;
          display: flex; align-items: center; gap: 8px;
        }
        .s-flow-label::before, .s-flow-label::after {
          content: ''; flex: 1; height: 1px; background: #EFEAE4;
        }
        .s-flow-row {
          display: flex; align-items: stretch; gap: 8px;
          overflow-x: auto;
        }
        .s-flow-step {
          flex: 1 1 0; min-width: 120px;
          background: #FAF8F6; border: 1px solid #E6E0DA;
          border-radius: 10px;
          padding: 12px 12px;
          display: flex; flex-direction: column; gap: 8px;
          position: relative;
          transition: background 0.18s, border-color 0.18s;
        }
        .s-flow-step-top {
          display: flex; align-items: center; justify-content: space-between;
        }
        .s-flow-step-n {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 500; color: #8B8B96; letter-spacing: 0.04em;
        }
        .s-flow-step-i {
          color: #6E63E9; display: flex;
        }
        .s-flow-step-t { font-size: 13px; font-weight: 500; color: #171725; line-height: 1.3; letter-spacing: -0.005em; }
        .s-flow-step.active { background: #EFEAFE; border-color: #C9BFFC; }
        .s-flow-step.active .s-flow-step-n { color: #6E63E9; }

        /* SECTIONS */
        .s-section { max-width: 1120px; margin: 0 auto; padding: 5rem 2rem; }
        .s-section-tinted { background: #F5F1EC; }
        .s-section-tinted-wrap { padding: 5rem 0; }
        .s-section-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          color: #6E63E9; margin-bottom: 0.875rem;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .s-section-eyebrow::before {
          content: ''; width: 18px; height: 1px; background: #6E63E9;
        }
        .s-section-h {
          font-size: clamp(1.75rem, 3.1vw, 2.4rem);
          font-weight: 600; color: #171725;
          letter-spacing: -0.03em; line-height: 1.12;
          max-width: 760px; margin: 0 0 1rem;
        }
        .s-section-sub {
          font-size: 1rem; color: #5A5A68; line-height: 1.55;
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
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 12px; padding: 1.125rem 1.25rem;
          display: flex; gap: 0.875rem; align-items: flex-start;
          transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .s-pain:hover { border-color: #C9BFFC; box-shadow: 0 6px 16px -10px rgba(110,99,233,0.2); }
        .s-pain-icon {
          width: 34px; height: 34px; min-width: 34px;
          background: #EFEAFE; color: #6E63E9;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-pain-t { font-size: 14.5px; font-weight: 600; color: #171725; margin-bottom: 3px; letter-spacing: -0.012em; }
        .s-pain-b { font-size: 13.5px; color: #6A6A78; line-height: 1.5; letter-spacing: -0.005em; }

        /* OPTIONS */
        .s-options {
          display: grid; gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .s-option {
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 14px; padding: 1.5rem;
        }
        .s-option-head {
          display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;
        }
        .s-option-icon {
          width: 34px; height: 34px;
          background: #F5F1EC; color: #171725;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-option-t { font-size: 15.5px; font-weight: 600; color: #171725; letter-spacing: -0.015em; }
        .s-option-d { font-size: 13.5px; color: #6A6A78; line-height: 1.55; letter-spacing: -0.005em; }
        .s-option-divider { height: 1px; background: #E6E0DA; margin: 1rem 0; }
        .s-option-pl {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          color: #C73659; margin-bottom: 0.4rem;
        }
        .s-option-p { font-size: 13.5px; color: #3F3F4D; line-height: 1.55; letter-spacing: -0.005em; }
        .s-options-closer {
          margin-top: 1.75rem; font-size: 14.5px; color: #3F3F4D; line-height: 1.55;
          background: #fff; border: 1px solid #E6E0DA; border-radius: 12px;
          padding: 1.125rem 1.4rem;
          letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .s-options-closer-mark {
          color: #6E63E9; flex-shrink: 0;
        }

        /* STAGES */
        .s-stages {
          display: grid; gap: 0.75rem;
          grid-template-columns: 1fr;
        }
        .s-stage {
          display: flex; gap: 1rem; align-items: stretch;
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 12px; padding: 1.125rem 1.25rem;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .s-stage:hover { border-color: #C9BFFC; box-shadow: 0 6px 18px -12px rgba(110,99,233,0.22); }
        .s-stage-num {
          width: 40px; min-width: 40px; height: 40px;
          background: #EFEAFE; color: #6E63E9;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-stage-body { flex: 1; }
        .s-stage-meta {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #8B8B96;
          margin-bottom: 4px;
        }
        .s-stage-t { font-size: 15px; font-weight: 600; color: #171725; margin-bottom: 3px; letter-spacing: -0.015em; }
        .s-stage-d { font-size: 13.5px; color: #6A6A78; line-height: 1.5; letter-spacing: -0.005em; }
        @media (min-width: 760px) {
          .s-stages { grid-template-columns: 1fr 1fr; }
        }

        /* OUTCOMES */
        .s-outcomes {
          display: grid; gap: 0.75rem;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .s-outcome {
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 12px; padding: 1rem 1.125rem;
          display: flex; gap: 0.75rem; align-items: flex-start;
          font-size: 14px; color: #171725; line-height: 1.45;
          letter-spacing: -0.005em;
        }
        .s-outcome-check {
          color: #6E63E9;
          background: #EFEAFE;
          border-radius: 999px;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* TESTIMONIAL */
        .s-testimonial-wrap { max-width: 860px; margin: 0 auto; padding: 4rem 2rem; }
        .s-testimonial {
          background: #fff; border: 1px solid #E6E0DA; border-radius: 16px;
          padding: 2.5rem 2.25rem;
          position: relative;
          box-shadow: 0 1px 0 rgba(23,23,37,0.02), 0 16px 40px -24px rgba(23,23,37,0.18);
        }
        .s-testimonial-quote {
          color: #C9BFFC; position: absolute; top: 1.25rem; right: 1.5rem;
        }
        .s-testimonial-body {
          font-size: clamp(1.125rem, 1.6vw, 1.35rem);
          line-height: 1.45; color: #171725;
          font-weight: 500; letter-spacing: -0.018em;
          margin-bottom: 1.5rem;
        }
        .s-testimonial-attrib { display: flex; align-items: center; gap: 0.875rem; }
        .s-testimonial-avatar {
          width: 40px; height: 40px; border-radius: 999px;
          background: linear-gradient(135deg, #6E63E9, #8E78F5);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-size: 13.5px; font-weight: 600; letter-spacing: -0.01em;
        }
        .s-testimonial-meta { display: flex; flex-direction: column; }
        .s-testimonial-name { font-size: 13.5px; font-weight: 600; color: #171725; letter-spacing: -0.005em; }
        .s-testimonial-role { font-size: 12.5px; color: #8B8B96; }

        /* TABLE */
        .s-table-wrap {
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 14px; overflow: hidden;
        }
        .s-table-scroll { overflow-x: auto; }
        .s-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 720px; }
        .s-table th, .s-table td {
          padding: 14px 18px; text-align: left;
          border-bottom: 1px solid #EFEAE4; vertical-align: top;
          letter-spacing: -0.005em;
        }
        .s-table thead th {
          background: #FAF8F6; color: #171725;
          font-size: 12.5px; font-weight: 600; letter-spacing: -0.005em;
        }
        .s-table thead th.somra-col { background: #EFEAFE; color: #6E63E9; }
        .s-table td.dim { color: #171725; font-weight: 500; width: 22%; }
        .s-table td.col-a, .s-table td.col-b { color: #6A6A78; }
        .s-table td.somra-col { background: #FBF9FF; color: #171725; border-left: 1px solid #E0D8FC; border-right: 1px solid #E0D8FC; font-weight: 500; }
        .s-table tbody tr:last-child td { border-bottom: 0; }
        .s-stacked { display: none; }
        @media (max-width: 720px) {
          .s-table-scroll { display: none; }
          .s-stacked { display: block; padding: 0.75rem; background: #fff; border: 1px solid #E6E0DA; border-radius: 14px; }
          .s-stacked-card { padding: 0.875rem; border-bottom: 1px solid #EFEAE4; }
          .s-stacked-card:last-child { border-bottom: 0; }
          .s-stacked-dim { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #6E63E9; margin-bottom: 0.5rem; }
          .s-stacked-row { font-size: 13.5px; line-height: 1.5; margin-bottom: 0.35rem; color: #6A6A78; }
          .s-stacked-row .lbl { color: #171725; font-weight: 500; margin-right: 0.4rem; }
          .s-stacked-row.somra { color: #171725; }
        }

        /* FIT */
        .s-fit-grid {
          display: grid; gap: 1rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 760px) { .s-fit-grid { grid-template-columns: 1fr 1fr; } }
        .s-fit {
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 14px; padding: 1.75rem;
        }
        .s-fit.good { border-color: #C9BFFC; background: #FBF9FF; }
        .s-fit-h {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 1rem;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .s-fit.good .s-fit-h { color: #6E63E9; }
        .s-fit.not .s-fit-h { color: #8B8B96; }
        .s-fit-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.625rem; }
        .s-fit-item { display: flex; gap: 0.625rem; font-size: 14px; color: #171725; line-height: 1.5; letter-spacing: -0.005em; }
        .s-fit-icon { flex-shrink: 0; margin-top: 1px; }
        .s-fit.good .s-fit-icon { color: #6E63E9; }
        .s-fit.not .s-fit-icon { color: #B8B8C2; }
        .s-fit.not .s-fit-item { color: #6A6A78; }

        /* TABS */
        .s-tabs {
          display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
          margin-top: 1.75rem; margin-bottom: 1.5rem;
        }
        .s-tab {
          background: #fff; border: 1px solid #E6E0DA; color: #6A6A78;
          font-size: 13px; font-weight: 500; cursor: pointer;
          padding: 8px 14px; border-radius: 999px;
          transition: all 0.18s;
          display: inline-flex; align-items: center; gap: 7px;
          letter-spacing: -0.005em;
        }
        .s-tab:hover { color: #171725; border-color: #C9BFFC; }
        .s-tab[aria-selected="true"] {
          background: #EFEAFE; border-color: #C9BFFC; color: #6E63E9;
        }
        .s-tab-icon { color: inherit; opacity: 0.85; }
        .s-tab-panel {
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 14px; padding: 1.875rem 2rem;
          max-width: 720px; margin: 0 auto;
          animation: sFade 0.2s ease-out;
          text-align: left;
          display: flex; gap: 1rem; align-items: flex-start;
        }
        .s-tab-panel-icon {
          width: 42px; height: 42px; min-width: 42px;
          background: #EFEAFE; color: #6E63E9;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .s-tab-panel-h { font-size: 1.15rem; font-weight: 600; color: #171725; margin-bottom: 0.5rem; letter-spacing: -0.018em; }
        .s-tab-panel-d { font-size: 14.5px; color: #6A6A78; line-height: 1.55; letter-spacing: -0.005em; }
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
          background: #fff; border: 1px solid #E6E0DA;
          border-radius: 12px; overflow: hidden;
          transition: border-color 0.18s;
        }
        .s-faq-item.open { border-color: #C9BFFC; }
        .s-faq-q {
          width: 100%; background: transparent; border: 0; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.05rem 1.25rem; text-align: left;
          font-size: 14.5px; font-weight: 600; color: #171725;
          letter-spacing: -0.015em;
        }
        .s-faq-toggle {
          color: #6E63E9; display: flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; border-radius: 999px; background: #EFEAFE;
        }
        .s-faq-a-wrap {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.25s ease;
        }
        .s-faq-a-wrap.open { grid-template-rows: 1fr; }
        .s-faq-a-wrap > .s-faq-a { overflow: hidden; min-height: 0; }
        .s-faq-a-inner {
          font-size: 13.5px; color: #6A6A78; line-height: 1.6;
          padding: 0 1.25rem 1.05rem;
          letter-spacing: -0.005em;
          text-align: left;
        }

        /* FINAL CTA */
        .s-final {
          background: linear-gradient(180deg, #FFFFFF 0%, #F8F4FE 100%);
          border: 1px solid #E0D8FC;
          border-radius: 20px; padding: 3.5rem 2rem;
          text-align: center; max-width: 820px; margin: 0 auto;
          box-shadow: 0 1px 0 rgba(23,23,37,0.02), 0 24px 60px -28px rgba(110,99,233,0.32);
          position: relative; overflow: hidden;
        }
        .s-final-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          color: #6E63E9; margin-bottom: 1rem;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .s-final-h {
          font-size: clamp(1.65rem, 3.2vw, 2.25rem); font-weight: 600;
          color: #171725; letter-spacing: -0.03em; line-height: 1.12;
          margin: 0 0 1rem; max-width: 620px; margin-left: auto; margin-right: auto;
        }
        .s-final-sub { font-size: 1rem; color: #5A5A68; line-height: 1.55; max-width: 540px; margin: 0 auto 1.75rem; letter-spacing: -0.005em; }
        .s-final-fine {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px; color: #8B8B96; margin-top: 1rem;
          letter-spacing: -0.005em;
        }

        /* FOOTER */
        .s-footer {
          border-top: 1px solid #E6E0DA;
          margin-top: 3rem;
        }
        .s-footer-inner {
          max-width: 1120px; margin: 0 auto; padding: 2.5rem 2rem;
          display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;
        }
        .s-footer-tag { font-size: 13px; color: #8B8B96; margin-top: 0.5rem; letter-spacing: -0.005em; }
        .s-footer-right {
          display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;
        }
        .s-footer-email {
          color: #171725; font-size: 13.5px; text-decoration: none; font-weight: 500;
          display: inline-flex; align-items: center; gap: 6px;
          letter-spacing: -0.005em;
        }
        .s-footer-email:hover { color: #6E63E9; }
        .s-footer-copy {
          text-align: center; font-size: 12px; color: #8B8B96; padding: 0 2rem 2rem;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: -0.005em;
        }

        @media (max-width: 640px) {
          .s-nav-inner { padding: 0 1.25rem; }
          .s-nav-right { gap: 0.875rem; }
          .s-nav-right .s-nav-link { display: none; }
          .s-hero { padding: 3.25rem 1.25rem 2.5rem; }
          .s-section, .s-footer-inner { padding-left: 1.25rem; padding-right: 1.25rem; }
          .s-section { padding-top: 3.5rem; padding-bottom: 3.5rem; }
          .s-section-tinted-wrap { padding: 3.5rem 0; }
          .s-testimonial-wrap { padding: 3rem 1.25rem; }
          .s-testimonial { padding: 2rem 1.5rem; }
          .s-final { padding: 2.5rem 1.5rem; }
          .s-flow { padding: 1.25rem; }
          .s-flow-row { flex-direction: column; }
          .s-tab-panel { flex-direction: column; }
        }
      `}</style>

      {/* NAV */}
      <nav className="s-nav">
        <div className="s-nav-inner">
          <div className="s-wordmark">
            <span className="s-wordmark-mark" aria-hidden="true">S</span>
            Somra
          </div>
          <div className="s-nav-right">
            <button className="s-nav-link" onClick={scrollTo('how-it-works')}>How it works</button>
            <button className="s-nav-link" onClick={scrollTo('who-its-for')}>Who it’s for</button>
            <button className="s-nav-link" onClick={scrollTo('faq')}>FAQ</button>
            <button className="s-btn s-btn-primary">
              Book a Strategy Call
              <Icon name="arrowRight" size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="s-hero-wrap">
      <div className="s-hero-glow" aria-hidden="true" />
      <section className="s-hero">
        <span className="s-eyebrow">
          <Icon name="sparkle" size={12} />
          Fully managed outbound system
        </span>
        <h1 className="s-h1">
          Turn cold prospects into <span className="s-h1-accent">qualified sales conversations.</span>
        </h1>
        <p className="s-hero-sub">
          Somra designs, builds, and operates the full outbound system behind your pipeline — so your team can focus on selling, not stitching tools together.
        </p>
        <div className="s-cta-row">
          <button className="s-btn s-btn-primary s-btn-lg">
            <Icon name="calendar" size={15} />
            Book a Strategy Call
          </button>
          <button className="s-btn-ghost" onClick={scrollTo('how-it-works')}>
            See How the System Works
            <Icon name="arrowDown" size={14} />
          </button>
        </div>
        <div className="s-microline">No spam-heavy tactics  ·  No generic scripts  ·  No vanity-metric reporting</div>

        <div className="s-flow" aria-label="Outbound system workflow">
          <div className="s-flow-label">The Somra System  ·  7 Stages</div>
          <div className="s-flow-row">
            {HERO_STAGES.map((s, i) => (
              <div key={s.label} className={`s-flow-step${i === 0 ? ' active' : ''}`}>
                <div className="s-flow-step-top">
                  <span className="s-flow-step-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="s-flow-step-i"><Icon name={s.icon} size={15} /></span>
                </div>
                <span className="s-flow-step-t">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* WHY MOST EFFORTS STALL */}
      <section className="s-section">
        <div className="s-section-eyebrow">The problem</div>
        <h2 className="s-section-h">Most outbound stalls before it produces real conversations.</h2>
        <p className="s-section-sub">The market is rarely the problem. The system behind it is.</p>
        <div className="s-pains">
          {PAINS.map((p, i) => <PainCard key={i} icon={p.icon} t={p.t} b={p.b} />)}
        </div>
      </section>

      {/* WHY CURRENT OPTIONS UNDERPERFORM */}
      <div className="s-section-tinted">
        <div className="s-section-tinted-wrap">
          <div className="s-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="s-section-eyebrow">Common approaches</div>
            <h2 className="s-section-h">Why most outbound approaches fall short.</h2>
            <p className="s-section-sub">Three patterns. All create activity. None create a system.</p>
            <div className="s-options">
              {OPTIONS.map((o, i) => <OptionCard key={i} icon={o.icon} t={o.t} d={o.d} p={o.p} />)}
            </div>
            <div className="s-options-closer">
              <span className="s-options-closer-mark"><Icon name="sparkle" size={18} /></span>
              The issue isn’t effort. It’s that outbound is run as a series of tasks, not a system.
            </div>
          </div>
        </div>
      </div>

      {/* WHAT SOMRA BUILDS */}
      <section id="how-it-works" className="s-section">
        <div className="s-section-eyebrow">The system</div>
        <h2 className="s-section-h">What Somra puts in place instead.</h2>
        <p className="s-section-sub">
          A fully managed outbound system — built, operated, and improved over time.
        </p>
        <div className="s-stages">
          {STAGES.map((s) => <StageCard key={s.n} n={s.n} icon={s.icon} t={s.t} d={s.d} />)}
        </div>
      </section>

      {/* OUTCOMES */}
      <div className="s-section-tinted">
        <div className="s-section-tinted-wrap">
          <div className="s-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="s-section-eyebrow">The outcome</div>
            <h2 className="s-section-h">What the system is meant to create.</h2>
            <p className="s-section-sub">Not more activity. A steadier path from cold outreach to qualified conversations.</p>
            <div className="s-outcomes">
              {OUTCOMES.map((o, i) => (
                <div key={i} className="s-outcome">
                  <span className="s-outcome-check"><Icon name="check" size={14} /></span>
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div className="s-testimonial-wrap">
        <div className="s-testimonial">
          <span className="s-testimonial-quote"><Icon name="quote" size={36} /></span>
          <p className="s-testimonial-body">
            Outbound stopped being something we patched together every quarter. Somra runs it like an operating system — clean infrastructure, sharp messaging, and reviews we can actually act on.
          </p>
          <div className="s-testimonial-attrib">
            <span className="s-testimonial-avatar">JM</span>
            <div className="s-testimonial-meta">
              <span className="s-testimonial-name">Jordan Marsh</span>
              <span className="s-testimonial-role">VP Revenue, RevOps platform</span>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARISON */}
      <section className="s-section">
        <div className="s-section-eyebrow">Comparison</div>
        <h2 className="s-section-h">Three ways companies run outbound.</h2>
        <p className="s-section-sub">Same goal. Three very different ways. Only one compounds.</p>
        <div className="s-table-wrap">
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
            <div className="s-section-eyebrow">Who it’s for</div>
            <h2 className="s-section-h">Who Somra is built for.</h2>
            <p className="s-section-sub">Not for everyone. Honest about both sides.</p>
            <div className="s-fit-grid">
              <div className="s-fit good">
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
              <div className="s-fit not">
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
        <div className="s-section-eyebrow">Who Somra works with</div>
        <h2 className="s-section-h">The same system, adapted to your buyers.</h2>
        <p className="s-section-sub">
          One outbound structure. Targeting, messaging, and signals tuned to what you sell.
        </p>
        <div className="s-tabs" role="tablist">
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
            <div className="s-section-eyebrow">FAQ</div>
            <h2 className="s-section-h">Questions worth asking before a call.</h2>
            <p className="s-section-sub">Short answers to what people ask most.</p>
            <div className="s-faq-list">
              {FAQS.map((f, i) => (
                <FaqItem
                  key={i}
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <section className="s-section">
        <div className="s-final">
          <div className="s-final-eyebrow"><Icon name="sparkle" size={12} /> Take the next step</div>
          <h2 className="s-final-h">Replace scattered outbound with a managed system.</h2>
          <p className="s-final-sub">
            A 30-minute call. We’ll review your setup, name the gaps, and tell you if Somra is the right fit.
          </p>
          <button className="s-btn s-btn-primary s-btn-lg">
            <Icon name="calendar" size={15} />
            Book a Strategy Call
          </button>
          <div className="s-final-fine">No deck  ·  No pitch  ·  Real conversation about your outbound</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="s-footer">
        <div className="s-footer-inner">
          <div>
            <div className="s-wordmark">
              <span className="s-wordmark-mark" aria-hidden="true">S</span>
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

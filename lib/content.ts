import type { MediaKey } from "./media";

export const site = {
  name: "VECHTEL Engineering & Construction",
  short: "VECHTEL",
  location: "Chicago, Illinois, USA",
  tagline: "Engineering ambition. Building what’s next.",
  description:
    "VECHTEL Engineering & Construction is a Chicago-based company founded in 2020. It delivers design, procurement, construction and commissioning for industrial, commercial and logistics facilities.",
};

/**
 * Company facts confirmed by the owner (28 Oct 2026).
 * Founder name spelling to be confirmed — change it here only.
 */
export const company = {
  founded: 2020,
  founder: "Chris Vectol",
  milestones: [
    {
      year: "2020",
      title: "VECHTEL is founded",
      body: "Chris Vectol founds VECHTEL Engineering & Construction — a young, technically focused firm that joins engineering, construction and commissioning in one team.",
    },
    {
      year: "2021",
      title: "Ford Rouge Electric Vehicle Center",
      body: "VECHTEL helps on the Ford Rouge Electric Vehicle Center in Dearborn, Michigan, the facility built for the all-electric F-150 Lightning.",
    },
    {
      year: "Today",
      title: "Industrial, commercial and logistics facilities",
      body: "Design, procurement, construction, testing and commissioning, delivered from Chicago.",
    },
  ],
  trademarkNote:
    "Ford is a trademark of Ford Motor Company. Reference to the project describes VECHTEL’s participation and does not imply endorsement.",
};

export const nav = [
  { href: "/company/", label: "Company" },
  { href: "/expertise/", label: "Expertise" },
  { href: "/sectors/", label: "Sectors" },
  { href: "/careers/", label: "Careers" },
  { href: "/contact/", label: "Contact" },
] as const;

export type Expertise = {
  n: string;
  slug: string;
  title: string;
  short: string;
  body: string;
  scope: string[];
  image: MediaKey;
};

export const expertise: Expertise[] = [
  {
    n: "01",
    slug: "engineering-design",
    title: "Engineering & Design",
    short:
      "Multidisciplinary design that turns operational requirements into buildable, coordinated documents.",
    body:
      "We start from how the facility must perform — process flows, loads, utilities, occupancy, future expansion — and develop the architectural, structural and building-systems design around it. Disciplines are coordinated early so that conflicts are resolved on the drawing, not in the field.",
    scope: [
      "Basis of design and requirements definition",
      "Architectural, structural and MEP design coordination",
      "Constructability and value engineering reviews",
      "Design documentation for permitting and construction",
    ],
    image: "blueprints",
  },
  {
    n: "02",
    slug: "procurement",
    title: "Procurement & Equipment Coordination",
    short:
      "Sourcing, specification and delivery control for long-lead equipment and critical materials.",
    body:
      "Equipment decisions shape schedules. We define technical specifications, evaluate bids, follow manufacturing and factory testing, and coordinate deliveries with the construction sequence so that critical items arrive documented and ready to install.",
    scope: [
      "Technical specifications and bid evaluation",
      "Long-lead equipment tracking and expediting",
      "Vendor document and submittal review",
      "Delivery, receiving and storage coordination",
    ],
    image: "valves",
  },
  {
    n: "03",
    slug: "construction-management",
    title: "Construction Management",
    short:
      "Planning, sequencing and site leadership that keep safety, quality, cost and schedule in view.",
    body:
      "On site, we coordinate trades, logistics and inspections against a single integrated plan. Progress, quality and safety are tracked continuously, and design questions are closed out quickly with the engineering team that produced the drawings.",
    scope: [
      "Construction planning, sequencing and logistics",
      "Trade contractor coordination",
      "Site safety and quality management",
      "Cost, schedule and change control",
    ],
    image: "construction",
  },
  {
    n: "04",
    slug: "building-systems",
    title: "Building Systems",
    short:
      "Mechanical, electrical, plumbing, process utilities and controls delivered as one integrated system.",
    body:
      "Modern facilities depend on their systems: HVAC and ventilation, power distribution, process utilities, fire protection, and the controls that tie them together. We plan these systems as a whole, with clear interfaces between disciplines and with operation and maintenance in mind.",
    scope: [
      "HVAC, ventilation and environmental control",
      "Power distribution and electrical systems",
      "Process utilities and piping",
      "Building automation and controls integration",
    ],
    image: "pipework",
  },
  {
    n: "05",
    slug: "validation-testing",
    title: "Validation & Testing",
    short:
      "Documented evidence that equipment and systems perform exactly as specified.",
    body:
      "Testing is planned from the start, not added at the end. We write validation plans and test protocols with defined acceptance criteria, execute and witness tests, analyze results, and manage non-conformances through to corrective action and closure.",
    scope: [
      "Validation plans and test protocols",
      "Acceptance criteria and traceability to requirements",
      "Test execution, witnessing and result analysis",
      "Non-conformance and corrective-action management",
    ],
    image: "plantRoom",
  },
  {
    n: "06",
    slug: "commissioning-handover",
    title: "Commissioning & Handover",
    short:
      "A systematic transition from completed construction to a facility ready to operate.",
    body:
      "Commissioning brings systems to life in a controlled sequence and verifies that they work together under real operating conditions. Handover then gives the owner what they need to run the facility: complete documentation, as-built records and trained operating teams.",
    scope: [
      "System start-up and integrated systems testing",
      "Functional performance verification",
      "Turnover packages and as-built documentation",
      "Operator training and handover support",
    ],
    image: "commissioning",
  },
];

export type Sector = {
  n: string;
  slug: string;
  title: string;
  lede: string;
  facilities: string[];
  challenges: { title: string; body: string }[];
  image: MediaKey;
};

export const sectors: Sector[] = [
  {
    n: "01",
    slug: "industrial-manufacturing",
    title: "Industrial & Manufacturing",
    lede:
      "Production facilities where the building, the utilities and the process equipment must work as one.",
    facilities: [
      "Manufacturing plants",
      "Production complexes",
      "Process and utility buildings",
      "Plant expansions and retrofits",
    ],
    challenges: [
      {
        title: "Process-driven layouts",
        body: "Structure, utilities and circulation planned around production flow, equipment footprints and future capacity.",
      },
      {
        title: "Heavy equipment integration",
        body: "Foundations, rigging paths, utility connections and installation sequences coordinated with equipment vendors.",
      },
      {
        title: "Construction in live operations",
        body: "Phasing, tie-ins and shutdown windows planned to protect ongoing production.",
      },
      {
        title: "Verified readiness",
        body: "Systems tested and documented against acceptance criteria before production begins.",
      },
    ],
    image: "factoryInterior",
  },
  {
    n: "02",
    slug: "commercial-buildings",
    title: "Commercial Buildings",
    lede:
      "Office and commercial buildings that need to be efficient to run and comfortable to occupy.",
    facilities: [
      "Office buildings",
      "Corporate headquarters",
      "Mixed commercial space",
      "Interior fit-outs and renovations",
    ],
    challenges: [
      {
        title: "Envelope and systems performance",
        body: "Facade, HVAC, lighting and controls designed together for comfort and energy performance.",
      },
      {
        title: "Coordinated MEP in tight ceilings",
        body: "Services routed and coordinated in limited space without compromising layouts or finishes.",
      },
      {
        title: "Occupied-building works",
        body: "Renovations sequenced to keep tenants operating with minimal disruption.",
      },
      {
        title: "Commissioned building systems",
        body: "Life-safety, mechanical and electrical systems verified and handed over with complete documentation.",
      },
    ],
    image: "officeFacade",
  },
  {
    n: "03",
    slug: "logistics-distribution",
    title: "Logistics & Distribution",
    lede:
      "Warehouses and distribution centers where speed of delivery and operational uptime matter most.",
    facilities: [
      "Warehouses",
      "Distribution centers",
      "Fulfillment and cross-dock facilities",
      "Temperature-controlled storage",
    ],
    challenges: [
      {
        title: "Large-span structures",
        body: "Efficient structural systems, slabs and clear heights matched to racking and material-handling layouts.",
      },
      {
        title: "Material-handling interfaces",
        body: "Coordination of conveyors, docks and automation with structure, power and controls.",
      },
      {
        title: "Fast-track schedules",
        body: "Early procurement and tightly sequenced construction to meet operational start dates.",
      },
      {
        title: "Operational readiness",
        body: "Dock equipment, fire protection and building systems tested before inventory arrives.",
      },
    ],
    image: "warehouse",
  },
];

export const approach = [
  {
    n: "01",
    title: "Define",
    body: "Requirements, constraints, risks and success criteria are agreed before design begins.",
    outcome: "Basis of design and project execution plan",
  },
  {
    n: "02",
    title: "Design",
    body: "Disciplines develop a coordinated, constructible design with procurement and testing in mind.",
    outcome: "Coordinated design package and equipment specifications",
  },
  {
    n: "03",
    title: "Build",
    body: "Construction, procurement and installation follow one integrated plan with continuous quality control.",
    outcome: "Mechanically complete facility, inspected and documented",
  },
  {
    n: "04",
    title: "Verify",
    body: "Systems are tested against defined acceptance criteria; deviations are resolved and closed out.",
    outcome: "Executed test protocols and closed non-conformances",
  },
  {
    n: "05",
    title: "Handover",
    body: "The owner receives a commissioned facility, complete records and a team trained to run it.",
    outcome: "Turnover package, as-builts and operational readiness",
  },
];

export const job = {
  slug: "validation-testing-engineer",
  title: "Validation & Testing Engineer",
  location: "Chicago area, Illinois",
  arrangement: "Full-time, on-site; project travel may be required.",
  discipline: "Validation & Testing",
  summary:
    "You will plan, execute and document the testing that proves our facilities and their systems perform as specified — from the first validation plan to the documentation an owner receives at handover.",
  responsibilities: [
    "Prepare and maintain technical documentation for validation and testing activities.",
    "Develop validation plans that define scope, strategy and responsibilities.",
    "Write test programs and protocols for equipment and building systems.",
    "Define acceptance criteria traceable to project requirements and specifications.",
    "Execute and witness tests, and analyze and report results.",
    "Identify and document non-conformances; drive corrective actions to closure.",
    "Prepare validation and testing documentation for facility turnover and handover.",
  ],
  workWith: [
    "Design engineers across mechanical, electrical and process disciplines",
    "Construction and commissioning teams on site",
    "Equipment vendors and their field representatives",
    "Client engineering, quality and operations teams",
  ],
};

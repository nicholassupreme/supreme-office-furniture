// Projects from the old supreme.com.my portfolio pages. Photos are served from our Cloudflare R2 bucket (supreme-products).
const f = (id: string) =>
  `https://pub-0394e669f99a47be83c5487b3c89e601.r2.dev/s/1022051/f/${id}`;

/** Industry groups, in the order they appear on the portfolio page. */
export const industries = [
  "Banking & Finance",
  "Technology & E-commerce",
  "Healthcare",
  "Education",
  "Government & GLCs",
  "Manufacturing & Industrial",
  "Logistics & Warehousing",
  "Property & Construction",
  "Hospitality",
  "Retail, F&B & Showrooms",
  "Co-working & Serviced Offices",
  "Oil, Gas & Energy",
  "Media & Creative",
  "NGOs, Associations & Religious",
  "Jewellery & Gold",
] as const;
export type Industry = (typeof industries)[number];

/** Old slugs (which contained client names) → new anonymous slugs. Used for redirects. */
export const renamedProjects: Record<string, string> = {
  "vettons-an-ecommerce-company": "ecommerce-office-2022",
  "ramsay-sime-darby-healthcare-nurse-college": "nursing-college-2022",
  "subang-jaya-medical-centre-sjmc-trainee-nurse-house-1":
    "trainee-nurse-hostel-2023",
  goodrich: "logistics-office-2023",
  "anonymous-client-2": "manufacturing-office-2023",
  "corporate-office-2023": "manufacturing-office-2023",
  "sme-client-1": "warehouse-office-2023",
  "sin-tohoku-metal-scrap": "small-industrial-office-2023",
};

export type Project = {
  slug: string;
  /** Industry group shown on the portfolio page. Must be one of `industries`. */
  industry: Industry;
  /** Town and state, e.g. "Klang, Selangor". */
  location: string;
  /** Kind of office/space, e.g. "Logistics office". Client names are deliberately not stored. */
  type: string;
  /** Year the project was completed. Portfolio page groups by this. */
  year: number;
  size?: string;
  summary: string;
  supplied?: string[];
  photos: string[];
};

export const projects: Project[] = [
  {
    slug: "ecommerce-office-2022",
    location: "Petaling Jaya, Selangor",
    industry: "Technology & E-commerce",
    type: "E-commerce office",
    year: 2022,
    size: "100+ staff",
    summary:
      "A full office fit-out for a fast-growing e-commerce company, sized for over 100 staff, from open-plan workstations to the executive suite.",
    supplied: [
      "Office tables",
      "Office chairs",
      "Executive tables and chairs",
      "Customised cabinets",
      "Office and executive sofas",
      "Chesterfield sofas",
    ],
    photos: [
      "9621288",
      "9621289",
      "9621287",
      "9621294",
      "9621269",
      "9621272",
      "9621267",
      "9621268",
      "9621270",
      "9621273",
      "9621277",
      "9621265",
      "9621271",
      "9621279",
      "9621276",
      "9621274",
      "9621275",
      "9621264",
      "9621278",
      "9621280",
      "9621283",
      "9621293",
      "9621284",
      "9621301",
      "9621282",
      "9621300",
      "9621285",
      "9621295",
      "9621286",
      "9621291",
      "9621281",
      "9621305",
      "9621299",
      "9621297",
      "9621290",
      "9621302",
      "9621298",
      "9621296",
      "9621304",
      "9621303",
    ].map((i) => f(i + ".jpg")),
  },
  {
    slug: "nursing-college-2022",
    location: "Shah Alam, Selangor",
    industry: "Education",
    type: "Nursing college",
    year: 2022,
    summary:
      "College furniture designed for students: minimalist, functional and easy to use every day.",
    photos: [
      ...[
        "9627261",
        "9627263",
        "9627268",
        "9627264",
        "9627265",
        "9627270",
        "9627271",
        "9627266",
        "9627272",
        "9627269",
      ].map((i) => f(i + ".jpg")),
      ...["9627496", "9627495", "9627500", "9627497", "9627502", "9627499"].map(
        (i) => f(i + ".png"),
      ),
    ],
  },
  {
    slug: "trainee-nurse-hostel-2023",
    location: "Subang Jaya, Selangor",
    industry: "Healthcare",
    type: "Trainee nurse hostel",
    year: 2023,
    summary:
      "New, easy-to-use hostel furniture for a hospital's trainee nurses, supplied in 2023.",
    supplied: [
      "Beds and bed frames",
      "Clothing cabinets and wardrobes",
      "Dining tables and chairs",
      "Mirrors",
      "Shoe racks",
    ],
    photos: [
      "9620778",
      "9620785",
      "9620783",
      "9620784",
      "9620822",
      "9620823",
      "9620825",
    ].map((i) => f(i + ".jpg")),
  },
  {
    slug: "logistics-office-2023",
    location: "Klang, Selangor",
    industry: "Logistics & Warehousing",
    type: "Logistics office",
    year: 2023,
    size: "15+ staff",
    summary:
      "A bright orange-and-white office for a logistics company, with workstations, a small meeting room and two director's desks.",
    supplied: [
      "Workstations",
      "Meeting room set",
      "2 director's desks",
      "Cabinet sets",
    ],
    photos: [
      "9627211",
      "9627212",
      "9627209",
      "9627210",
      "9627188",
      "9627196",
      "9627187",
      "9627189",
      "9627193",
      "9627191",
      "9627190",
      "9627197",
      "9627198",
      "9627195",
      "9627186",
      "9627192",
      "9627200",
      "9627194",
      "9627199",
      "9627201",
      "9627202",
      "9627208",
      "9627206",
      "9627207",
      "9627203",
      "9627204",
      "9627205",
    ].map((i) => f(i + ".jpg")),
  },
  {
    slug: "manufacturing-office-2023",
    location: "Shah Alam, Selangor",
    industry: "Manufacturing & Industrial",
    type: "Manufacturing office",
    year: 2023,
    size: "30+ staff",
    summary:
      "Complete workstation sets and a meeting room for a manufacturing company's office team of 30+.",
    supplied: ["Workstation sets", "Meeting room furniture"],
    photos: ["9626758", "9626755", "9626760", "9626757"].map((i) =>
      f(i + ".jpg"),
    ),
  },
  {
    slug: "warehouse-office-2023",
    location: "Shah Alam, Selangor",
    industry: "Logistics & Warehousing",
    type: "Warehouse office",
    year: 2023,
    size: "20 staff",
    summary:
      "A warehouse office for 20 staff, delivered fast so the team could get back to work in an improved space.",
    photos: [
      "9622174",
      "9622176",
      "9622171",
      "9622173",
      "9622172",
      "9622175",
    ].map((i) => f(i + ".jpg")),
  },
  {
    slug: "small-industrial-office-2023",
    location: "Klang, Selangor",
    industry: "Manufacturing & Industrial",
    type: "Small office",
    year: 2023,
    size: "Under 10 staff",
    summary:
      "Office tables and chairs in walnut for a small team. No project is too small or too big for us.",
    supplied: ["Office tables", "Office chairs"],
    photos: [
      "9626924",
      "9626928",
      "9626929",
      "9626925",
      "9626926",
      "9626927",
      "9626931",
      "9626930",
      "9626932",
    ].map((i) => f(i + ".png")),
  },
];

export const coverOf = (p: Project) => p.photos[0];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Every industry with its projects (newest first), in `industries` order. Empty industries are included. */
export const projectsByIndustry = () =>
  industries.map(
    (ind) =>
      [
        ind,
        projects
          .filter((p) => p.industry === ind)
          .sort((a, b) => b.year - a.year),
      ] as const,
  );

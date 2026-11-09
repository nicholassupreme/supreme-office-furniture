export type ServiceDetail = {
  slug: string;
  /** Old anchor on /services, kept so existing #links still land on the right card */
  anchor: string;
  img: string;
  title: string;
  body: string;
  points: string[];
  /** Detail page */
  intro: string;
  included: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  suits: string[];
  faqs: { q: string; a: string }[];
};

export const services: ServiceDetail[] = [
  {
    slug: "layout-planning",
    anchor: "planning",
    img: "/services/planning.webp",
    title: "Layout planning & quotation",
    body: "We visit your office, measure up and draw a furniture layout that fits your headcount and workflow, then quote it.",
    points: [
      "Site visit and measurement",
      "2D floor plan with furniture placement",
      "Itemised quotation",
    ],
    intro:
      "Before anything is ordered, we make sure it fits. Our team measures your space, works out how many people it needs to seat and how they work, then draws a furniture layout and prices every item on it.",
    included: [
      {
        title: "Site visit and measurement",
        text: "We measure the floor, note columns, windows, power points and access routes so the plan works on the real space, not just the floor plan.",
      },
      {
        title: "2D furniture layout",
        text: "A floor plan showing workstations, meeting rooms, storage and circulation, sized to your headcount and growth plans.",
      },
      {
        title: "Itemised quotation",
        text: "Every item on the layout listed with model, size, finish and price, so you can compare, trim or upgrade line by line.",
      },
      {
        title: "Revisions",
        text: "Adjust seat counts, swap models or change finishes and we update the layout and quote to match.",
      },
    ],
    steps: [
      { title: "Tell us the brief", text: "Headcount, rooms you need, budget range and move-in date." },
      { title: "Site visit", text: "We measure up and check access, power and data points." },
      { title: "Layout and quote", text: "You get a 2D layout and an itemised quotation to review." },
      { title: "Confirm and schedule", text: "Once approved, we lock in production and delivery dates." },
    ],
    suits: [
      "New office fit-outs",
      "Expanding or re-stacking teams",
      "Tenders and procurement that need an itemised BQ",
    ],
    faqs: [
      {
        q: "Do I need a floor plan before you visit?",
        a: "It helps if you have one, but it's not required. We take our own measurements on site.",
      },
      {
        q: "Can you quote for government or e-Perolehan purchases?",
        a: "Yes. Supreme is MOF-registered and regularly quotes for government agencies, universities and GLCs.",
      },
      {
        q: "Is there a charge for the layout and quotation?",
        a: "No. It comes with your furniture enquiry.",
      },
      {
        q: "Can I mix models from different ranges?",
        a: "Yes. The quote is itemised so you can mix ranges, finishes and sizes as needed.",
      },
    ],
  },
  {
    slug: "office-renovation",
    anchor: "renovation",
    img: "/services/renovation.webp",
    title: "One-stop office renovation",
    body: "Partitions, ceilings, flooring, electrical and furniture handled as one project, with one point of contact from design to handover.",
    points: [
      "Design and space planning",
      "Partitions, ceilings and flooring",
      "Furniture supply and installation",
    ],
    intro:
      "Instead of juggling a contractor, an electrician and a furniture supplier, hand the whole fit-out to one team. We coordinate the build works and the furniture so everything arrives in the right order and fits first time.",
    included: [
      {
        title: "Design and space planning",
        text: "Zoning, layout and finishes planned around how your team works, with furniture designed in from the start.",
      },
      {
        title: "Partitions and ceilings",
        text: "Glass and drywall partitions, meeting rooms, ceiling works and lighting.",
      },
      {
        title: "Flooring and electrical",
        text: "Carpet, vinyl and other flooring, plus power and data points placed where the desks actually go.",
      },
      {
        title: "Furniture supply and installation",
        text: "Workstations, seating, storage and meeting furniture delivered and installed as the final stage of the fit-out.",
      },
    ],
    steps: [
      { title: "Brief and site visit", text: "We look at the space and agree on scope, budget and timeline." },
      { title: "Design and quotation", text: "Layout, finishes and a full quote covering works and furniture." },
      { title: "Build works", text: "Partitions, ceilings, flooring and electrical, managed by our team." },
      { title: "Furniture and handover", text: "Furniture installed, site cleaned and the office handed over ready to use." },
    ],
    suits: [
      "Bare or shell offices",
      "Full refurbishment of an existing office",
      "Companies that want one contact for the whole project",
    ],
    faqs: [
      {
        q: "Do I deal with multiple contractors?",
        a: "No. You have one point of contact who coordinates all trades from design to handover.",
      },
      {
        q: "Can you work around building management requirements?",
        a: "Yes. We work with building management on permits, working hours and access for deliveries.",
      },
      {
        q: "Can I do furniture only and skip the renovation?",
        a: "Of course. You can order furniture on its own, or ask for a layout plan and quotation first.",
      },
    ],
  },
  {
    slug: "furniture-relocation",
    anchor: "relocation",
    img: "/services/relocation.webp",
    title: "Furniture relocation & disposal",
    body: "Moving office? We dismantle, transport and reinstall your furniture, or clear out old pieces you no longer need.",
    points: [
      "Dismantling and reinstallation",
      "Transport by our own team",
      "Old furniture disposal",
    ],
    intro:
      "Moving office is disruptive enough. Our crew dismantles your workstations and furniture, moves them with our own transport, and reinstalls them at the new site. Anything you're not taking, we can clear away.",
    included: [
      {
        title: "Dismantling",
        text: "Workstations, partitions, cabinets and meeting tables taken apart carefully, with parts labelled for reassembly.",
      },
      {
        title: "Transport",
        text: "Moved by our own team and vehicles, not subcontracted out.",
      },
      {
        title: "Reinstallation",
        text: "Reassembled to your new layout, including re-planning if the new space is a different shape.",
      },
      {
        title: "Disposal",
        text: "Old or unwanted furniture cleared from your premises.",
      },
    ],
    steps: [
      { title: "Survey", text: "We list what's moving, what's staying and what's being disposed of." },
      { title: "Plan and quote", text: "Move date, new layout and a fixed quotation." },
      { title: "Move day", text: "Dismantle, transport and reinstall, scheduled to minimise downtime." },
      { title: "Clear-out", text: "Unwanted pieces removed and the old site left clear." },
    ],
    suits: [
      "Office moves within Klang Valley",
      "Internal re-stacking between floors",
      "Clearing out old furniture before a refit",
    ],
    faqs: [
      {
        q: "Can you move furniture from other brands?",
        a: "Yes. We move most office furniture, not only items we supplied.",
      },
      {
        q: "Can the move happen after office hours or on weekends?",
        a: "Ask us. We schedule around your operations and the building's working hours.",
      },
      {
        q: "Can you add new furniture during the move?",
        a: "Yes. Many clients combine a move with new pieces. We plan both together.",
      },
    ],
  },
  {
    slug: "safe-relocation",
    anchor: "safes",
    img: "/services/safe-relocation.webp",
    title: "Safe box relocation",
    body: "Heavy safes moved and installed safely, with the equipment and crew the job needs.",
    points: [
      "Floor and access assessment",
      "Specialised moving equipment",
      "Installation at the new site",
    ],
    intro:
      "Safes are heavy, awkward and easy to damage, along with the floors, lifts and staircases around them. We assess the route first, bring the right equipment and crew, and install the safe properly at its new location.",
    included: [
      {
        title: "Floor and access assessment",
        text: "We check the safe's weight, floor loading, doorways, lifts and stairs before quoting.",
      },
      {
        title: "Specialised equipment",
        text: "Heavy-duty trolleys, straps and lifting gear sized for the job.",
      },
      {
        title: "Experienced crew",
        text: "A team that moves heavy items regularly and knows how to protect floors and finishes.",
      },
      {
        title: "Installation",
        text: "Positioned and installed at the new site where you need it.",
      },
    ],
    steps: [
      { title: "Send details", text: "Safe size and weight (or a photo), plus both addresses." },
      { title: "Assessment", text: "We check access and floor conditions at both ends." },
      { title: "Quote and schedule", text: "A quotation and a date that suits you and the building." },
      { title: "Move and install", text: "Safe moved, positioned and installed." },
    ],
    suits: [
      "Banks and finance offices",
      "Jewellers and retail outlets",
      "Offices moving document or cash safes",
    ],
    faqs: [
      {
        q: "What do you need to quote?",
        a: "The safe's approximate size and weight (a photo of the label helps), both addresses, and the floor levels and lift access at each end.",
      },
      {
        q: "Can you move a safe up stairs?",
        a: "Often, yes, but it depends on the weight and the staircase. That's what the assessment is for.",
      },
    ],
  },
  {
    slug: "furniture-rental",
    anchor: "rental",
    img: "/services/installation.webp",
    title: "Office furniture rental",
    body: "Short-term furniture for project offices, events and temporary setups, without the upfront cost of buying.",
    points: [
      "Chairs, desks and workstations",
      "Daily or monthly rental",
      "Delivery and collection",
    ],
    intro:
      "Need furniture for a few weeks or months? Rent it instead. We deliver, set up and collect when you're done, so you avoid the upfront cost and the hassle of disposing of it later.",
    included: [
      {
        title: "Seating",
        text: "Office chairs, visitor chairs and training chairs.",
      },
      {
        title: "Desks and workstations",
        text: "Individual desks or cluster workstations for project teams.",
      },
      {
        title: "Daily or monthly rental",
        text: "Rent by the day for events or by the month for temporary offices, subject to stock availability.",
      },
      {
        title: "Delivery, setup and collection",
        text: "We bring it, set it up and take it away at the end of the rental.",
      },
    ],
    steps: [
      { title: "Tell us what you need", text: "Items, quantities, location and rental dates." },
      { title: "Availability and quote", text: "We confirm stock for your dates and quote the rental." },
      { title: "Delivery and setup", text: "Furniture delivered and arranged on site." },
      { title: "Collection", text: "We collect everything at the end of the rental." },
    ],
    suits: [
      "Site and project offices",
      "Events, exhibitions and training sessions",
      "Temporary offices during a renovation",
    ],
    faqs: [
      {
        q: "How long can I rent for?",
        a: "Daily or monthly. Availability depends on stock, so send us your dates and quantities early.",
      },
      {
        q: "Can I extend the rental?",
        a: "Usually yes, subject to stock. Let us know before the end date and we'll check.",
      },
    ],
  },
  {
    slug: "furniture-repair",
    anchor: "repair",
    img: "/services/repair.webp",
    title: "Office furniture repair",
    body: "Extend the life of chairs, desks and cabinets: replacement parts, mechanisms, gas lifts and reupholstery.",
    points: [
      "Chair mechanisms and gas lifts",
      "Reupholstery",
      "Desk and cabinet repairs",
    ],
    intro:
      "A sinking chair or a stuck drawer doesn't always mean buying new. We replace worn parts, fix mechanisms and reupholster seating so your existing furniture keeps working.",
    included: [
      {
        title: "Chair mechanisms",
        text: "Tilt and recline mechanisms that no longer lock or adjust properly.",
      },
      {
        title: "Gas lifts and parts",
        text: "Sinking chairs fixed with replacement gas lifts, castors, armrests and bases.",
      },
      {
        title: "Reupholstery",
        text: "Worn or torn seat and back fabric replaced.",
      },
      {
        title: "Desk and cabinet repairs",
        text: "Locks, drawer runners, hinges, legs and frames repaired or replaced.",
      },
    ],
    steps: [
      { title: "Send photos", text: "What's broken and how many pieces." },
      { title: "Diagnosis and quote", text: "We check the fault, advise whether to repair or replace, and quote it." },
      { title: "Repair", text: "Most repairs are done at our workshop. Some chair and upholstery jobs can be done on site." },
      { title: "Return", text: "Repaired furniture back in use." },
    ],
    suits: [
      "Offices with a large number of chairs",
      "Furniture that's still solid but worn",
      "Keeping a matching look without buying new",
    ],
    faqs: [
      {
        q: "Do you repair furniture you didn't supply?",
        a: "Yes, we repair other brands too. Whether we can fix it depends on the diagnosis and parts availability.",
      },
      {
        q: "Can you repair on site?",
        a: "Most repairs are done at our workshop. Chair repairs and some upholstery work can be done on site, depending on the situation.",
      },
      {
        q: "Is it worth repairing or should I replace?",
        a: "We'll give you an honest view. If replacing is better value, we'll say so.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

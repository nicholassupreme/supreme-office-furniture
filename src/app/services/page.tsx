import type { Metadata } from "next";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Office Furniture Services",
  description:
    "Free office layout planning, one-stop office renovation, furniture relocation and disposal, safe box relocation, rental and repair in Klang Valley.",
};

const SERVICES = [
  {
    id: "planning",
    title: "Free layout planning & quotation",
    body: "We visit your office, measure up and draw a furniture layout that fits your headcount and workflow, then quote it. No charge, no commitment.",
    points: ["Complimentary site visit", "2D floor plan with furniture placement", "Itemised quotation"],
  },
  {
    id: "renovation",
    title: "One-stop office renovation",
    body: "Partitions, ceilings, flooring, electrical and furniture handled as one project, with one point of contact from design to handover.",
    points: ["Design and space planning", "Partitions, ceilings and flooring", "Furniture supply and installation"],
  },
  {
    id: "relocation",
    title: "Furniture relocation & disposal",
    body: "Moving office? We dismantle, transport and reinstall your furniture, or clear out old pieces you no longer need.",
    points: ["Dismantling and reinstallation", "Transport by our own team", "Old furniture disposal"],
  },
  {
    id: "safes",
    title: "Safe box relocation",
    body: "Heavy safes moved and installed safely, with the equipment and crew the job needs.",
    points: ["Floor and access assessment", "Specialised moving equipment", "Installation at the new site"],
  },
  {
    id: "rental",
    title: "Office furniture rental",
    body: "Short-term furniture for project offices, events and temporary setups, without the upfront cost of buying.",
    points: ["Chairs, desks and workstations", "Flexible rental periods", "Delivery and collection"],
  },
  {
    id: "repair",
    title: "Office furniture repair",
    body: "Extend the life of chairs, desks and cabinets: replacement parts, mechanisms, gas lifts and reupholstery.",
    points: ["Chair mechanisms and gas lifts", "Reupholstery", "Desk and cabinet repairs"],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em] md:text-5xl">Services</h1>
      <p className="mt-3 max-w-2xl text-ink-2">Everything around the furniture, handled by the same team that supplies it.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {SERVICES.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-32 rounded-3xl border border-line bg-surface p-7 md:p-9">
            <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-ink-2">{s.body}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-oak" /> {p}
                </li>
              ))}
            </ul>
            <a
              href={waLink(`Hi Supreme, I'd like to ask about: ${s.title}.`)}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-ink/30"
            >
              <IconWhatsApp className="h-4 w-4 text-wa" /> Enquire
            </a>
          </section>
        ))}
      </div>
    </div>
  );
}

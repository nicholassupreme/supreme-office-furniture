import type { Metadata } from "next";
import { waLink } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Office Furniture Services",
  description:
    "Office layout planning, one-stop office renovation, furniture relocation and disposal, safe box relocation, rental and repair in Klang Valley.",
};

const SERVICES = [
  {
    id: "planning",
    img: "/services/planning.webp",
    title: "Layout planning & quotation",
    body: "We visit your office, measure up and draw a furniture layout that fits your headcount and workflow, then quote it.",
    points: [
      "Site visit and measurement",
      "2D floor plan with furniture placement",
      "Itemised quotation",
    ],
  },
  {
    id: "renovation",
    img: "/services/renovation.webp",
    title: "One-stop office renovation",
    body: "Partitions, ceilings, flooring, electrical and furniture handled as one project, with one point of contact from design to handover.",
    points: [
      "Design and space planning",
      "Partitions, ceilings and flooring",
      "Furniture supply and installation",
    ],
  },
  {
    id: "relocation",
    img: "/services/relocation.webp",
    title: "Furniture relocation & disposal",
    body: "Moving office? We dismantle, transport and reinstall your furniture, or clear out old pieces you no longer need.",
    points: [
      "Dismantling and reinstallation",
      "Transport by our own team",
      "Old furniture disposal",
    ],
  },
  {
    id: "safes",
    img: "/services/safe-relocation.webp",
    title: "Safe box relocation",
    body: "Heavy safes moved and installed safely, with the equipment and crew the job needs.",
    points: [
      "Floor and access assessment",
      "Specialised moving equipment",
      "Installation at the new site",
    ],
  },
  {
    id: "rental",
    img: "/services/installation.webp",
    title: "Office furniture rental",
    body: "Short-term furniture for project offices, events and temporary setups, without the upfront cost of buying.",
    points: [
      "Chairs, desks and workstations",
      "Flexible rental periods",
      "Delivery and collection",
    ],
  },
  {
    id: "repair",
    img: "/services/repair.webp",
    title: "Office furniture repair",
    body: "Extend the life of chairs, desks and cabinets: replacement parts, mechanisms, gas lifts and reupholstery.",
    points: [
      "Chair mechanisms and gas lifts",
      "Reupholstery",
      "Desk and cabinet repairs",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pt-10 md:px-6 md:pt-14">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em] md:text-5xl">
        Services
      </h1>
      <p className="mt-3 max-w-2xl text-ink-2">
        Everything around the furniture, handled by the same team that supplies
        it.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {SERVICES.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="group relative flex scroll-mt-32 flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_24px_50px_-18px_rgba(49,39,131,0.6)] sm:flex-row"
          >
            <div className="relative aspect-[4/3] shrink-0 bg-white sm:aspect-auto sm:w-[40%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-2"
              />
            </div>
            <div className="relative flex flex-1 flex-col p-6 md:p-7">
              {/* Blue layer that fades in on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand to-brand-ink opacity-0 transition duration-300 group-hover:opacity-100" />
              <h2 className="relative text-lg font-semibold tracking-tight transition-colors group-hover:text-white md:text-xl">
                {s.title}
              </h2>
              <p className="relative mt-2 text-[15px] leading-relaxed text-ink-2 transition-colors group-hover:text-white/85">
                {s.body}
              </p>
              <ul className="relative mt-4 space-y-1.5 text-sm transition-colors group-hover:text-white">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-oak transition-colors group-hover:bg-[#8b93ff]" />{" "}
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(`Hi Supreme, I'd like to ask about: ${s.title}.`)}
                className="relative mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition group-hover:border-white"
              >
                <IconWhatsApp className="h-4 w-4 text-wa" /> Enquire
              </a>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

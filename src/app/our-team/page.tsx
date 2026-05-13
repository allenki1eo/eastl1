"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createScope, createTimeline, stagger, text, utils } from "animejs";
import { Mail } from "lucide-react";
import styles from "./page.module.css";

/* ── Types ─────────────────────────────────────────────────────── */
type Member = {
  id: number;
  name: string;
  title: string;
  email: string;
  initials: string;
};

type Tier = {
  label: string;
  members: Member[];
};

/* ── Data ──────────────────────────────────────────────────────── */
const tiers: Tier[] = [
  {
    label: "Executive Leadership",
    members: [
      { id: 0, name: "Gasper H Kileo",   title: "Chief Executive Officer",    email: "ceo@eastafricanspirits.com", initials: "GK" },
      { id: 1, name: "Godbless G Kileo", title: "Chief Operating Officer",    email: "coo@eastafricanspirits.com", initials: "GG" },
      { id: 2, name: "Galdness G Kileo", title: "Chief Financial Officer",    email: "cfo@eastafricanspirits.com", initials: "GK" },
    ],
  },
  {
    label: "Management",
    members: [
      { id: 3, name: "Leonard Mushi",    title: "General Manager",            email: "info@eastafricanspirits.com", initials: "LM" },
      { id: 4, name: "Ansila Daniel",    title: "Human Resources",            email: "hr@eastafricanspirits.com",   initials: "AD" },
      { id: 5, name: "Happiness Nassor", title: "Accounting Manager",         email: "info@eastafricanspirits.com", initials: "HN" },
      { id: 6, name: "Eric H Kileo",     title: "Administrative Coordinator", email: "info@eastafricanspirits.com", initials: "EK" },
    ],
  },
  {
    label: "Operations",
    members: [
      { id: 7,  name: "Julius Nyaki",      title: "Plant Manager",         email: "info@eastafricanspirits.com", initials: "JN" },
      { id: 8,  name: "Joseph Otieno",     title: "Chief Engineer",        email: "info@eastafricanspirits.com", initials: "JO" },
      { id: 9,  name: "Dioniz Rwemamu",    title: "QC Manager",            email: "info@eastafricanspirits.com", initials: "DR" },
      { id: 10, name: "Valentine Salimbo", title: "Brew Manager",          email: "info@eastafricanspirits.com", initials: "VS" },
      { id: 11, name: "Ndekirwa Kaaya",    title: "Production Supervisor", email: "info@eastafricanspirits.com", initials: "NK" },
    ],
  },
];

const allMembers = tiers.flatMap((t) => t.members);

/* ── Card media: photo → initials fallback ─────────────────────── */
function CardMedia({ member }: { member: Member }) {
  const [err, setErr] = useState(false);
  useEffect(() => { setErr(false); }, [member.id]);

  if (err) {
    return (
      <div className={`${styles.cardPlaceholder} team-card-photo`}>
        <span className={styles.placeholderInitials}>{member.initials}</span>
        {/* subtle decorative ring */}
        <div className={styles.placeholderRing} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/team/member-${member.id}.jpg`}
      alt={member.name}
      className={`${styles.cardPhoto} team-card-photo`}
      onError={() => setErr(true)}
    />
  );
}

/* ── Section divider ───────────────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold: 0.5 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${styles.divider} ${vis ? styles.dividerIn : ""}`}>
      <div className={styles.dividerLine} />
      <span className={styles.dividerLabel}>{label}</span>
      <div className={styles.dividerLine} />
    </div>
  );
}

/* ── Individual card ───────────────────────────────────────────── */
function TeamCard({ member, isExec }: { member: Member; isExec?: boolean }) {
  return (
    <article
      id={`team-member-${member.id}`}
      className={`${styles.card} ${isExec ? styles.cardExec : ""}`}
    >
      <CardMedia member={member} />

      {/* overlay — shown on hover via anime.js */}
      <div className={`${styles.overlay} team-card-overlay`}>
        <p className={styles.overlayTitle}>{member.title}</p>
        <h2 className={`${styles.overlayName} team-name-h2`}>{member.name}</h2>
        <a
          href={`mailto:${member.email}`}
          className={styles.overlayEmail}
          onClick={(e) => e.stopPropagation()}
        >
          <Mail className="w-3 h-3 flex-shrink-0" />
          <span>{member.email}</span>
        </a>
      </div>

      {/* gold bottom line that grows on hover — pure CSS */}
      <div className={styles.cardLine} />
    </article>
  );
}

/* ── Tier row with scroll reveal ───────────────────────────────── */
function TierRow({ tier, isFirst }: { tier: Tier; isFirst: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} className={styles.tierRow}>
      {tier.members.map((member, i) => (
        <div
          key={member.id}
          className={`${styles.cardWrap} ${vis ? styles.cardWrapIn : ""}`}
          style={{ transitionDelay: `${i * 85}ms` }}
        >
          <TeamCard member={member} isExec={isFirst} />
        </div>
      ))}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function OurTeamPage() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    allMembers.forEach(({ id }) => {
      const el = document.getElementById(`team-member-${id}`);
      if (!el) return;

      createScope({
        root: `#team-member-${id}`,
        defaults: { ease: "outQuad" },
      }).add((sc) => {
        if (!sc) return;

        text.split(".team-name-h2", {
          words: `<span class="word-3d word-{i}">
            <em class="face face-top">{value}</em>
            <em class="face-front">{value}</em>
            <em class="face face-bottom">{value}</em>
            <em class="face face-back">{value}</em>
          </span>`,
        });

        utils.set(".team-card-overlay", { opacity: 0 });

        const ws = stagger(55, { use: "data-word", start: 0 });
        const rotateAnim = createTimeline({
          autoplay: false,
          defaults: { ease: "inOut(2)", duration: 680 },
        })
          .add(".word-3d",               { rotateX: -180 },      ws)
          .add(".word-3d .face-top",     { opacity: [0, 0, 0] }, ws)
          .add(".word-3d .face-front",   { opacity: [1, 0, 0] }, ws)
          .add(".word-3d .face-bottom",  { opacity: [0, 1, 0] }, ws)
          .add(".word-3d .face-back",    { opacity: [0, 0, 1] }, ws);

        const onEnter = () => {
          const ov = el.querySelector<HTMLElement>(".team-card-overlay");
          if (ov) ov.style.pointerEvents = "auto";
          animate(".team-card-photo",   { scale: 1.07, duration: 700, ease: "outQuad" });
          animate(".team-card-overlay", { opacity: 1,  duration: 320, ease: "outQuad" });
          animate(rotateAnim, { progress: 1 });
        };

        const onLeave = () => {
          const ov = el.querySelector<HTMLElement>(".team-card-overlay");
          if (ov) ov.style.pointerEvents = "none";
          animate(".team-card-photo",   { scale: 1,   duration: 550, ease: "outQuad" });
          animate(rotateAnim, { progress: 0 });
          animate(".team-card-overlay", { opacity: 0, duration: 260, delay: 220, ease: "outQuad" });
        };

        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);

        return () => {
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
    });
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>East African Spirits</p>
        <h1 className={styles.heroTitle}>Our Team</h1>
        <div className={styles.heroDivider} />
        <p className={styles.heroSub}>
          {allMembers.length} leaders driving excellence across East Africa
        </p>
      </section>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className={styles.grid}>
        {tiers.map((tier, i) => (
          <div key={tier.label}>
            <SectionDivider label={tier.label} />
            <TierRow tier={tier} isFirst={i === 0} />
          </div>
        ))}
      </section>
    </main>
  );
}

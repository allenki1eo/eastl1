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

type Tier = { label: string; num: string; members: Member[] };

/* ── Data ──────────────────────────────────────────────────────── */
const tiers: Tier[] = [
  {
    label: "Executive Leadership",
    num: "01",
    members: [
      { id: 0, name: "Gasper H Kileo",   title: "Chief Executive Officer",    email: "ceo@eastafricanspirits.com", initials: "GK" },
      { id: 1, name: "Godbless G Kileo", title: "Chief Operating Officer",    email: "coo@eastafricanspirits.com", initials: "GG" },
      { id: 2, name: "Galdness G Kileo", title: "Chief Financial Officer",    email: "cfo@eastafricanspirits.com", initials: "GK" },
    ],
  },
  {
    label: "Management",
    num: "02",
    members: [
      { id: 3, name: "Leonard Mushi",    title: "General Manager",            email: "info@eastafricanspirits.com", initials: "LM" },
      { id: 4, name: "Ansila Daniel",    title: "Human Resources",            email: "hr@eastafricanspirits.com",   initials: "AD" },
      { id: 5, name: "Happiness Nassor", title: "Accounting Manager",         email: "info@eastafricanspirits.com", initials: "HN" },
      { id: 6, name: "Eric H Kileo",     title: "Administrative Coordinator", email: "info@eastafricanspirits.com", initials: "EK" },
    ],
  },
  {
    label: "Operations",
    num: "03",
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

/* ── Photo / initials placeholder ─────────────────────────────── */
function CardPhoto({ member }: { member: Member }) {
  const [err, setErr] = useState(false);
  useEffect(() => { setErr(false); }, [member.id]);

  if (err) {
    return (
      <div className={`${styles.placeholder} team-card-photo`}>
        <span className={styles.placeholderText}>{member.initials}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/team/member-${member.id}.jpg`}
      alt={member.name}
      className={`${styles.photo} team-card-photo`}
      onError={() => setErr(true)}
    />
  );
}

/* ── Card ──────────────────────────────────────────────────────── */
function MemberCard({ member }: { member: Member }) {
  return (
    <div id={`team-member-${member.id}`} className={styles.card}>
      {/* ── photo frame ── */}
      <div className={styles.frame}>
        <CardPhoto member={member} />

        {/* hover overlay */}
        <div className={`${styles.overlay} team-card-overlay`}>
          <h2 className={`${styles.overlayName} team-name-h2`}>{member.name}</h2>
          <a
            href={`mailto:${member.email}`}
            className={styles.emailBtn}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Send email</span>
          </a>
        </div>
      </div>

      {/* ── info always visible below photo ── */}
      <div className={styles.info}>
        <p className={styles.infoName}>{member.name}</p>
        <p className={styles.infoTitle}>{member.title}</p>
      </div>
    </div>
  );
}

/* ── Tier section ──────────────────────────────────────────────── */
function TierSection({ tier }: { tier: Tier }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.tier}>
      {/* section header */}
      <div className={`${styles.tierHead} ${vis ? styles.tierHeadIn : ""}`}>
        <span className={styles.tierNum}>{tier.num}</span>
        <span className={styles.tierRule} />
        <span className={styles.tierLabel}>{tier.label}</span>
      </div>

      {/* card grid */}
      <div className={styles.grid}>
        {tier.members.map((m, i) => (
          <div
            key={m.id}
            className={`${styles.cardReveal} ${vis ? styles.cardRevealIn : ""}`}
            style={{ transitionDelay: `${80 + i * 75}ms` }}
          >
            <MemberCard member={m} />
          </div>
        ))}
      </div>
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

        utils.set(".team-card-overlay", { opacity: 0, translateY: "12px" });

        const ws = stagger(55, { use: "data-word", start: 0 });
        const rotateAnim = createTimeline({
          autoplay: false,
          defaults: { ease: "inOut(2)", duration: 650 },
        })
          .add(".word-3d",               { rotateX: -180 },      ws)
          .add(".word-3d .face-top",     { opacity: [0, 0, 0] }, ws)
          .add(".word-3d .face-front",   { opacity: [1, 0, 0] }, ws)
          .add(".word-3d .face-bottom",  { opacity: [0, 1, 0] }, ws)
          .add(".word-3d .face-back",    { opacity: [0, 0, 1] }, ws);

        const onEnter = () => {
          const ov = el.querySelector<HTMLElement>(".team-card-overlay");
          if (ov) ov.style.pointerEvents = "auto";
          animate(".team-card-photo",   { scale: 1.06, duration: 650, ease: "outQuad" });
          animate(".team-card-overlay", { opacity: 1, translateY: "0px", duration: 300, ease: "outQuad" });
          animate(rotateAnim, { progress: 1 });
        };

        const onLeave = () => {
          const ov = el.querySelector<HTMLElement>(".team-card-overlay");
          if (ov) ov.style.pointerEvents = "none";
          animate(".team-card-photo",   { scale: 1,   duration: 500, ease: "outQuad" });
          animate(rotateAnim, { progress: 0 });
          animate(".team-card-overlay", { opacity: 0, translateY: "12px", duration: 280, delay: 180, ease: "outQuad" });
        };

        // hover on the frame (photo area), not the whole card
        const frame = el.querySelector<HTMLElement>(`.${styles.frame}`);
        if (!frame) return;
        frame.addEventListener("pointerenter", onEnter);
        frame.addEventListener("pointerleave", onLeave);

        return () => {
          frame.removeEventListener("pointerenter", onEnter);
          frame.removeEventListener("pointerleave", onLeave);
        };
      });
    });
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>East African Spirits (T) Ltd</p>
          <h1 className={styles.heroTitle}>
            Meet the people&nbsp;behind&nbsp;every bottle.
          </h1>
          <p className={styles.heroBody}>
            Architects of quality, champions of craft — {allMembers.length} leaders
            driving East Africa&apos;s most ambitious brewery forward.
          </p>
        </div>
      </section>

      {/* ── Tiers ────────────────────────────────────────────── */}
      <div className={styles.tiers}>
        {tiers.map((tier) => (
          <TierSection key={tier.num} tier={tier} />
        ))}
      </div>
    </main>
  );
}

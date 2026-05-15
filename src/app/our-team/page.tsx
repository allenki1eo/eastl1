"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createScope, createTimeline, stagger, text, utils } from "animejs";
import { Mail } from "lucide-react";
import styles from "./page.module.css";

/* ── Types ─────────────────────────────────────────────────────── */
type Member = { id: number; name: string; title: string; email: string; initials: string };
type Tier   = { label: string; num: string; members: Member[] };

/* ── Data ──────────────────────────────────────────────────────── */
const tiers: Tier[] = [
  {
    label: "Chief Executive", num: "01",
    members: [
      { id: 0, name: "Gasper H Kileo", title: "Chief Executive Officer", email: "ceo@eastafricanspirits.com", initials: "GK" },
    ],
  },
  {
    label: "Executive Leadership", num: "02",
    members: [
      { id: 1, name: "Godbless G Kileo", title: "Chief Operating Officer", email: "coo@eastafricanspirits.com", initials: "GG" },
      { id: 2, name: "Galdness G Kileo", title: "Chief Financial Officer",  email: "cfo@eastafricanspirits.com", initials: "GK" },
    ],
  },
  {
    label: "General Management", num: "03",
    members: [
      { id: 3, name: "Leonard Mushi", title: "General Manager", email: "info@eastafricanspirits.com", initials: "LM" },
    ],
  },
  {
    label: "Management", num: "04",
    members: [
      { id: 4, name: "Ansila Daniel",    title: "Human Resources",            email: "hr@eastafricanspirits.com",   initials: "AD" },
      { id: 5, name: "Happiness Nassor", title: "Accounting Manager",         email: "info@eastafricanspirits.com", initials: "HN" },
      { id: 6, name: "Eric H Kileo",     title: "Administrative Coordinator", email: "info@eastafricanspirits.com", initials: "EK" },
    ],
  },
  {
    label: "Operations", num: "05",
    members: [
      { id: 7,  name: "Julius Nyaki",      title: "Plant Manager",         email: "info@eastafricanspirits.com", initials: "JN" },
      { id: 8,  name: "Joseph Otieno",     title: "Chief Engineer",        email: "info@eastafricanspirits.com", initials: "JO" },
      { id: 9,  name: "Dioniz Rwamunwa",    title: "QC Manager",            email: "info@eastafricanspirits.com", initials: "DR" },
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
      src={`/images/team/member-${member.id}.png`}
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
      {/* photo frame — cinematic zoom on hover */}
      <div className={styles.frame}>
        <CardPhoto member={member} />
      </div>

      {/* info area: title visible by default, name tumbles in on hover */}
      <div className={styles.infoArea}>
        <div className={`${styles.titleWrap} team-title-wrap`}>
          <p className={styles.titleText}>{member.title}</p>
        </div>
        <div className={`${styles.nameWrap} team-name-wrap`}>
          <h2 className={`${styles.nameH2} team-name-h2`}>{member.name}</h2>
        </div>
      </div>

      {/* email bar — grows upward from below on hover */}
      <div className={`${styles.emailBar} team-email-bar`}>
        <a
          href={`mailto:${member.email}`}
          className={styles.emailLink}
          onClick={(e) => e.stopPropagation()}
        >
          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{member.email}</span>
        </a>
      </div>
    </div>
  );
}

/* ── Tier section with scroll reveal ───────────────────────────── */
function TierSection({ tier }: { tier: Tier }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.tier}>
      <div className={`${styles.tierHead} ${vis ? styles.tierHeadIn : ""}`}>
        <span className={styles.tierNum}>{tier.num}</span>
        <span className={styles.tierRule} />
        <span className={styles.tierLabel}>{tier.label}</span>
      </div>
      <div
        className={styles.grid}
        style={
          tier.members.length === 1
            ? { gridTemplateColumns: "1fr", maxWidth: "280px" }
            : tier.members.length === 2
            ? { gridTemplateColumns: "repeat(2, 1fr)", maxWidth: "580px" }
            : undefined
        }
      >
        {tier.members.map((m, i) => (
          <div
            key={m.id}
            className={`${styles.cardReveal} ${vis ? styles.cardRevealIn : ""}`}
            style={{ transitionDelay: `${80 + i * 80}ms` }}
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

      /* ── Grab DOM refs BEFORE scope — used in event handlers
           to keep each card's animation fully isolated            ── */
      const photoEl   = el.querySelector<HTMLElement>(".team-card-photo");
      const titleWrap = el.querySelector<HTMLElement>(".team-title-wrap");
      const nameWrap  = el.querySelector<HTMLElement>(".team-name-wrap");
      const emailBar  = el.querySelector<HTMLElement>(".team-email-bar");

      if (!photoEl || !titleWrap || !nameWrap || !emailBar) return;

      createScope({
        root: `#team-member-${id}`,
        defaults: { ease: "outQuad" },
      }).add((sc) => {
        if (!sc) return;

        /* text.split is scoped to this card's root — safe */
        text.split(".team-name-h2", {
          words: `<span class="word-3d word-{i}">
            <em class="face face-top">{value}</em>
            <em class="face-front">{value}</em>
            <em class="face face-bottom">{value}</em>
            <em class="face face-back">{value}</em>
          </span>`,
        });

        /* initial states via DOM refs — not affected by scope context */
        utils.set(nameWrap, { opacity: 0, translateY: "10px" });
        utils.set(emailBar, { opacity: 0 });

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

        /* All animate() calls use DOM refs → fully isolated per card */
        const onEnter = () => {
          animate(photoEl,   { scale: 1.1,  duration: 900 });
          animate(titleWrap, { translateY: "-20px", opacity: 0, duration: 220 });
          animate(nameWrap,  { translateY: "0px",  opacity: 1, duration: 200, delay: 60 });
          animate(rotateAnim, { progress: 1 });
          animate(emailBar,  { maxHeight: "52px", opacity: 1, duration: 380, ease: "outBack(1.1)", delay: 100 });
        };

        const onLeave = () => {
          animate(photoEl,   { scale: 1,    duration: 700 });
          animate(rotateAnim, { progress: 0 });
          animate(nameWrap,  { translateY: "10px", opacity: 0, duration: 200, delay: 280 });
          animate(titleWrap, { translateY: "0px",  opacity: 1, duration: 220, delay: 330 });
          animate(emailBar,  { maxHeight: "0px",   opacity: 0, duration: 260 });
        };

        /* Touch devices: tap to toggle instead of hover */
        const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

        if (isTouch) {
          let open = false;
          const onTap = (e: Event) => {
            /* Let mailto links work normally */
            if ((e.target as HTMLElement).closest("a")) return;
            open = !open;
            open ? onEnter() : onLeave();
          };
          el.addEventListener("click", onTap);
          return () => el.removeEventListener("click", onTap);
        }

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
      {/* ── Hero — centered like all other pages ─────────────── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>East African Spirits</p>
        <h1 className={styles.heroTitle}>Our Team</h1>
        <div className={styles.heroDivider} />
        <p className={styles.heroSub}>
          {allMembers.length} leaders driving excellence across East Africa
        </p>
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

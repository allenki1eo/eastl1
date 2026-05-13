"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { animate, createScope, createTimeline, stagger, text, utils } from "animejs";
import { X, Mail } from "lucide-react";
import styles from "./page.module.css";

/* ── Types ────────────────────────────────────────────────────── */
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

/* ── Data ─────────────────────────────────────────────────────── */
const tiers: Tier[] = [
  {
    label: "Executive Leadership",
    members: [
      { id: 0, name: "Gasper H Kileo",   title: "Chief Executive Officer",  email: "ceo@eastafricanspirits.com", initials: "GK" },
      { id: 1, name: "Godbless G Kileo", title: "Chief Operating Officer",  email: "coo@eastafricanspirits.com", initials: "GG" },
      { id: 2, name: "Galdness G Kileo", title: "Chief Financial Officer",  email: "cfo@eastafricanspirits.com", initials: "GK" },
    ],
  },
  {
    label: "Management",
    members: [
      { id: 3, name: "Leonard Mushi",    title: "General Manager",              email: "info@eastafricanspirits.com", initials: "LM" },
      { id: 4, name: "Ansila Daniel",    title: "Human Resources",              email: "hr@eastafricanspirits.com",   initials: "AD" },
      { id: 5, name: "Happiness Nassor", title: "Accounting Manager",           email: "info@eastafricanspirits.com", initials: "HN" },
      { id: 6, name: "Eric H Kileo",     title: "Administrative Coordinator",   email: "info@eastafricanspirits.com", initials: "EK" },
    ],
  },
  {
    label: "Operations",
    members: [
      { id: 7,  name: "Julius Nyaki",      title: "Plant Manager",          email: "info@eastafricanspirits.com", initials: "JN" },
      { id: 8,  name: "Joseph Otieno",     title: "Chief Engineer",         email: "info@eastafricanspirits.com", initials: "JO" },
      { id: 9,  name: "Dioniz Rwemamu",    title: "QC Manager",             email: "info@eastafricanspirits.com", initials: "DR" },
      { id: 10, name: "Valentine Salimbo", title: "Brew Manager",           email: "info@eastafricanspirits.com", initials: "VS" },
      { id: 11, name: "Ndekirwa Kaaya",    title: "Production Supervisor",  email: "info@eastafricanspirits.com", initials: "NK" },
    ],
  },
];

const allMembers = tiers.flatMap((t) => t.members);

/* ── Avatar (photo → initials fallback) ───────────────────────── */
function Avatar({ member, large }: { member: Member; large?: boolean }) {
  const [err, setErr] = useState(false);
  const size = large ? 110 : 72;

  useEffect(() => { setErr(false); }, [member.id]);

  return err ? (
    <div className={styles.avatarInitials} style={{ width: size, height: size }}>
      <span>{member.initials}</span>
    </div>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/team/member-${member.id}.jpg`}
      alt={member.name}
      width={size}
      height={size}
      onError={() => setErr(true)}
      className={styles.avatarImg}
      style={{ width: size, height: size }}
    />
  );
}

/* ── Team card ─────────────────────────────────────────────────── */
function TeamCard({ member, isExec, onClick }: { member: Member; isExec?: boolean; onClick: () => void }) {
  return (
    <article
      id={`team-member-${member.id}`}
      className={`${styles.card} ${isExec ? styles.cardExec : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View ${member.name}'s profile`}
    >
      <div className={styles.avatarWrap}>
        <Avatar member={member} />
        <div className={styles.avatarRing} />
      </div>

      {/* title layer — visible by default */}
      <div className={`${styles.textLayer} ${styles.titleLayer} team-title-layer`}>
        <p className={styles.titleText}>{member.title}</p>
      </div>

      {/* name layer — animated in on hover */}
      <div className={`${styles.textLayer} ${styles.nameLayer} team-name-layer`}>
        <h2 className={`${styles.nameH2} team-name-h2`}>{member.name}</h2>
      </div>

      <span className={styles.cardHint}>View profile</span>
    </article>
  );
}

/* ── Tier connector (animated on scroll) ───────────────────────── */
function TierConnector() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.connectorIn); ob.disconnect(); } },
      { threshold: 0.5 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.tierConnector}>
      <div className={styles.connLine} />
      <div className={styles.connDiamond} />
      <div className={styles.connLine} />
    </div>
  );
}

/* ── Tier section (scroll-reveal) ──────────────────────────────── */
function TierSection({ tier, isFirst, onCardClick }: {
  tier: Tier;
  isFirst: boolean;
  onCardClick: (m: Member) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); ob.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.tierSection}>
      <p className={`${styles.tierLabel} ${visible ? styles.tierLabelIn : ""}`}
         style={{ transitionDelay: "60ms" }}>
        {tier.label}
      </p>
      <div className={styles.tierCards}>
        {tier.members.map((member, i) => (
          <div
            key={member.id}
            className={`${styles.cardWrapper} ${visible ? styles.cardIn : ""}`}
            style={{ transitionDelay: `${120 + i * 90}ms` }}
          >
            <TeamCard
              member={member}
              isExec={isFirst}
              onClick={() => onCardClick(member)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Modal ────────────────────────────────────────────────────── */
function MemberModal({ member, onClose }: { member: Member | null; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (member) {
      requestAnimationFrame(() => setOpen(true));
      document.body.style.overflow = "hidden";
    } else {
      setOpen(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [member]);

  useEffect(() => {
    if (!member) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${open ? styles.modalOverlayOpen : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} profile`}
    >
      <div
        className={`${styles.modalCard} ${open ? styles.modalCardOpen : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className={styles.modalAvatarWrap}>
          <Avatar member={member} large />
          <div className={styles.modalAvatarRing} />
        </div>

        <p className={styles.modalRole}>{member.title}</p>
        <h2 className={styles.modalName}>{member.name}</h2>
        <div className={styles.modalDivider} />
        <a href={`mailto:${member.email}`} className={styles.modalEmail}>
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span>{member.email}</span>
        </a>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function OurTeamPage() {
  const initialized = useRef(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

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

        utils.set(".team-name-layer", { opacity: 0 });

        const ws = stagger(50, { use: "data-word", start: 0 });

        const rotateAnim = createTimeline({
          autoplay: false,
          defaults: { ease: "inOut(2)", duration: 700 },
        })
          .add(".word-3d",              { rotateX: -180 },      ws)
          .add(".word-3d .face-top",    { opacity: [0, 0, 0] }, ws)
          .add(".word-3d .face-front",  { opacity: [1, 0, 0] }, ws)
          .add(".word-3d .face-bottom", { opacity: [0, 1, 0] }, ws)
          .add(".word-3d .face-back",   { opacity: [0, 0, 1] }, ws);

        const onEnter = () => {
          animate(".team-title-layer", { opacity: 0, duration: 180 });
          animate(".team-name-layer",  { opacity: 1, duration: 150 });
          animate(rotateAnim, { progress: 1 });
        };

        const onLeave = () => {
          animate(rotateAnim, { progress: 0 });
          animate(".team-name-layer",  { opacity: 0, duration: 200, delay: 300 });
          animate(".team-title-layer", { opacity: 1, duration: 200, delay: 350 });
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
      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>East African Spirits</p>
        <h1 className={styles.heroTitle}>Our Team</h1>
        <div className={styles.heroDivider} />
        <p className={styles.heroSub}>The people behind every bottle</p>
        <div className={styles.heroStat}>
          <span className={styles.heroStatNum}>{allMembers.length}</span>
          <span className={styles.heroStatLabel}>Team Members</span>
        </div>
      </section>

      {/* Tiers */}
      <section className={styles.tiersSection}>
        {tiers.map((tier, i) => (
          <div key={tier.label}>
            {i > 0 && <TierConnector />}
            <TierSection
              tier={tier}
              isFirst={i === 0}
              onCardClick={setSelected}
            />
          </div>
        ))}
      </section>

      {/* Modal */}
      <MemberModal member={selected} onClose={closeModal} />
    </main>
  );
}

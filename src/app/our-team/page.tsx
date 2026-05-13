"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

const teamMembers = [
  { name: "Gasper H Kileo",    title: "Chief Executive Officer" },
  { name: "Godbless G Kileo",  title: "Chief Operating Officer" },
  { name: "Galdness G Kileo",  title: "Chief Financial Officer" },
  { name: "Leonard Mushi",     title: "General Manager" },
  { name: "Ansila Daniel",     title: "Human Resources" },
  { name: "Happiness Nassor",  title: "Accounting Manager" },
  { name: "Eric H Kileo",      title: "Administrative Coordinator" },
  { name: "Julius Nyaki",      title: "Plant Manager" },
  { name: "Joseph Otieno",     title: "Chief Engineer" },
  { name: "Dioniz Rwemamu",    title: "QC Manager" },
  { name: "Valentine Salimbo", title: "Brew Manager" },
  { name: "Ndekirwa Kaaya",    title: "Production Supervisor" },
];

export default function OurTeamPage() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    import("animejs").then((anime) => {
      const { animate, createScope, createTimeline, stagger, text } = anime;

      teamMembers.forEach((_, index) => {
        const el = document.getElementById(`team-member-${index}`);
        if (!el) return;

        createScope({
          root: `#team-member-${index}`,
          defaults: { ease: "outQuad" },
        }).add((sc) => {
          if (!sc) return;

          text.split("h2", {
            words: `<span class="word-3d word-{i}">
              <em class="face face-top">{value}</em>
              <em class="face-front">{value}</em>
              <em class="face face-bottom">{value}</em>
              <em class="face face-back">{value}</em>
            </span>`,
          });

          const wordStagger = stagger(50, { use: "data-word", start: 0 });

          const rotateAnim = createTimeline({
            autoplay: false,
            defaults: { ease: "inOut(2)", duration: 750 },
          })
            .add(".word-3d",             { rotateX: -180 },       wordStagger)
            .add(".word-3d .face-top",   { opacity: [0, 0, 0] },  wordStagger)
            .add(".word-3d .face-front", { opacity: [1, 0, 0] },  wordStagger)
            .add(".word-3d .face-bottom",{ opacity: [0, 1, 0] },  wordStagger)
            .add(".word-3d .face-back",  { opacity: [0, 0, 1] },  wordStagger);

          const onEnter = () => { animate(rotateAnim, { progress: 1 }); };
          const onLeave = () => { animate(rotateAnim, { progress: 0 }); };

          el.addEventListener("pointerenter", onEnter);
          el.addEventListener("pointerleave", onLeave);

          return () => {
            el.removeEventListener("pointerenter", onEnter);
            el.removeEventListener("pointerleave", onLeave);
          };
        });
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
        <p className={styles.heroSub}>The people behind every bottle</p>
      </section>

      {/* ── Members grid ─────────────────────────────────────── */}
      <section>
        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <article
              key={index}
              id={`team-member-${index}`}
              className={styles.card}
            >
              <span className={styles.memberRole}>{member.title}</span>
              <h2>{member.name}</h2>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, createTimeline, stagger, text, utils } from "animejs";
import styles from "./page.module.css";

type Member  = { id: number; name: string; title: string };
type OrgNode = { member: Member; children: OrgNode[] };

const orgTree: OrgNode = {
  member: { id: 0, name: "Gasper H Kileo", title: "Chief Executive Officer" },
  children: [
    {
      member: { id: 1, name: "Godbless G Kileo", title: "Chief Operating Officer" },
      children: [
        {
          member: { id: 3, name: "Leonard Mushi", title: "General Manager" },
          children: [
            {
              member: { id: 4, name: "Ansila Daniel", title: "Human Resources" },
              children: [],
            },
            {
              member: { id: 6, name: "Eric H Kileo", title: "Administrative Coordinator" },
              children: [],
            },
            {
              member: { id: 7, name: "Julius Nyaki", title: "Plant Manager" },
              children: [
                {
                  member: { id: 8, name: "Joseph Otieno", title: "Chief Engineer" },
                  children: [],
                },
                {
                  member: { id: 9, name: "Dioniz Rwemamu", title: "QC Manager" },
                  children: [],
                },
                {
                  member: { id: 10, name: "Valentine Salimbo", title: "Brew Manager" },
                  children: [
                    {
                      member: { id: 11, name: "Ndekirwa Kaaya", title: "Production Supervisor" },
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      member: { id: 2, name: "Galdness G Kileo", title: "Chief Financial Officer" },
      children: [
        {
          member: { id: 5, name: "Happiness Nassor", title: "Accounting Manager" },
          children: [],
        },
      ],
    },
  ],
};

function flattenTree(node: OrgNode): Member[] {
  return [node.member, ...node.children.flatMap(flattenTree)];
}

const allMembers = flattenTree(orgTree);

const depthClass = [
  styles.cardDepth0,
  styles.cardDepth1,
  styles.cardDepth2,
  styles.cardDepth3,
  styles.cardDepth4,
];

function OrgTreeNode({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const hasChildren = node.children.length > 0;
  const cardClass = `${styles.card} ${depthClass[Math.min(depth, 4)]}`;

  return (
    <div className={styles.nodeWrapper}>
      <article id={`team-member-${node.member.id}`} className={cardClass}>
        <div className={`${styles.titleLayer} team-title-layer`}>
          <p className={styles.titleText}>{node.member.title}</p>
        </div>
        <div className={`${styles.nameLayer} team-name-layer`}>
          <h2 className={`${styles.nameH2} team-name-h2`}>{node.member.name}</h2>
        </div>
      </article>

      {hasChildren && (
        <>
          <div className={styles.connectorDown} />
          <div className={styles.childrenRow}>
            {node.children.map((child) => (
              <div key={child.member.id} className={styles.childCol}>
                <div className={styles.connectorUp} />
                <OrgTreeNode node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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

        // name layer starts hidden
        utils.set(".team-name-layer", { opacity: 0 });

        const wordStagger = stagger(50, { use: "data-word", start: 0 });

        const rotateAnim = createTimeline({
          autoplay: false,
          defaults: { ease: "inOut(2)", duration: 700 },
        })
          .add(".word-3d",               { rotateX: -180 },       wordStagger)
          .add(".word-3d .face-top",     { opacity: [0, 0, 0] },  wordStagger)
          .add(".word-3d .face-front",   { opacity: [1, 0, 0] },  wordStagger)
          .add(".word-3d .face-bottom",  { opacity: [0, 1, 0] },  wordStagger)
          .add(".word-3d .face-back",    { opacity: [0, 0, 1] },  wordStagger);

        const onEnter = () => {
          animate(".team-title-layer", { opacity: 0, duration: 180, ease: "outQuad" });
          animate(".team-name-layer",  { opacity: 1, duration: 150, ease: "outQuad" });
          animate(rotateAnim, { progress: 1 });
        };

        const onLeave = () => {
          animate(rotateAnim, { progress: 0 });
          animate(".team-name-layer",  { opacity: 0, duration: 200, delay: 320, ease: "outQuad" });
          animate(".team-title-layer", { opacity: 1, duration: 200, delay: 370, ease: "outQuad" });
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
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>East African Spirits</p>
        <h1 className={styles.heroTitle}>Our Team</h1>
        <div className={styles.heroDivider} />
        <p className={styles.heroSub}>The people behind every bottle</p>
      </section>

      <section className={styles.treeSection}>
        <div className={styles.treeContainer}>
          <OrgTreeNode node={orgTree} />
        </div>
      </section>
    </main>
  );
}

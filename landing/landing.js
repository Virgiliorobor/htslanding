/* ============================================================
   AduanIA — explainer page interactions
   GSAP + ScrollTrigger. Everything deliberate, mechanical,
   nothing bounces.
   ============================================================ */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- helpers ---------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* =========================================================
     SECTION 0 — Cold Open
     ========================================================= */
  const FLAGS = [
    { flag: "🇺🇸", word: "avocado" },
    { flag: "🇨🇳", word: "鳄梨" },
    { flag: "🇹🇷", word: "avokado" },
    { flag: "🇩🇪", word: "Avocado" },
    { flag: "🇯🇵", word: "アボカド" },
    { flag: "🇧🇷", word: "abacate" },
    { flag: "🇫🇷", word: "avocat" },
    { flag: "🇮🇳", word: "मक्खनफल" },
  ];

  const orbit = $("#orbit");
  const chipEls = [];
  if (orbit) {
    const n = FLAGS.length;
    FLAGS.forEach((f, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2; // start at top
      const r = 42; // % radius
      const x = 50 + r * Math.cos(angle);
      const y = 50 + r * Math.sin(angle);
      const el = document.createElement("div");
      el.className = "chip-orbit";
      el.style.left = x + "%";
      el.style.top = y + "%";
      el.style.transform = "translate(-50%,-50%)";
      el.innerHTML = `<span class="flag">${f.flag}</span><span class="word">${f.word}</span>`;
      orbit.appendChild(el);
      chipEls.push(el);
    });
  }

  function runColdOpen() {
    const avocado = $("#avocado");
    const headline = $("#coldHeadline");
    const bridge = $("#coldBridge");
    const codeDigits = $$("#coldCode .d");
    const codeLabel = $("#coldCodeLabel");

    // reduced-motion / no-GSAP: everything just visible
    if (reduced || !hasGSAP) {
      chipEls.forEach((c) => (c.style.opacity = 1));
      codeDigits.forEach((d) => (d.style.opacity = 1));
      return;
    }

    gsap.set(avocado, { opacity: 0, scale: 0.82 });
    gsap.set(headline, { opacity: 0, y: 18 });
    gsap.set(bridge, { opacity: 0, y: 14 });
    gsap.set(codeDigits, { opacity: 0, y: 10 });
    gsap.set(codeLabel, { opacity: 0, y: 10 });

    const tl = gsap.timeline({ delay: 0.3 });
    // 1 — the avocado, then its eight languages orbit in (deliberate)
    tl.to(avocado, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" })
      .to(chipEls, { opacity: 1, duration: 0.55, stagger: 0.11, ease: "power1.out" }, "-=0.2")
      .to({}, { duration: 1.0 })                       // hold: same fruit, eight names
      // 2 — the question rises and STAYS
      .to(headline, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" })
      .to(bridge, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "+=0.5")
      .to({}, { duration: 0.7 })
      // 3 — the languages dissolve, the single number assembles
      .to(chipEls, { opacity: 0, duration: 0.6, stagger: 0.05, ease: "power1.in" })
      .to(codeDigits, { opacity: 1, y: 0, duration: 0.32, stagger: 0.13, ease: "power2.out" }, "-=0.15")
      .to(codeLabel, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "+=0.15");

    // Safety: if the tab was backgrounded the rAF ticker stalls — force the
    // full resolved composition so nothing stays hidden.
    const forceShow = () => {
      gsap.set(avocado, { opacity: 1, scale: 1 });
      gsap.set([headline, bridge, codeLabel], { opacity: 1, y: 0 });
      gsap.set(codeDigits, { opacity: 1, y: 0 });
      gsap.set(chipEls, { opacity: 0 });
    };
    const safety = setTimeout(forceShow, 10000);
    tl.eventCallback("onComplete", () => clearTimeout(safety));
  }

  // cargo ship glide
  function runShip() {
    const ship = $("#ship");
    if (!ship || reduced || !hasGSAP) return;
    gsap.fromTo(
      ship,
      { x: 0 },
      { x: window.innerWidth + 200, duration: 26, ease: "none", repeat: -1, delay: 1.5 }
    );
  }

  /* =========================================================
     Generic scroll reveals
     ========================================================= */
  function setupReveals() {
    const els = $$(".reveal").filter((e) => !e.classList.contains("hold"));
    if (reduced || !hasGSAP) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    ScrollTrigger.batch(els, {
      start: "top 86%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: "power2.out",
          overwrite: true,
        }),
    });
    // ensure correct initial state for gsap
    gsap.set(els, { opacity: 0, y: 12 });
  }

  /* =========================================================
     SECTION 1 — HTS code builder
     ========================================================= */
  function setupBuilder() {
    const segs = $$("#builder .code-seg");
    if (!segs.length) return;
    if (reduced || !hasGSAP) {
      segs.forEach((s) => s.classList.add("is-in"));
      return;
    }
    ScrollTrigger.create({
      trigger: "#builder",
      start: "top 72%",
      once: true,
      onEnter: () => {
        segs.forEach((s, i) => setTimeout(() => s.classList.add("is-in"), i * 420));
      },
    });
  }

  /* =========================================================
     SECTION 3 — The Guessing Game
     ========================================================= */
  function setupGame() {
    const grid = $("#answerGrid");
    if (!grid) return;
    const cards = $$(".answer-card", grid);
    const hint = $("#gameHint");
    const ruling = $("#ruling");
    const revealBlock = $("#revealBlock");
    let solved = false;

    const HINTS = [
      "Good instinct — but not quite.",
      "Reasonable guess. Still not it.",
      "You'd think so. Customs disagrees.",
    ];
    let wrongCount = 0;

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        if (solved || card.classList.contains("fold") || card.disabled) return;
        const correct = card.dataset.correct === "true";

        if (correct) {
          solved = true;
          cards.forEach((c) => (c.disabled = true));
          // dismiss the others, then remove them from the grid
          cards.forEach((c) => {
            if (c !== card) c.classList.add("fold");
          });
          setTimeout(() => {
            cards.forEach((c) => {
              if (c !== card) c.style.display = "none";
            });
            if (window.ScrollTrigger) ScrollTrigger.refresh();
          }, 600);
          if (hint) hint.classList.remove("show");
          card.classList.add("correct");
          // print the ruling after the border draws (~1.2s)
          setTimeout(() => printRuling(ruling), 700);
        } else {
          card.classList.add("wrong");
          if (hint) {
            hint.textContent = HINTS[Math.min(wrongCount, HINTS.length - 1)];
            hint.classList.add("show");
          }
          wrongCount++;
          card.disabled = true;
          setTimeout(() => card.classList.add("fold"), 360);
        }
      });
    });

    function printRuling(rul) {
      if (!rul) return;
      rul.style.display = "block";
      const rows = $$(".rrow, .rsep", rul);
      rows.forEach((r, i) => {
        setTimeout(() => {
          if (r.classList.contains("rrow")) r.classList.add("print");
          else r.style.opacity = 1;
        }, i * 220);
      });
      // after ruling prints, reveal the full explanation
      setTimeout(showReveal, rows.length * 220 + 500);
    }

    function showReveal() {
      if (!revealBlock) return;
      revealBlock.style.display = "block";
      const sony = $(".sony-card", revealBlock);
      // guaranteed final state (covers rAF stalls)
      const settle = () => {
        revealBlock.style.opacity = 1;
        revealBlock.style.transform = "none";
        if (sony) { sony.style.opacity = 1; sony.style.transform = "none"; }
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      };
      if (reduced || !hasGSAP) { settle(); return; }
      gsap.fromTo(
        revealBlock,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          onComplete: () => window.ScrollTrigger && ScrollTrigger.refresh() }
      );
      if (sony) {
        gsap.fromTo(sony, { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", delay: 0.4 });
      }
      setTimeout(settle, 1600);
    }
  }

  /* =========================================================
     SECTION 4 — Sticky research timeline
     ========================================================= */
  function setupTimeline() {
    const timeline = $("#timeline");
    const fill = $("#spineFill");
    const steps = $$(".step", timeline);
    if (!timeline || !fill) return;

    if (reduced || !hasGSAP) {
      fill.style.height = "100%";
      steps.forEach((s) => s.classList.add("active"));
      return;
    }

    ScrollTrigger.create({
      trigger: timeline,
      start: "top 64%",
      end: "bottom 72%",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        fill.style.height = p * 100 + "%";
        steps.forEach((s, i) => {
          const threshold = (i + 0.6) / steps.length;
          s.classList.toggle("active", p >= threshold);
        });
      },
    });
  }

  /* =========================================================
     Count-up metrics
     ========================================================= */
  function fmt(n) {
    return Math.round(n).toLocaleString("en-US");
  }
  function setupCounters() {
    const nums = $$("[data-count]");
    nums.forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const pre = el.dataset.pre || "";
      const prefix = el.dataset.prefix || "";
      const render = (v) => (el.textContent = pre + prefix + fmt(v));

      if (reduced || !hasGSAP) {
        render(target);
        return;
      }
      const obj = { v: 0 };
      render(0);
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => render(obj.v),
          });
        },
      });
    });
  }

  /* =========================================================
     SECTION 5 — Pipeline + confidence + final code
     ========================================================= */
  function setupPipeline() {
    const pipeline = $("#pipeline");
    if (!pipeline) return;
    const rows = $$(".pipe-row", pipeline);
    const confFill = $("#confFill");
    const confPct = $("#confPct");
    const finalCode = $("#finalCode");
    const finalMeta = finalCode ? finalCode.nextElementSibling : null;

    // hold these back until the pipeline completes
    [finalCode, finalMeta].forEach((e) => {
      if (e) {
        e.classList.remove("reveal");
        e.classList.add("hold");
        e.style.opacity = 0;
        e.style.transform = "translateY(12px)";
      }
    });

    function revealFinal() {
      const TARGET = 92;
      const statusEl = $("#consoleStatus");
      if (statusEl) statusEl.textContent = "Resolved";
      if (confFill) confFill.style.width = TARGET + "%";
      if (confPct) {
        if (reduced || !hasGSAP) {
          confPct.textContent = TARGET + "%";
        } else {
          const o = { v: 0 };
          gsap.to(o, {
            v: TARGET,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => (confPct.textContent = Math.round(o.v) + "%"),
          });
        }
      }
      setTimeout(() => {
        [finalCode, finalMeta].forEach((e, i) => {
          if (!e) return;
          if (reduced || !hasGSAP) {
            e.style.opacity = 1;
            e.style.transform = "none";
          } else {
            gsap.to(e, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: "power2.out" });
          }
        });
      }, 700);
    }

    function runSequence() {
      if (reduced || !hasGSAP) {
        rows.forEach((r) => r.classList.add("done"));
        revealFinal();
        return;
      }
      let i = 0;
      const tick = () => {
        if (i >= rows.length) {
          setTimeout(revealFinal, 300);
          return;
        }
        const row = rows[i];
        row.classList.add("active");
        setTimeout(() => {
          row.classList.remove("active");
          row.classList.add("done");
          i++;
          tick();
        }, 620);
      };
      tick();
    }

    ScrollTrigger.create({
      trigger: pipeline,
      start: "top 68%",
      once: true,
      onEnter: runSequence,
    });
  }

  /* ---------- boot ---------- */
  function init() {
    setupReveals();
    setupBuilder();
    setupGame();
    setupTimeline();
    setupCounters();
    setupPipeline();
    runColdOpen();
    runShip();
    if (hasGSAP && window.ScrollTrigger) {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

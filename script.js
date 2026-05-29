/* =================================================================
   AduanIA — Explainer Page interactions & animation
   GSAP + ScrollTrigger. Everything deliberate and mechanical.
   ================================================================= */
(function () {
  "use strict";

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Safe element collector — works with or without GSAP loaded, so the
  // page degrades gracefully if the CDN is unreachable.
  function toArr(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  }

  /* ---------------------------------------------------------------
     SECTION 0 — Cold open sequence
     Avocado is already centered. Flags orbit in one by one, names
     are already in the markup, then headline, bridge, code.
     --------------------------------------------------------------- */
  function layoutOrbit() {
    const nodes = document.querySelectorAll(".orbit__node");
    const orbit = document.getElementById("orbit");
    if (!orbit || !nodes.length) return;
    const radius = orbit.offsetWidth / 2 - 10;
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      node.dataset.x = x;
      node.dataset.y = y;
      // resting transform — JS keeps the ring positioned on resize
      node.style.transform =
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }

  function coldOpenSequence() {
    layoutOrbit();
    const nodes = toArr(".orbit__node");

    if (prefersReduced || !hasGSAP) {
      // static fallback — everything just visible
      document.querySelectorAll(
        ".orbit__node, .cold-open__headline, .cold-open__bridge, .scroll-cue"
      ).forEach((el) => (el.style.opacity = 1));
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // flags fade/scale in one by one around the ring
    tl.to(nodes, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.12,
      delay: 0.3,
    });

    // slow, continuous rotation of the ring (subtle — instrument-like)
    gsap.to("#orbit", {
      rotation: 360,
      duration: 120,
      ease: "none",
      repeat: -1,
    });
    // counter-rotate the labels so text stays upright
    gsap.to(nodes, {
      rotation: -360,
      duration: 120,
      ease: "none",
      repeat: -1,
    });

    // headline, then bridge
    tl.to(".cold-open__headline", { opacity: 1, y: 0, duration: 0.7 }, "+=0.2");
    tl.fromTo(
      ".cold-open__headline",
      { y: 12 },
      { y: 0, duration: 0.7 },
      "<"
    );
    tl.to(".cold-open__bridge", { opacity: 1, duration: 0.6 }, "+=0.4");

    // names dissolve, then the code prints digit by digit
    tl.to(nodes, { opacity: 0, duration: 0.6, stagger: 0.04 }, "+=0.5");
    tl.add(() => printCode("coldCode", "0804.40"), "+=0.1");
    tl.to(".scroll-cue", { opacity: 1, duration: 0.6 }, "+=0.8");

    // drift the cargo ship across the bottom, on a loop
    gsap.fromTo(
      ".ship",
      { x: 0 },
      {
        x: window.innerWidth + 320,
        duration: 26,
        ease: "none",
        repeat: -1,
        delay: 1,
      }
    );
  }

  // Print a monospace code one character at a time
  function printCode(elId, text) {
    const el = document.getElementById(elId);
    if (!el) return;
    if (prefersReduced || !hasGSAP) {
      el.textContent = text;
      return;
    }
    el.textContent = "";
    text.split("").forEach((ch, i) => {
      gsap.delayedCall(i * 0.09, () => {
        el.textContent += ch;
      });
    });
  }

  /* ---------------------------------------------------------------
     Generic scroll reveals (.reveal → fade up 12px)
     --------------------------------------------------------------- */
  function setupReveals() {
    const items = toArr(".reveal");
    if (prefersReduced || !hasGSAP) {
      items.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }
    items.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });
  }

  /* ---------------------------------------------------------------
     SECTION 1 — Code builder: underlines draw in layer by layer
     --------------------------------------------------------------- */
  function setupBuilder() {
    const builder = document.getElementById("builder");
    if (!builder) return;

    if (prefersReduced || !hasGSAP) {
      builder.classList.add("is-drawn");
      return;
    }

    // Underlines are drawn purely in CSS once .is-drawn is set; the
    // staggered transition-delay on each segment makes them appear
    // layer by layer (08, then 04, then .40 …).
    ScrollTrigger.create({
      trigger: builder,
      start: "top 70%",
      once: true,
      onEnter: () => builder.classList.add("is-drawn"),
    });
  }

  /* ---------------------------------------------------------------
     SECTION 2 — Heading rows animate in one by one
     --------------------------------------------------------------- */
  function setupProblem() {
    const rows = toArr("#problemList .heading-row");
    if (!rows.length) return;
    if (prefersReduced || !hasGSAP) {
      rows.forEach((r) => gsap.set(r, { opacity: 1, x: 0 }));
      return;
    }
    gsap.fromTo(
      rows,
      { opacity: 0, x: 16 },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.14,
        scrollTrigger: { trigger: "#problemList", start: "top 78%" },
      }
    );
  }

  /* ---------------------------------------------------------------
     SECTION 3 — The guessing game
     --------------------------------------------------------------- */
  const RULING_TEXT = [
    "CBP BINDING RULING   HQ H288838",
    "DATE                 January 19, 2021",
    "──────────────────────────────────────────────────────",
    "PRODUCT              VRSE Virtual Reality Headset Kit",
    "                     Plastic shell + Bluetooth controller",
    "                     Requires smartphone to operate",
    "",
    "CLASSIFICATION       9004.90.00",
    "                     Spectacles, goggles and the like — other",
    "",
    "DUTY RATE            2.5%",
    "",
    "REASONING            The goggles deliver the video.",
    "                     The video IS the VR experience.",
    "                     Essential character = goggles.",
    "",
    "                     The controller: separately classified",
    "                     as 8526 — radio remote control apparatus.",
    "                     Bluetooth = radio frequency.",
    "                     Chapter 95 Note 1(m) excludes it.",
    "──────────────────────────────────────────────────────",
  ];

  function setupGame() {
    const game = document.getElementById("game");
    const grid = document.getElementById("gameGrid");
    const hint = document.getElementById("gameHint");
    const ruling = document.getElementById("ruling");
    const rulingBlock = document.getElementById("rulingBlock");
    const revealCopy = document.getElementById("revealCopy");
    const sony = document.getElementById("sony");
    if (!grid) return;

    let solved = false;

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card || solved) return;

      if (card.dataset.correct === "true") {
        solved = true;
        game.classList.add("is-solved");
        hint.textContent = "";
        revealCorrect(card);
      } else {
        // wrong — gentle. flash coral, fold out to the left.
        card.classList.add("card--wrong");
        hint.textContent = "Good instinct — but not quite.";
        if (hasGSAP && !prefersReduced) {
          gsap.to(card, {
            x: "-100%",
            opacity: 0,
            duration: 0.5,
            delay: 0.28,
            ease: "power2.in",
            onComplete: () => (card.style.visibility = "hidden"),
          });
        } else {
          card.style.display = "none";
        }
      }
    });

    function revealCorrect(card) {
      // teal border already via .card--correct; expand + draw the ruling
      card.classList.add("card--correct");
      ruling.hidden = false;

      printRuling(() => {
        // bring in the reveal copy, then slide in the Sony card
        if (hasGSAP && !prefersReduced) {
          gsap.to(revealCopy, { opacity: 1, duration: 0.6, ease: "power2.out" });
          gsap.to(sony, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.5,
            ease: "power2.out",
          });
          ScrollTrigger.refresh();
        } else {
          revealCopy.style.opacity = 1;
          sony.style.opacity = 1;
          sony.style.transform = "none";
        }
      });
    }

    function printRuling(done) {
      const block = rulingBlock;
      if (prefersReduced || !hasGSAP) {
        block.textContent = RULING_TEXT.join("\n");
        done && done();
        return;
      }
      block.textContent = "";
      RULING_TEXT.forEach((line, i) => {
        gsap.delayedCall(i * 0.11, () => {
          block.textContent += (i ? "\n" : "") + line;
        });
      });
      gsap.delayedCall(RULING_TEXT.length * 0.11 + 0.2, () => done && done());
    }
  }

  /* ---------------------------------------------------------------
     SECTION 4 — Research process: sticky scroll, step activation
     --------------------------------------------------------------- */
  function setupResearch() {
    const sticky = document.getElementById("researchSticky");
    const steps = toArr("#timelineSteps .step");
    const progress = document.getElementById("timelineProgress");
    if (!sticky || !steps.length) return;

    if (prefersReduced || !hasGSAP) {
      steps.forEach((s) => s.classList.add("is-active"));
      if (progress) progress.style.height = "100%";
      return;
    }

    function setActive(count) {
      steps.forEach((s, i) => s.classList.toggle("is-active", i < count));
    }
    setActive(1);

    ScrollTrigger.create({
      trigger: sticky,
      start: "top top",
      end: "+=" + window.innerHeight * (steps.length * 0.55),
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        if (progress) progress.style.height = p * 100 + "%";
        const count = Math.min(steps.length, Math.floor(p * steps.length) + 1);
        setActive(count);
      },
    });
  }

  /* ---------------------------------------------------------------
     Count-up metrics (run on viewport entry)
     --------------------------------------------------------------- */
  function setupCounters() {
    const counters = toArr(".count");
    counters.forEach((el) => {
      // counters flagged data-manual are driven by another animation
      if (el.hasAttribute("data-manual")) return;
      const to = parseFloat(el.dataset.to);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";

      if (prefersReduced || !hasGSAP) {
        el.textContent = prefix + format(to) + suffix;
        return;
      }
      const obj = { v: parseFloat(el.dataset.from || 0) };
      gsap.to(obj, {
        v: to,
        duration: 1.4,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = prefix + format(Math.round(obj.v)) + suffix;
        },
      });
    });
  }

  function format(n) {
    return n.toLocaleString("en-US");
  }

  /* ---------------------------------------------------------------
     SECTION 5 — Pipeline: auto-runs on scroll entry
     --------------------------------------------------------------- */
  function setupPipeline() {
    const pipeline = document.getElementById("pipeline");
    const rows = toArr("#pipeline .pipe-row");
    const fill = document.getElementById("confidenceFill");
    const pct = document.querySelector("#confidence .count");
    const finalCode = document.getElementById("finalCode");
    if (!pipeline || !rows.length) return;

    function runFinish() {
      // confidence bar fills to 92% over 1.5s, percentage counts up
      if (prefersReduced || !hasGSAP) {
        if (fill) fill.style.width = "92%";
        if (pct) pct.textContent = "92%";
        if (finalCode) finalCode.style.opacity = 1;
        return;
      }
      if (fill) gsap.to(fill, { width: "92%", duration: 1.5, ease: "power2.out" });
      if (pct) {
        const o = { v: 0 };
        gsap.to(o, {
          v: 92,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => (pct.textContent = Math.round(o.v) + "%"),
        });
      }
      if (finalCode)
        gsap.to(finalCode, { opacity: 1, duration: 0.6, delay: 1.5 });
    }

    function runPipeline() {
      if (prefersReduced || !hasGSAP) {
        rows.forEach((r) => {
          r.classList.add("is-done");
          revealResult(r);
        });
        runFinish();
        return;
      }
      let i = 0;
      const step = () => {
        if (i >= rows.length) {
          gsap.delayedCall(0.3, runFinish);
          return;
        }
        const row = rows[i];
        row.classList.add("is-active");          // green pulse
        gsap.delayedCall(0.55, () => {
          row.classList.remove("is-active");
          row.classList.add("is-done");          // teal solid
          revealResult(row);
          i++;
          step();
        });
      };
      step();
    }

    function revealResult(row) {
      const txt = row.dataset.result;
      const out = row.querySelector(".pipe-row__result");
      if (out && txt) out.textContent = "→ " + txt;
    }

    ScrollTrigger.create({
      trigger: pipeline,
      start: "top 72%",
      once: true,
      onEnter: runPipeline,
    });
  }

  /* ---------------------------------------------------------------
     Boot
     --------------------------------------------------------------- */
  function init() {
    coldOpenSequence();
    setupReveals();
    setupBuilder();
    setupProblem();
    setupGame();
    setupResearch();
    setupCounters();
    setupPipeline();

    if (hasGSAP && window.ScrollTrigger) ScrollTrigger.refresh();
  }

  window.addEventListener("load", init);

  // keep the orbit ring positioned on resize
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      layoutOrbit();
      if (hasGSAP && window.ScrollTrigger) ScrollTrigger.refresh();
    }, 200);
  });
})();

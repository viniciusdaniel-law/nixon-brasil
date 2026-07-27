(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionContext = null;
  let initialized = false;

  const markState = (state) => {
    document.documentElement.dataset.motion = state;
  };

  const cleanup = () => {
    motionContext?.revert();
    motionContext = null;
    initialized = false;

    document
      .querySelectorAll('[data-motion]')
      .forEach((element) => element.removeAttribute('style'));
  };

  const init = () => {
    cleanup();

    if (motionQuery.matches) {
      markState('reduced');
      return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      markState('unavailable');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    markState('enhanced');
    initialized = true;

    motionContext = gsap.context(() => {
      const hero = document.querySelector('[data-motion="hero"]');

      if (hero) {
        const media = hero.querySelector('[data-motion="hero-media"]');
        const targets = [
          hero.querySelector('[data-motion="hero-kicker"]'),
          hero.querySelector('[data-motion="hero-title"]'),
          hero.querySelector('[data-motion="hero-lead"]'),
          hero.querySelector('[data-motion="hero-actions"]'),
        ].filter(Boolean);
        const [kicker, title, lead, actions] = targets;
        const rule = hero.querySelector('[data-motion="hero-rule"]');
        const sources = Array.from(hero.querySelectorAll('[data-motion="hero-source"]'));

        if (targets.length) {
          gsap.set(targets, { autoAlpha: 0, y: 18 });
        }
        if (rule) {
          gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' });
        }
        if (sources.length) {
          gsap.set(sources, { autoAlpha: 0, y: 8 });
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            if (media) gsap.set(media, { clearProps: 'willChange' });
          },
        });

        if (media) {
          gsap.set(media, { willChange: 'transform' });
          timeline.fromTo(
            media,
            { scale: 1.035, xPercent: -0.5 },
            { scale: 1, xPercent: 0, duration: 1.6, ease: 'power2.out' },
            0,
          );
        }

        if (kicker) timeline.to(kicker, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.14);
        if (title) timeline.to(title, { autoAlpha: 1, y: 0, duration: 0.68 }, 0.22);
        if (lead) timeline.to(lead, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.36);
        if (actions) timeline.to(actions, { autoAlpha: 1, y: 0, duration: 0.48 }, 0.48);
        if (rule) timeline.to(rule, { scaleX: 1, duration: 0.7 }, 0.68);
        if (sources.length) {
          timeline.to(sources, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.82);
        }
      }

      const reveal = (selector, options = {}) => {
        const elements = gsap.utils.toArray(selector);
        if (!elements.length) return;

        gsap.set(elements, { autoAlpha: 0, y: options.y ?? 16 });
        ScrollTrigger.batch(elements, {
          start: options.start ?? 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: options.duration ?? 0.55,
              stagger: options.stagger ?? 0.08,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            });
          },
        });
      };

      reveal('[data-motion="section-head"]', { y: 12, duration: 0.45, stagger: 0.04 });
      reveal('[data-motion="lead-story"]', { y: 20, duration: 0.7 });
      reveal('[data-motion="compact-story"]', { y: 12, duration: 0.48, stagger: 0.09 });
      reveal('[data-motion="index-row"]', { y: 10, duration: 0.46, stagger: 0.07 });
      reveal('[data-motion="dossier"]', { y: 16, duration: 0.62 });
    });
  };

  const handlePreferenceChange = () => {
    if (motionQuery.matches) {
      cleanup();
      markState('reduced');
      return;
    }

    init();
  };

  motionQuery.addEventListener?.('change', handlePreferenceChange);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted || !initialized) init();
  }, { once: true });

  init();
})();

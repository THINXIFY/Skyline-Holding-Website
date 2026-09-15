import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, MoveRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import heroSkyline from './assets/hero-skyline.jpg';
import culturalStewardship from './assets/cultural-stewardship.jpg';
import cityAtTwilight from './assets/city-at-twilight.jpg';

gsap.registerPlugin(ScrollTrigger);

const purposePrinciples = [
  {
    number: '01',
    title: 'Long-term value',
    description: 'We focus on decisions that can compound value over time.',
  },
  {
    number: '02',
    title: 'Active ownership',
    description: 'Where appropriate, we work alongside businesses rather than simply providing capital.',
  },
  {
    number: '03',
    title: 'Strategic discipline',
    description: 'Every opportunity is evaluated with clarity, patience and a clear investment thesis.',
  },
  {
    number: '04',
    title: 'Enduring relationships',
    description: 'We build relationships around alignment, trust and shared ambition.',
  },
];

const aboutNavigation = [
  { label: 'About', href: '#about-who' },
  { label: 'Purpose', href: '#about-purpose' },
  { label: 'Vision', href: '#about-vision' },
];

function AboutLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`about-label ${light ? 'about-label-light' : ''}`}>
      <span className="about-label-rule" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function AboutLogo({ light = false }: { light?: boolean }) {
  return (
    <a href="/" className="about-logo" aria-label="Skyline Holding home">
      <span className={`about-logo-mark ${light ? 'about-logo-mark-light' : ''}`} aria-hidden="true">S</span>
      <span className={`about-logo-wordmark ${light ? 'about-logo-wordmark-light' : ''}`}>
        Skyline <span>Holding</span>
      </span>
    </a>
  );
}

function AboutHeader({ menuOpen, onToggle, onClose }: { menuOpen: boolean; onToggle: () => void; onClose: () => void }) {
  return (
    <header className="about-header" aria-label="About Skyline navigation">
      <div className="about-header-inner">
        <AboutLogo light />
        <nav className="about-desktop-nav" aria-label="About page navigation">
          <a href="/" className="about-nav-link">Home</a>
          {aboutNavigation.map((item) => (
            <a key={item.href} href={item.href} className="about-nav-link">{item.label}</a>
          ))}
          <a href="mailto:contact@skylineholding.com" className="about-header-contact">
            Contact <ArrowUpRight size={13} strokeWidth={1.4} />
          </a>
        </nav>
        <button
          type="button"
          className="about-menu-button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="about-mobile-navigation"
          onClick={onToggle}
        >
          {menuOpen ? <X size={20} strokeWidth={1.4} /> : <Menu size={20} strokeWidth={1.4} />}
        </button>
      </div>
      <div id="about-mobile-navigation" className="about-mobile-panel" data-open={menuOpen}>
        <nav className="about-mobile-nav" aria-label="Mobile About page navigation">
          <a href="/" onClick={onClose}>Home <ArrowUpRight size={19} strokeWidth={1.2} /></a>
          {aboutNavigation.map((item) => (
            <a key={item.href} href={item.href} onClick={onClose}>{item.label} <ArrowUpRight size={19} strokeWidth={1.2} /></a>
          ))}
        </nav>
        <div className="about-mobile-footer">
          <span>A longer view of value</span>
          <a href="mailto:contact@skylineholding.com" onClick={onClose}>Start a conversation <MoveRight size={15} strokeWidth={1.2} /></a>
        </div>
      </div>
    </header>
  );
}

function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePurpose, setActivePurpose] = useState(0);

  useEffect(() => {
    document.title = 'About Skyline — Perspective for the Long Term';
    const description = 'Learn about Skyline Holding, an independent investment holding company built around long-term thinking, disciplined capital and active value creation.';
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, mobile, reduceMotion } = context.conditions as {
          desktop: boolean;
          mobile: boolean;
          reduceMotion: boolean;
        };
        const reveals = gsap.utils.toArray<HTMLElement>('.about-reveal');
        const headings = gsap.utils.toArray<HTMLElement>('.about-section-title');
        const images = gsap.utils.toArray<HTMLElement>('.about-image-drift');

        if (reduceMotion) {
          gsap.set([...reveals, ...headings, ...images], {
            autoAlpha: 1,
            clearProps: 'all',
          });
          reveals.forEach((element) => element.classList.add('is-visible'));
          return;
        }

        const markVisible = (elements: Element[]) => {
          elements.forEach((element) => element.classList.add('is-visible'));
        };

        const heroTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => markVisible(gsap.utils.toArray<HTMLElement>('.about-hero .about-reveal')),
        });
        const heroLines = gsap.utils.toArray<HTMLElement>('.about-hero-line');
        heroTimeline
          .fromTo('.about-hero-label', { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: mobile ? 0.7 : 0.85 })
          .fromTo('.about-hero-rule', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: mobile ? 0.55 : 0.7, ease: 'expo.out' }, '<0.12')
          .fromTo(heroLines, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: mobile ? 0.8 : 1, stagger: mobile ? 0.06 : 0.1, ease: 'expo.out' }, '<0.12')
          .fromTo('.about-hero-copy', { autoAlpha: 0, y: mobile ? 16 : 26 }, { autoAlpha: 1, y: 0, duration: mobile ? 0.65 : 0.85 }, '-=0.42')
          .fromTo('.about-hero-meta', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.36')
          .fromTo('.about-hero-frame', { clipPath: 'inset(0 0 14% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: desktop ? 1.25 : 0.9, ease: 'power4.out' }, 0.1);

        gsap.utils.toArray<HTMLElement>('.about-chapter').forEach((section) => {
          const sectionTitle = section.querySelector<HTMLElement>('.about-section-title');
          const sectionReveals = Array.from(section.querySelectorAll<HTMLElement>('.about-reveal')).filter(
            (element) => element !== sectionTitle && !element.classList.contains('about-principle'),
          );
          const sectionImages = Array.from(section.querySelectorAll<HTMLElement>('.about-image-reveal'));
          const rules = Array.from(section.querySelectorAll<HTMLElement>('.about-grow-rule'));
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: mobile ? 'top 90%' : 'top 82%',
              once: true,
            },
          });

          if (sectionTitle) {
            timeline.fromTo(
              sectionTitle,
              { autoAlpha: 0, y: mobile ? 18 : 28, clipPath: 'inset(0 0 100% 0)' },
              { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: desktop ? 1 : 0.78, ease: 'expo.out' },
              0,
            );
          }
          if (rules.length) {
            timeline.fromTo(rules, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: mobile ? 0.55 : 0.75, stagger: 0.08, ease: 'expo.out' }, 0.04);
          }
          if (sectionImages.length) {
            timeline.fromTo(sectionImages, { clipPath: 'inset(0 0 12% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: desktop ? 1.1 : 0.85, ease: 'power4.out' }, 0.08);
          }
          if (sectionReveals.length) {
            timeline.fromTo(
              sectionReveals,
              { autoAlpha: 0, y: mobile ? 14 : 22 },
              { autoAlpha: 1, y: 0, duration: desktop ? 0.82 : 0.68, stagger: desktop ? 0.1 : 0.06, ease: 'power3.out', onComplete: () => markVisible(sectionReveals) },
              sectionTitle ? '-=0.38' : 0,
            );
          }
          timeline.call(() => markVisible([...(sectionTitle ? [sectionTitle] : []), ...sectionReveals]), [], '>-0.01');
        });

        gsap.utils.toArray<HTMLElement>('.about-principle').forEach((principle) => {
          gsap.fromTo(
            principle,
            { autoAlpha: 0, y: mobile ? 16 : 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: mobile ? 0.68 : 0.82,
              ease: 'power3.out',
              scrollTrigger: { trigger: principle, start: mobile ? 'top 88%' : 'top 76%', once: true },
            },
          );
        });

        gsap.to(images, {
          yPercent: desktop ? -5 : -1.5,
          ease: 'none',
          scrollTrigger: { trigger: '.about-page', start: 'top top', end: 'bottom bottom', scrub: desktop ? 1.2 : 1.8 },
        });
      },
    );

    const principles = Array.from(document.querySelectorAll<HTMLElement>('[data-purpose-index]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActivePurpose(Number(visible.target.getAttribute('data-purpose-index')));
      },
      { rootMargin: '-30% 0px -46% 0px', threshold: [0.2, 0.5, 0.8] },
    );
    principles.forEach((principle) => observer.observe(principle));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | undefined;
    let handleGsapTick: ((time: number) => void) | undefined;
    if (!reduceMotion) {
      lenis = new Lenis({ autoRaf: false, lerp: 0.075, smoothWheel: true, syncTouch: false });
      const handleLenisScroll = () => ScrollTrigger.update();
      handleGsapTick = (time: number) => lenis?.raf(time * 1000);
      lenis.on('scroll', handleLenisScroll);
      gsap.ticker.add(handleGsapTick);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      media.revert();
      observer.disconnect();
      if (lenis && handleGsapTick) {
        gsap.ticker.remove(handleGsapTick);
        lenis.destroy();
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="about-page min-h-[100dvh] bg-[var(--about-ivory)] text-[var(--about-ink)]">
      <AboutHeader menuOpen={menuOpen} onToggle={() => setMenuOpen((open) => !open)} onClose={() => setMenuOpen(false)} />
      <main>
        <section className="about-hero about-chapter" aria-labelledby="about-hero-title">
          <img className="about-hero-image about-image-drift" src={heroSkyline} alt="A monumental architectural tower emerging through dawn mist" fetchPriority="high" />
          <div className="about-hero-atmosphere" aria-hidden="true" />
          <div className="about-hero-grid" aria-hidden="true" />
          <div className="about-hero-frame about-image-reveal">
            <img src={cityAtTwilight} alt="" />
            <span>Perspective / 01</span>
          </div>
          <div className="about-hero-content">
            <div className="about-hero-label about-reveal"><span className="about-hero-rule" aria-hidden="true" />About Skyline</div>
            <h1 id="about-hero-title" className="about-hero-title">
              <span className="about-hero-line">Built with perspective.</span>
              <span className="about-hero-line about-hero-line-accent">Designed for the long term.</span>
            </h1>
            <p className="about-hero-copy about-reveal">Skyline Holding is an independent investment holding company focused on building enduring value across businesses, real assets and transformative industries.</p>
            <div className="about-hero-meta about-reveal">
              <span className="about-hero-secondary">Capital. Strategy. Perspective.</span>
              <a href="#about-who" className="about-scroll-link">Scroll to continue <span><ArrowDown size={14} strokeWidth={1.2} /></span></a>
            </div>
          </div>
        </section>

        <section id="about-who" className="about-chapter about-who" aria-labelledby="about-who-title">
          <span className="about-ghost-word" aria-hidden="true">Perspective</span>
          <div className="about-container about-who-grid">
            <div className="about-who-aside about-reveal">
              <AboutLabel>Who we are</AboutLabel>
              <p>Independent capital.<br />International perspective.<br />Active value creation.</p>
            </div>
            <div className="about-who-main">
              <h2 id="about-who-title" className="about-section-title">An independent holding company built around long-term thinking, disciplined capital and active value creation.</h2>
              <div className="about-who-copy about-reveal">
                <span className="about-grow-rule" aria-hidden="true" />
                <p className="about-lead-copy">Skyline brings together investment expertise, strategic insight and an international perspective to identify opportunities, support businesses and build lasting enterprise value.</p>
                <p className="about-support-copy">We invest selectively, think beyond short-term cycles and focus on opportunities where our capital and capabilities can make a meaningful difference.</p>
              </div>
              <div className="about-who-image-wrap about-image-reveal">
                <img src={culturalStewardship} alt="Modern architectural structure beside a quiet reflecting pool" className="about-image-drift" loading="lazy" />
                <div className="about-image-caption"><span>02</span><span>Built for the long view</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about-purpose" className="about-chapter about-purpose" aria-labelledby="about-purpose-title">
          <div className="about-container about-purpose-layout">
            <div className="about-purpose-intro">
              <div className="about-purpose-sticky">
                <div className="about-reveal"><AboutLabel light>Our purpose</AboutLabel></div>
                <h2 id="about-purpose-title" className="about-section-title">To build value that extends beyond capital.</h2>
                <p className="about-reveal">We believe meaningful investment is not defined only by financial return. It is defined by the ability to strengthen businesses, create resilience, support innovation and build something that can endure.</p>
                <span className="about-purpose-index about-reveal">A longer view / 03</span>
              </div>
            </div>
            <div className="about-principles" role="list" aria-label="Skyline purpose principles">
              {purposePrinciples.map((principle, index) => (
                <article
                  key={principle.title}
                  className={`about-principle ${activePurpose === index ? 'is-active' : ''}`}
                  data-purpose-index={index}
                  role="listitem"
                  aria-current={activePurpose === index ? 'step' : undefined}
                >
                  <div className="about-principle-number">{principle.number}</div>
                  <div className="about-principle-content">
                    <span className="about-principle-line" aria-hidden="true" />
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                  <ArrowUpRight className="about-principle-arrow" size={20} strokeWidth={1.15} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about-vision" className="about-chapter about-vision" aria-labelledby="about-vision-title">
          <div className="about-vision-image about-image-reveal">
            <img src={heroSkyline} alt="Architectural horizon at blue hour" className="about-image-drift" loading="lazy" />
            <div className="about-vision-image-overlay" aria-hidden="true" />
            <span>Horizon / 04</span>
          </div>
          <div className="about-vision-panels">
            <article className="about-vision-panel about-vision-panel-light">
              <div className="about-vision-panel-inner">
                <div className="about-reveal"><AboutLabel>Our vision</AboutLabel></div>
                <h2 id="about-vision-title" className="about-section-title">To become a trusted long-term investment partner across markets, industries and generations.</h2>
                <p className="about-reveal">We aim to build a diversified international platform recognized for thoughtful capital allocation, strong partnerships and the ability to create lasting value across changing market cycles.</p>
              </div>
            </article>
            <article className="about-vision-panel about-vision-panel-dark">
              <div className="about-vision-panel-inner">
                <div className="about-reveal"><AboutLabel light>Our mission</AboutLabel></div>
                <h2 className="about-section-title">To identify opportunity, deploy capital intelligently and actively support long-term growth.</h2>
                <p className="about-reveal">We combine rigorous analysis, strategic expertise and an owner’s mindset to invest selectively and support businesses, assets and partners with conviction.</p>
                <a href="mailto:contact@skylineholding.com" className="about-vision-link about-reveal">Continue the conversation <MoveRight size={16} strokeWidth={1.2} /></a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
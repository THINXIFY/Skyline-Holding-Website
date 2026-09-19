import { useEffect, useState, type ComponentType } from "react";

import { resolvePreview } from "./previewGate";
import SkylineHomepage from "./components/mockups/SkylineHomepage";
import AboutPage from "./components/mockups/AboutPage";
import InvestmentStrategyPage from "./components/mockups/InvestmentStrategyPage";
import InvestmentOpportunitiesPage from "./components/mockups/InvestmentOpportunitiesPage";
import InvestmentSectorsPage from "./components/mockups/InvestmentSectorsPage";
import ManagementServicesPage from "./components/mockups/ManagementServicesPage";
import StrategicAdvisoryPage from "./components/mockups/StrategicAdvisoryPage";
import StrategicPartnershipsPage from "./components/mockups/StrategicPartnershipsPage";
import InvestorRelationsPage from "./components/mockups/InvestorRelationsPage";
import GovernancePage from "./components/mockups/GovernancePage";
import LeadershipPage from "./components/mockups/LeadershipPage";
import ContactPage from "./components/mockups/ContactPage";
import LegalPage from "./components/mockups/LegalPage";
import ImpressumPage from "./components/mockups/ImpressumPage";
import PrivacyPage from "./components/mockups/PrivacyPage";
import TermsPage from "./components/mockups/TermsPage";
import { initSmoothScroll } from "./components/mockups/_skyline/smoothScroll";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

// /preview/* (component canvas) is a development tool. The module map is only
// loaded in development; in production builds this is `null` and the code is
// compiled out, and App renders a plain 404 for /preview/* (see previewGate.ts).
const loadPreviewModules: (() => Promise<ModuleMap>) | null = import.meta.env.DEV
  ? () => import("./.generated/mockup-components").then((m) => m.modules as ModuleMap)
  : null;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({ componentPath }: { componentPath: string }) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const modules = await loadPreviewModules?.();
      if (cancelled) {
        return;
      }
      const loader = modules?.[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }

      try {
        const mod = await loader();
        if (cancelled) {
          return;
        }
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) {
          return;
        }

        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();

    return () => {
      cancelled = true;
    };
  }, [componentPath]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) return null;

  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function getLocalPath(): string {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  return local.replace(/\/+$/, "") || "/";
}

function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#080A0D",
        color: "#F5F2EA",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <p>404 Not Found</p>
    </main>
  );
}

const PAGE_TITLES: Record<string, string> = {
  "/": "Skyline Holding | Independent Capital, Long-Term Perspective",
  "/about": "About | Skyline Holding",
  "/investment-strategy": "Investment Strategy | Skyline Holding",
  "/investment-opportunities": "Investment Opportunities | Skyline Holding",
  "/investment-sectors": "Investment Sectors | Skyline Holding",
  "/management-services": "Management Services | Skyline Holding",
  "/strategic-advisory": "Strategic Advisory | Skyline Holding",
  "/strategic-partnerships": "Strategic Partnerships | Skyline Holding",
  "/investor-relations": "Investor Relations | Skyline Holding",
  "/governance": "Governance | Skyline Holding",
  "/leadership": "Leadership | Skyline Holding",
  "/contact": "Contact | Skyline Holding",
  "/legal": "Legal & Company Information | Skyline Holding",
  "/impressum": "Impressum | Skyline Holding",
  "/privacy": "Privacy Policy | Skyline Holding",
  "/terms": "Terms & Conditions | Skyline Holding",
};

function App() {
  useEffect(() => initSmoothScroll(), []);

  const preview = resolvePreview(getLocalPath(), import.meta.env.DEV);
  const previewPath = preview.kind === "render" ? preview.path : null;
  const notFound = preview.kind === "blocked";

  useEffect(() => {
    if (notFound) {
      document.title = "404 Not Found | Skyline Holding";
      return;
    }
    if (previewPath) return;
    document.title = PAGE_TITLES[getLocalPath()] ?? PAGE_TITLES["/"];
  }, [previewPath, notFound]);

  // Canonical / og:url follow the single production URL setting
  // (VITE_SITE_URL, taken from SITE_URL at build time). Unset in dev: skipped.
  useEffect(() => {
    const siteUrl = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? "").replace(/\/+$/, "");
    if (previewPath || notFound || !siteUrl) return;
    const url = siteUrl + getLocalPath();
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = url;
  }, [previewPath, notFound]);

  if (notFound) {
    return <NotFound />;
  }

  if (previewPath) {
    return <PreviewRenderer componentPath={previewPath} />;
  }

  if (getLocalPath() === "/about") {
    return <AboutPage />;
  }

  if (getLocalPath() === "/investment-strategy") {
    return <InvestmentStrategyPage />;
  }

  if (getLocalPath() === "/investment-opportunities") {
    return <InvestmentOpportunitiesPage />;
  }

  if (getLocalPath() === "/investment-sectors") {
    return <InvestmentSectorsPage />;
  }

  if (getLocalPath() === "/management-services") {
    return <ManagementServicesPage />;
  }

  if (getLocalPath() === "/strategic-advisory") {
    return <StrategicAdvisoryPage />;
  }

  if (getLocalPath() === "/strategic-partnerships") {
    return <StrategicPartnershipsPage />;
  }

  if (getLocalPath() === "/investor-relations") {
    return <InvestorRelationsPage />;
  }

  if (getLocalPath() === "/governance") {
    return <GovernancePage />;
  }

  if (getLocalPath() === "/leadership") {
    return <LeadershipPage />;
  }

  if (getLocalPath() === "/contact") {
    return <ContactPage />;
  }

  if (getLocalPath() === "/legal") {
    return <LegalPage />;
  }

  if (getLocalPath() === "/impressum") {
    return <ImpressumPage />;
  }

  if (getLocalPath() === "/privacy") {
    return <PrivacyPage />;
  }

  if (getLocalPath() === "/terms") {
    return <TermsPage />;
  }

  return <SkylineHomepage />;
}

export default App;

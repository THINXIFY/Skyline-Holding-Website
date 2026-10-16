import { PortfolioAccessGateway } from "./_skyline/portfolio/PortfolioAccessGateway";

/** Restricted-access gateway for the protected portfolio, routed at /portfolio-access. */
export default function PortfolioAccessPage() {
  return <PortfolioAccessGateway />;
}

/* AVENZO - Opportunity Board Management */

const DEMO_OPPORTUNITIES = [
  {
    id: 'opp-1',
    category: 'distribution',
    categoryLabel: 'Distribution Opportunity',
    title: 'Electric 3-Wheeler OEM Seeking Regional Distributors',
    company: 'AVENZO Verified Manufacturer',
    location: 'Rajasthan & Gujarat',
    segment: 'Electric 3W (Cargo & Passenger)',
    scale: '15–20 Master Dealerships',
    timeline: 'Immediate / Q2 Launch',
    description: 'Tier-1 certified OEM looking for established automobile and EV distributors with showroom infrastructure across major districts in Rajasthan and Gujarat.',
    tags: ['Distributor', '3-Wheeler', 'West India', 'High Margin'],
    posted: '2 days ago'
  },
  {
    id: 'opp-2',
    category: 'fleet',
    categoryLabel: 'Fleet Requirement',
    title: '150 Electric Cargo 3-Wheelers for Quick Commerce Fleet',
    company: 'Leading National Last-Mile Fleet Operator',
    location: 'Delhi NCR (Gurugram, Noida, Delhi)',
    segment: 'High-Volume Cargo 3W (Payload > 500kg)',
    scale: '150 Units (Initial Batch)',
    timeline: 'Delivery within 45–60 days',
    description: 'Corporate logistics operator seeking quotes and pilot deployment for 150 high-payload electric 3-wheelers with telematics and fast charging compatibility.',
    tags: ['Fleet RFP', '3-Wheeler', 'Delhi NCR', 'Bulk Order'],
    posted: '1 day ago'
  },
  {
    id: 'opp-3',
    category: 'institutional',
    categoryLabel: 'Institutional Opportunity',
    title: 'University Campus Transit & Campus EV Deployment',
    company: 'Institutional Campus Authority',
    location: 'State University, North India',
    segment: 'Electric Feeder Buses & 6-Seater Shuttles',
    scale: '25 Passenger Shuttles + Charging Hub',
    timeline: 'Next Semester Rollout (90 Days)',
    description: 'Structured institutional procurement requirement for clean internal mobility, including charging point setup and 3-year maintenance service package.',
    tags: ['Institutional', 'Electric Bus / Shuttle', 'Turnkey'],
    posted: '3 days ago'
  },
  {
    id: 'opp-4',
    category: 'partnerships',
    categoryLabel: 'Ecosystem Partnership',
    title: 'Fleet Charging Infrastructure & Depot Electrification',
    company: 'Commercial Hub Mobility Provider',
    location: 'Bengaluru & Hyderabad',
    segment: '30kW / 60kW DC Fast Chargers',
    scale: '8 Charging Hub Sites',
    timeline: 'Phase 1 within 30 days',
    description: 'Charging network developer looking for EV fleet partners and commercial real estate hubs to co-locate fast charging hubs with guaranteed utilization.',
    tags: ['Charging Infra', 'Partnership', 'Fleet Hubs'],
    posted: '4 days ago'
  },
  {
    id: 'opp-5',
    category: 'distribution',
    categoryLabel: 'Distribution Opportunity',
    title: 'Electric 2-Wheeler High-Speed Scooter Dealerships',
    company: 'Emerging EV 2W Brand',
    location: 'Maharashtra & Karnataka (Tier 2/3 Cities)',
    segment: 'High-Speed L1/L2 Electric Scooters',
    scale: '30 Dealer Franchises',
    timeline: 'Ongoing Onboarding',
    description: 'Seeking energetic entrepreneurs and existing 2-wheeler dealers with minimum 800 sq ft retail space. Attractive margins and marketing support provided.',
    tags: ['Distributor', '2-Wheeler', 'Maharashtra', 'Karnataka'],
    posted: '5 days ago'
  },
  {
    id: 'opp-6',
    category: 'fleet',
    categoryLabel: 'Fleet Requirement',
    title: 'Battery-as-a-Service (BaaS) Swapping Solution for 80 Delivery E-Bikes',
    company: 'Urban Courier Logistics',
    location: 'Mumbai Metropolitan Region',
    segment: 'Battery Swapping & Pack Leasing',
    scale: '80 EV 2-Wheelers',
    timeline: 'Within 3 weeks',
    description: 'Seeking turnkey battery swapping partner with active stations across Mumbai and Navi Mumbai for an express courier fleet.',
    tags: ['Fleet Requirement', 'Battery Swap', 'Mumbai'],
    posted: 'Just now'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const oppGrid = document.getElementById('opportunitiesGrid');
  if (!oppGrid) return;

  const tabButtons = document.querySelectorAll('.opp-tab-btn');
  const countBadge = document.getElementById('oppCountBadge');

  let currentCategory = 'all';

  function renderOpportunities() {
    const filtered = DEMO_OPPORTUNITIES.filter(item => {
      return currentCategory === 'all' || item.category === currentCategory;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Active Opportunities`;
    }

    if (filtered.length === 0) {
      oppGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <h3 style="font-size: 1.25rem; color: #0f172a; margin-bottom: 0.5rem;">No opportunities in this category</h3>
          <p style="color: #64748b; font-size: 0.9375rem; max-width: 450px; margin: 0 auto 1.5rem auto;">Post a requirement to connect directly with verified partners across India.</p>
          <a href="requirement.html" class="btn btn-primary btn-sm">Post a Requirement</a>
        </div>
      `;
      return;
    }

    oppGrid.innerHTML = filtered.map(opp => `
      <div class="opportunity-card fade-in-up visible">
        <div class="opportunity-card-top">
          <span class="opp-type-badge">${opp.categoryLabel}</span>
          <span class="opp-timestamp">${opp.posted}</span>
        </div>

        <h3 class="opp-title">${opp.title}</h3>
        <div class="opp-company" style="display: flex; align-items: center; gap: 0.4rem;">
          <i data-lucide="shield-check" style="width: 15px; height: 15px; color: #059669;"></i>
          <span>${opp.company}</span>
        </div>

        <div class="opp-details-list">
          <div>
            <div class="opp-detail-label">Location</div>
            <div class="opp-detail-val">${opp.location}</div>
          </div>
          <div>
            <div class="opp-detail-label">Segment</div>
            <div class="opp-detail-val">${opp.segment}</div>
          </div>
          <div>
            <div class="opp-detail-label">Scale / Qty</div>
            <div class="opp-detail-val">${opp.scale}</div>
          </div>
          <div>
            <div class="opp-detail-label">Timeline</div>
            <div class="opp-detail-val">${opp.timeline}</div>
          </div>
        </div>

        <p style="font-size: 0.875rem; color: #475569; line-height: 1.55; margin-bottom: 1.25rem;">
          ${opp.description}
        </p>

        <div class="opp-tags">
          ${opp.tags.map(t => `<span class="badge badge-location">${t}</span>`).join('')}
        </div>

        <div class="opp-card-action">
          <a href="requirement.html?respond_to=${encodeURIComponent(opp.title)}" class="btn btn-outline-green btn-sm w-full">
            Respond to Opportunity →
          </a>
        </div>
      </div>
    `).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.tab || 'all';
      renderOpportunities();
    });
  });

  renderOpportunities();
});

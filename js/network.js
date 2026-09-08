/* AVENZO - Network Directory Management */

const DEMO_BUSINESSES = [
  {
    id: 'biz-1',
    name: 'VoltCraft Motors',
    type: 'Manufacturer',
    typeKey: 'manufacturers',
    location: 'Delhi NCR & Pune',
    category: 'Electric 3-Wheelers & Small CVs',
    tags: ['E-Cargo', 'L5 Auto', 'Commercial Fleets'],
    verified: true,
    description: 'High-payload electric 3-wheelers engineered for urban last-mile delivery and e-commerce logistics.',
    capacity: '1,200 units/mo'
  },
  {
    id: 'biz-2',
    name: 'GreenRoute EV Distribution',
    type: 'Distributor',
    typeKey: 'distributors',
    location: 'Jaipur, Rajasthan',
    category: 'Commercial 3W & 2W Network',
    tags: ['Dealer Network', 'Rajasthan', 'Tier 2/3 Expansion'],
    verified: true,
    description: 'Regional distributor with 42 dealer touchpoints across Rajasthan seeking verified OEM partnerships.',
    capacity: '42 Dealer Outlets'
  },
  {
    id: 'biz-3',
    name: 'FleetGrid Logistics',
    type: 'Fleet',
    typeKey: 'fleets',
    location: 'Bengaluru & Hyderabad',
    category: 'B2B Last-Mile Fleet Operator',
    tags: ['Fleet Operator', '100% EV', 'Hub & Spoke'],
    verified: true,
    description: 'Operating 450+ electric commercial vehicles for tier-1 quick commerce and e-commerce companies.',
    capacity: '450+ Active EVs'
  },
  {
    id: 'biz-4',
    name: 'Apex Charge Infra',
    type: 'Charging',
    typeKey: 'charging',
    location: 'Mumbai & Ahmedabad',
    category: 'Commercial Hub Fast Charging',
    tags: ['DC Fast Charging', 'Fleet Hubs', 'CMS Software'],
    verified: true,
    description: 'Turnkey fleet charging infrastructure, depot fast-chargers (30kW–120kW) and dynamic power management.',
    capacity: '60+ Charging Hubs'
  },
  {
    id: 'biz-5',
    name: 'EcoCapital Finance Partners',
    type: 'Finance',
    typeKey: 'finance',
    location: 'PAN-India',
    category: 'Commercial EV NBFC & Leasing',
    tags: ['Asset Leasing', 'Subvented Loans', 'Battery Financing'],
    verified: true,
    description: 'Structured lease financing and priority debt capital for EV commercial fleet operators and distributors.',
    capacity: 'INR 150 Cr+ Facility'
  },
  {
    id: 'biz-6',
    name: 'National Clean Mobility Trust',
    type: 'Institution',
    typeKey: 'institutions',
    location: 'New Delhi & PAN-India',
    category: 'Public Transport & Campus Fleets',
    tags: ['Institutional Mandate', 'Tenders', 'Zero Emission'],
    verified: true,
    description: 'Coordinating institutional EV procurement programs for universities, medical campuses and PSU facilities.',
    capacity: 'Institutional Buyer'
  },
  {
    id: 'biz-7',
    name: 'NeoDrive Powertrain Technologies',
    type: 'Services',
    typeKey: 'services',
    location: 'Chennai & Coimbatore',
    category: 'BLDC Motors, Controllers & BMS',
    tags: ['Components', 'Indigenous R&D', 'AIS-156 Tested'],
    verified: true,
    description: 'Tier-1 component supplier delivering high-efficiency PMSM motors, MCU controllers and smart telematics.',
    capacity: 'OEM Tier-1 Supplier'
  },
  {
    id: 'biz-8',
    name: 'ServiVolt EV Care Network',
    type: 'Services',
    typeKey: 'services',
    location: 'North & West India',
    category: 'After-Sales & Warranty Support',
    tags: ['AMC Service', 'Mobile Repair', 'Spare Parts Logistics'],
    verified: true,
    description: 'PAN-India after-sales maintenance, doorstep fleet servicing and centralized spare parts fulfillment.',
    capacity: '120+ Service Bays'
  },
  {
    id: 'biz-9',
    name: 'IndoCharge Utilities',
    type: 'Distributor',
    typeKey: 'distributors',
    location: 'Lucknow & Varanasi, UP',
    category: 'E-Rickshaw & E-Cart Dealerships',
    tags: ['Uttar Pradesh', 'Rural Mobility', 'Battery Swap'],
    verified: false,
    description: 'Major regional distributor network covering eastern UP corridors for passenger and cargo electric 3-wheelers.',
    capacity: '28 Outlets in UP'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const directoryContainer = document.getElementById('directoryGrid');
  if (!directoryContainer) return;

  const searchInput = document.getElementById('directorySearch');
  const filterPills = document.querySelectorAll('.filter-pill');
  const countBadge = document.getElementById('directoryCount');

  let currentCategory = 'all';
  let searchQuery = '';

  function renderDirectory() {
    const filtered = DEMO_BUSINESSES.filter(item => {
      const matchesCategory = (currentCategory === 'all') || (item.typeKey === currentCategory);
      const textToSearch = `${item.name} ${item.type} ${item.location} ${item.category} ${item.tags.join(' ')} ${item.description}`.toLowerCase();
      const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Businesses Listed`;
    }

    if (filtered.length === 0) {
      directoryContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <i data-lucide="search-x" style="width: 48px; height: 48px; color: #94a3b8; margin: 0 auto 1rem auto;"></i>
          <h3 style="font-size: 1.25rem; color: #0f172a; margin-bottom: 0.5rem;">No matching businesses found</h3>
          <p style="color: #64748b; font-size: 0.9375rem; max-width: 450px; margin: 0 auto 1.5rem auto;">Try adjusting your search query or filter tags to discover more EV ecosystem participants.</p>
          <button class="btn btn-outline-green btn-sm" id="resetFiltersBtn">Reset Filters</button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          filterPills.forEach(p => p.classList.toggle('active', p.dataset.filter === 'all'));
          renderDirectory();
        });
      }
      return;
    }

    directoryContainer.innerHTML = filtered.map(item => `
      <div class="directory-card fade-in-up visible">
        <div class="directory-card-header">
          <div style="display: flex; gap: 0.875rem; align-items: center;">
            <div class="directory-avatar">
              ${item.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 class="directory-biz-name">${item.name}</h3>
              <div class="directory-biz-type">${item.type}</div>
            </div>
          </div>
          ${item.verified ? `
            <span class="badge badge-verified" title="AVENZO Verified Business Profile">
              <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> Verified
            </span>
          ` : `
            <span class="badge" style="background: #f1f5f9; color: #64748b;">
              <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Onboarding
            </span>
          `}
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: #64748b; margin-bottom: 0.75rem;">
          <i data-lucide="map-pin" style="width: 14px; height: 14px; color: #10b981;"></i>
          <span>${item.location}</span>
          <span style="color: #cbd5e1;">•</span>
          <i data-lucide="layers" style="width: 14px; height: 14px; color: #10b981;"></i>
          <span>${item.category}</span>
        </div>

        <p class="directory-desc">${item.description}</p>

        <div class="directory-tags">
          ${item.tags.map(tag => `<span class="badge badge-location">${tag}</span>`).join('')}
        </div>

        <div class="directory-card-footer">
          <div style="font-size: 0.775rem; color: #64748b;">
            Scale: <strong style="color: #0f172a;">${item.capacity}</strong>
          </div>
          <a href="requirement.html?connect_to=${encodeURIComponent(item.name)}" class="btn btn-primary btn-sm">
            Connect
          </a>
        </div>
      </div>
    `).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Filter pills click handling
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.filter || 'all';
      renderDirectory();
    });
  });

  // Search input handling
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderDirectory();
    });
  }

  renderDirectory();
});

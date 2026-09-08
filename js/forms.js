/* AVENZO - Form Validation & Dynamic Google Form Prefill Engine */

document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on join.html or requirement.html
  const joinForm = document.getElementById('joinAvenzoForm');
  const requirementForm = document.getElementById('postRequirementForm');

  if (joinForm) {
    initMultiStepForm({
      formEl: joinForm,
      totalSteps: 3,
      googleFormBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfHF-h9pqAfzK4fCGj5P7t11_akGUJWrm1Rvbo91m8VhPSbIQ/viewform',
      fieldMapping: {
        orgType: 'entry.2005620554',
        companyName: 'entry.1045781291',
        contactPerson: 'entry.1065046570',
        businessEmail: 'entry.1166974658',
        phoneWhatsApp: 'entry.839337160',
        location: 'entry.1151087744',
        businessDesc: 'entry.297274508',
        evCategories: 'entry.2070845154', // multi-checkbox
        goals: 'entry.1701197956',
        additionalInfo: 'entry.1878894178'
      },
      loadingTitle: 'Preparing your AVENZO Registration...',
      loadingNotice: "You're almost there. We've prepared your registration details. Review your information and click submit in the new tab to complete your registration."
    });
  }

  if (requirementForm) {
    // Check for URL query params (e.g. ?respond_to=... or ?connect_to=...)
    const urlParams = new URLSearchParams(window.location.search);
    const respondTo = urlParams.get('respond_to');
    const connectTo = urlParams.get('connect_to');

    if (respondTo) {
      const descInput = document.getElementById('reqDesc');
      const offeringInput = document.getElementById('offering');
      if (offeringInput) offeringInput.value = `Response to: ${respondTo}`;
      if (descInput) descInput.value = `We are interested in collaborating on this opportunity: "${respondTo}".`;
    } else if (connectTo) {
      const offeringInput = document.getElementById('offering');
      const descInput = document.getElementById('reqDesc');
      if (offeringInput) offeringInput.value = `Partnership enquiry for ${connectTo}`;
      if (descInput) descInput.value = `We would like to connect with ${connectTo} through the AVENZO network.`;
    }

    initMultiStepForm({
      formEl: requirementForm,
      totalSteps: 3,
      googleFormBaseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfY6bhNKXewom9cackpbbeqzEyJLhz6lSb9JYcDWu-zpNNNpA/viewform',
      fieldMapping: {
        reqType: 'entry.2005620554',
        companyName: 'entry.1045781291',
        contactPerson: 'entry.1065046570',
        preferredContact: 'entry.1166974658',
        offering: 'entry.839337160',
        reqDesc: 'entry.837686301',
        quantityScale: 'entry.795935000',
        location: 'entry.482296533',
        timeline: 'entry.764885568',
        additionalInfo: 'entry.1183260830'
      },
      loadingTitle: 'Preparing your Business Requirement...',
      loadingNotice: "We've formatted your business requirement. Review and submit the official form in the opened tab to activate network matching."
    });
  }

  // Handle custom checkbox UI state toggle
  document.querySelectorAll('.custom-checkbox-label input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const label = e.target.closest('.custom-checkbox-label');
      if (label) {
        label.classList.toggle('checked', e.target.checked);
      }
    });
  });
});

function initMultiStepForm(config) {
  const { formEl, totalSteps, googleFormBaseUrl, fieldMapping, loadingTitle, loadingNotice } = config;
  let currentStep = 1;

  const stepPanes = formEl.querySelectorAll('.form-step-pane');
  const progressNodes = document.querySelectorAll('.progress-step-node');
  const progressFill = document.querySelector('.form-progress-fill');
  const modalOverlay = document.getElementById('submissionModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalNotice = document.getElementById('modalNoticeText');
  const modalDirectLink = document.getElementById('modalDirectLink');

  function updateProgressUI() {
    stepPanes.forEach(pane => {
      const stepIndex = parseInt(pane.dataset.step, 10);
      pane.classList.toggle('active', stepIndex === currentStep);
    });

    progressNodes.forEach(node => {
      const nodeStep = parseInt(node.dataset.step, 10);
      node.classList.toggle('active', nodeStep === currentStep);
      node.classList.toggle('completed', nodeStep < currentStep);
    });

    if (progressFill) {
      const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    // Scroll to top of form smoothly on step change
    formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function validateStep(stepNumber) {
    const currentPane = formEl.querySelector(`.form-step-pane[data-step="${stepNumber}"]`);
    if (!currentPane) return true;

    let isValid = true;
    const requiredInputs = currentPane.querySelectorAll('[data-required="true"]');

    requiredInputs.forEach(input => {
      const formGroup = input.closest('.form-group');
      const val = input.value.trim();
      let fieldValid = true;
      let customError = '';

      if (!val) {
        fieldValid = false;
        customError = input.dataset.emptyMsg || 'This field is required.';
      } else if (input.type === 'email' || input.name === 'businessEmail' || input.name === 'preferredContact' && val.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          fieldValid = false;
          customError = 'Please enter a valid business email address.';
        }
      } else if (input.name === 'phoneWhatsApp') {
        const cleanPhone = val.replace(/[\s\-\+\(\)]/g, '');
        if (cleanPhone.length < 8) {
          fieldValid = false;
          customError = 'Please enter a valid phone or WhatsApp number.';
        }
      }

      if (!fieldValid) {
        isValid = false;
        if (formGroup) {
          formGroup.classList.add('has-error');
          const errorSpan = formGroup.querySelector('.field-error-msg span');
          if (errorSpan && customError) {
            errorSpan.textContent = customError;
          }
        }
      } else {
        if (formGroup) {
          formGroup.classList.remove('has-error');
        }
      }
    });

    return isValid;
  }

  // Clear errors on input
  formEl.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });

  // Next / Continue button clicks
  formEl.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          currentStep++;
          updateProgressUI();
        }
      }
    });
  });

  // Back button clicks
  formEl.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateProgressUI();
      }
    });
  });

  // Form Submission
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    // Build Prefilled Google Form URL dynamically
    const params = new URLSearchParams();
    const formData = new FormData(formEl);

    // Process all standard and mapped fields
    for (const [key, entryId] of Object.entries(fieldMapping)) {
      if (key === 'evCategories') {
        // Multi-select checkboxes
        const selectedCategories = formEl.querySelectorAll('input[name="evCategories"]:checked');
        selectedCategories.forEach(cb => {
          params.append(entryId, cb.value);
        });
      } else {
        const val = formData.get(key);
        if (val !== null && val !== undefined && val.trim() !== '') {
          params.set(entryId, val.trim());
        }
      }
    }

    // Add usp=pp_url parameter which Google Forms uses for prefilled URLs
    params.set('usp', 'pp_url');

    const finalGoogleFormUrl = `${googleFormBaseUrl}?${params.toString()}`;

    // Show loading modal
    if (modalOverlay) {
      if (modalTitle) modalTitle.textContent = loadingTitle;
      if (modalNotice) modalNotice.textContent = loadingNotice;
      if (modalDirectLink) modalDirectLink.href = finalGoogleFormUrl;
      modalOverlay.classList.add('open');
    }

    // Open prefilled Google Form in new tab
    setTimeout(() => {
      window.open(finalGoogleFormUrl, '_blank');
    }, 600);
  });

  // Modal close / acknowledge
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }
}

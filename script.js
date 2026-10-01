const m=document.querySelector('.menu'),n=document.querySelector('.nav');if(m&&n){m.addEventListener('click',()=>{const o=n.classList.toggle('open');m.setAttribute('aria-expanded',String(o))});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')))}const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

// === KEYPROX FLOATING INQUIRY + WHATSAPP ===
(() => {
  if (document.getElementById('kpxInquiryLauncher')) return;

  const phone = '12897884242';
  const path = window.location.pathname.toLowerCase();
  let defaultService = 'Car Key / General Inquiry';
  if (path.includes('all-keys-lost')) defaultService = 'All Keys Lost';
  else if (path.includes('car-key-replacement')) defaultService = 'Replacement / Spare Key';
  else if (path.includes('key-programming')) defaultService = 'Key Programming';
  else if (path.includes('remote-starters')) defaultService = 'Remote Starter';
  else if (path.includes('module-programming')) defaultService = 'Module Programming / Coding';
  else if (path.includes('german-car-keys')) defaultService = 'German Vehicle Key Service';

  const stack = document.createElement('div');
  stack.className = 'kpx-float-stack';
  stack.innerHTML = `
    <button class="kpx-float-btn kpx-inquiry-launcher" id="kpxInquiryLauncher" type="button"
      aria-haspopup="dialog" aria-controls="kpxInquiryPanel" aria-expanded="false">
      <span class="kpx-float-icon" aria-hidden="true">🚗</span>
      <span class="kpx-float-label">Quick Inquiry</span>
    </button>

    <a class="kpx-float-btn kpx-whatsapp"
      href="https://wa.me/${phone}?text=${encodeURIComponent('Hi KeyProX, I need help with my vehicle.')}"
      target="_blank" rel="noopener noreferrer" aria-label="Chat with KeyProX on WhatsApp">
      <span class="kpx-float-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false">
          <path fill="currentColor" d="M16 3.2A12.8 12.8 0 0 0 5.1 22.7L3.3 29l6.5-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2a10.3 10.3 0 0 1-5.3-1.5l-.4-.2-3.8 1 1-3.7-.2-.4A10.3 10.3 0 1 1 16 26.4Zm5.7-7.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.8-.9-3-1.7-4.2-3.8-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.3Z"/>
        </svg>
      </span>
      <span class="kpx-float-label">WhatsApp</span>
    </a>
  `;
  document.body.appendChild(stack);

  const backdrop = document.createElement('div');
  backdrop.className = 'kpx-backdrop';
  backdrop.id = 'kpxInquiryBackdrop';
  backdrop.hidden = true;

  const panel = document.createElement('section');
  panel.className = 'kpx-inquiry-panel';
  panel.id = 'kpxInquiryPanel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-modal','true');
  panel.setAttribute('aria-labelledby','kpxInquiryTitle');
  panel.hidden = true;
  panel.innerHTML = `
    <div class="kpx-inquiry-head">
      <div>
        <small>KEYPROX QUICK INQUIRY</small>
        <h2 id="kpxInquiryTitle">How can we help?</h2>
        <p>Enter your vehicle details and send them directly to KeyProX on WhatsApp.</p>
      </div>
      <button class="kpx-close" id="kpxInquiryClose" type="button" aria-label="Close inquiry form">×</button>
    </div>

    <form class="kpx-inquiry-form" id="kpxInquiryForm">
      <div class="kpx-two">
        <label><span>Year *</span><input name="year" type="number" min="1900" max="2100" inputmode="numeric" placeholder="2021" required></label>
        <label><span>Make *</span><input name="make" placeholder="BMW" required></label>
      </div>
      <label><span>Model *</span><input name="model" placeholder="X5" required></label>
      <label><span>Postal Code *</span><input name="postal" placeholder="L5M 0A1" autocomplete="postal-code" required></label>
      <label><span>Service *</span>
        <select name="service" id="kpxService" required>
          <option>Car Key / General Inquiry</option>
          <option>All Keys Lost</option>
          <option>Replacement / Spare Key</option>
          <option>Key Fob / Smart Key</option>
          <option>Key Programming</option>
          <option>German Vehicle Key Service</option>
          <option>Remote Starter</option>
          <option>Module Programming / Coding</option>
          <option>Diagnostics / Other</option>
        </select>
      </label>
      <label><span>Do you have a working key?</span>
        <select name="workingKey">
          <option>Yes</option>
          <option>No - all keys lost</option>
          <option>Not sure</option>
        </select>
      </label>
      <label><span>Extra Details</span><textarea name="details" placeholder="Tell us what happened or what you need."></textarea></label>
      <button class="kpx-inquiry-submit" type="submit"><span aria-hidden="true">💬</span> Send Inquiry on WhatsApp</button>
      <p class="kpx-inquiry-note">No full street address is required. For an appointment at our service location, call first.</p>
    </form>
  `;
  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  const launcher = document.getElementById('kpxInquiryLauncher');
  const closeBtn = document.getElementById('kpxInquiryClose');
  const form = document.getElementById('kpxInquiryForm');
  const service = document.getElementById('kpxService');

  [...service.options].forEach((opt,i) => {
    if (opt.text === defaultService) service.selectedIndex = i;
  });

  const openPanel = () => {
    panel.hidden = false;
    backdrop.hidden = false;
    document.body.classList.add('kpx-modal-open');
    launcher.setAttribute('aria-expanded','true');
    setTimeout(() => panel.querySelector('input')?.focus(), 30);
  };
  const closePanel = () => {
    panel.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove('kpx-modal-open');
    launcher.setAttribute('aria-expanded','false');
    launcher.focus();
  };

  launcher.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) closePanel();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const message = [
      'Hi KeyProX, I would like a quote / service inquiry.',
      '',
      'Vehicle: ' + data.get('year') + ' ' + data.get('make') + ' ' + data.get('model'),
      'Postal Code: ' + data.get('postal'),
      'Service: ' + data.get('service'),
      'Working Key: ' + data.get('workingKey'),
      'Details: ' + (data.get('details') || 'None provided'),
      '',
      'Please let me know availability and next steps.'
    ].join('\n');

    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
})();


// === KEYPROX LOGO BRANDING ===
(() => {
  const isSubpage = window.location.pathname.split('/').filter(Boolean).length > 1;
  const logoSrc = isSubpage ? '../keyprox-logo.webp' : 'keyprox-logo.webp';

  document.querySelectorAll('.brand').forEach(brand => {
    brand.innerHTML = '<img class="brand-logo-img" src="' + logoSrc + '" alt="KeyProX Automotive Keys & Remotes">';
  });

  const footerFirst = document.querySelector('.footer-inner > div:first-child');
  if (footerFirst && !footerFirst.querySelector('.footer-logo-img')) {
    footerFirst.innerHTML =
      '<img class="footer-logo-img" src="' + logoSrc + '" alt="KeyProX Automotive Keys & Remotes">' +
      '<small>Automotive keys • programming • remote starters</small>';
  }
})();

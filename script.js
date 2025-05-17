// add classes for mobile navigation toggling
const CSbody = document.body;
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
// Accessibility Menu Toggle - clean and conflict-free
function toggleAccessibilityMenu() {
  const accessibilityMenu = document.getElementById('accessibility-menu');
  const accessibilityOptions = document.getElementById('accessibility-options');

  if (accessibilityMenu && accessibilityOptions) {
    accessibilityOptions.classList.toggle('active');
    const isActive = accessibilityOptions.classList.contains('active');
    accessibilityMenu.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    saveAccessibilityPreference('accessibility-menu', isActive ? 'active' : 'inactive');
  }
}

// Accessibility and preferences
document.addEventListener('DOMContentLoaded', () => {
  const accToggle = document.querySelector('.cs-accessibility-toggle');
  if (accToggle) accToggle.addEventListener('click', toggleAccessibilityMenu);
  loadAccessibilityPreferences();

  // Mobile menu toggle
  if (CShamburgerMenu && CSnavbarMenu && CSbody) {
    CShamburgerMenu.addEventListener('click', function() {
      CShamburgerMenu.classList.toggle("cs-active");
      CSnavbarMenu.classList.toggle("cs-active");
      CSbody.classList.toggle("cs-open");
      // run the function to check the aria-expanded value
      ariaExpanded();
    });
  }
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    if (!csUL) return;
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll 
// animations with the navbar
document.addEventListener('scroll', (e) => { 
    const scroll = document.documentElement.scrollTop;
    if (scroll >= 100) {
        document.querySelector('body').classList.add('scroll');
    } else {
        document.querySelector('body').classList.remove('scroll');
    }
});

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
    const onClick = () => {
        item.classList.toggle('cs-active');
    };
    item.addEventListener('click', onClick);
}

// FAQ Toggle Functionality with Smooth Transition
const faqItems = document.querySelectorAll('.cs-faq-item');
faqItems.forEach(item => {
    const button = item.querySelector('.cs-button');
    const content = item.querySelector('.cs-item-p');
    if (button && content) {
      button.addEventListener('click', function() {
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      });
    }
});

// (Removed duplicate DOMContentLoaded accessibility toggle binding)


function loadAccessibilityPreferences() {
    const fontSize = localStorage.getItem('font-size');
    const highContrast = localStorage.getItem('high-contrast');
    const accessibilityMenuStatus = localStorage.getItem('accessibility-menu');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    const content = document.getElementById('main-content');

    if (fontSize && content) {
      content.classList.add(`font-${fontSize}`);
    }
    if (highContrast === 'enabled') document.body.classList.add('high-contrast');
    const fontStyle = localStorage.getItem('font-style');
    if (fontStyle === 'readable') {
      document.body.classList.add('readable-font');
    }
    if (accessibilityMenuStatus === 'active' && accessibilityMenu) {
        accessibilityMenu.classList.add('active');
    }
    const hcBtn = document.querySelector('.cs-contrast');
    if (hcBtn) hcBtn.setAttribute('aria-pressed', highContrast === 'enabled');
    const fontBtn = document.querySelector('.cs-font');
    if (fontBtn) fontBtn.setAttribute('aria-pressed', fontStyle === 'readable');
}

function saveAccessibilityPreference(key, value) {
    localStorage.setItem(key, value);
}


function setContentFontSize(size) {
  const content = document.getElementById('main-content');
  
  if (content) {
    content.classList.remove('font-small', 'font-medium', 'font-large');
    content.classList.add(`font-${size}`);
  }
  saveAccessibilityPreference('font-size', size);
}

// Ensure the buttons and navigation are unaffected by font resizing
document.querySelectorAll('#cs-navigation, #accessibility-menu, button, .cs-button, .cs-signin-button, .cs-button-accent').forEach(element => {
  element.style.fontSize = "";
});

function resetTextSize() {
  setContentFontSize('medium');
}

// Text size control functions
function increaseTextSize() {
  setContentFontSize('large');
}

function decreaseTextSize() {
  setContentFontSize('small');
}

// High contrast toggle function
function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
  saveAccessibilityPreference(
    'high-contrast',
    document.body.classList.contains('high-contrast') ? 'enabled' : 'disabled'
  );
  // Update ARIA-pressed for button
  const hcBtn = document.querySelector('.cs-contrast');
  if (hcBtn) hcBtn.setAttribute('aria-pressed', document.body.classList.contains('high-contrast'));
  
  // Apply filter to video in high-contrast mode
  const video = document.querySelector('#hero-229 .cs-picture video');
  if (video) {
    if (document.body.classList.contains('high-contrast')) {
      video.style.filter = 'brightness(0.7) contrast(1.5)';
    } else {
      video.style.filter = '';
    }
  }
}

// Font style toggle function
function toggleFontStyle() {
  const isOn = document.body.classList.toggle('readable-font');
  saveAccessibilityPreference(
    'font-style',
    isOn ? 'readable' : 'default'
  );
  // Update ARIA-pressed for button
  const fontBtn = document.querySelector('.cs-font');
  if (fontBtn) fontBtn.setAttribute('aria-pressed', document.body.classList.contains('readable-font'));
}

document.addEventListener('DOMContentLoaded', () => {
  // Restore saved preferences
  loadAccessibilityPreferences();

  // Bind toggles
  const hcBtn    = document.querySelector('.cs-contrast');
  const fontBtn  = document.querySelector('.cs-font');
  const accBtn   = document.querySelector('.cs-accessibility-toggle');
  const btnLarge  = document.querySelector('.cs-text-size[data-size="large"]');
  const btnMedium = document.querySelector('.cs-text-size[data-size="medium"]');
  const btnSmall  = document.querySelector('.cs-text-size[data-size="small"]');
  const skipLink  = document.querySelector('.skip-link');

  if (hcBtn)   hcBtn.addEventListener('click', toggleHighContrast);
  if (fontBtn) fontBtn.addEventListener('click', toggleFontStyle);
  if (accBtn)   accBtn.addEventListener('click', toggleAccessibilityMenu);
  if (btnLarge)  btnLarge.addEventListener('click', () => setContentFontSize('large'));
  if (btnMedium) btnMedium.addEventListener('click', () => setContentFontSize('medium'));
  if (btnSmall)  btnSmall.addEventListener('click', () => setContentFontSize('small'));
  if (skipLink)  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#main-content')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Lightbox functionality
  const galleryImages = Array.from(document.querySelectorAll('#gallery-45 .cs-picture img'));
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImage = document.getElementById('lightbox-image');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = galleryImages[index].src;
    overlay.classList.add('active');
  }
  function closeLightbox() {
    overlay.classList.remove('active');
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentIndex].src;
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentIndex].src;
  }

  galleryImages.forEach((img, i) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(i));
  });
  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (btnPrev) btnPrev.addEventListener('click', showPrev);
  if (btnNext) btnNext.addEventListener('click', showNext);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape') closeLightbox();
  });
});
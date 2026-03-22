document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Sticky Header Logic
  // ==========================================
  const header = document.getElementById('main-header');
  const heroSection = document.getElementById('hero-section');
  
  // Implementation of "appear when scrolling beyond first fold, disappear when scrolling up"
  // Here we'll configure it so it becomes sticky after scrolling past the hero section.
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // The "Fold" can be approximated to window.innerHeight or heroSection height.
    const foldHeight = heroSection ? heroSection.offsetHeight : 500;

    if (currentScrollY > foldHeight) {
      // Scrolled past the first fold
      header.classList.add('is-sticky');
    } else {
      // Above the fold - ensure sticky class is removed so it sits in its absolute top position
      header.classList.remove('is-sticky');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
    });
  }

  // ==========================================
  // 2. Carousel with Image Zoom Logic
  // ==========================================
  const mainImg = document.getElementById('main-img');
  const thumbs = document.querySelectorAll('.thumb');
  const zoomLens = document.getElementById('zoom-lens');
  const zoomPreview = document.getElementById('zoom-preview');
  const carouselMain = document.getElementById('carousel-main');

  // Change Image on Thumbnail Click
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // Update active class
      document.querySelector('.thumb.active').classList.remove('active');
      thumb.classList.add('active');
      
      // Update main image src
      const newSrc = thumb.src.replace('&w=150', '&w=800'); // Ensure we fetch higher res version
      mainImg.src = newSrc;
    });
  });

    // Zoom Effect Logic
  const zoomFactor = 2; // How much to zoom in

  carouselMain.addEventListener('mouseenter', () => {
    const highResBuffer = mainImg.src.replace('&w=800', '&w=1600'); 
    zoomPreview.style.backgroundImage = `url('${highResBuffer}')`;
    
    // Get actual rendered dimensions
    const rect = mainImg.getBoundingClientRect();
    zoomPreview.style.backgroundSize = `${rect.width * zoomFactor}px ${rect.height * zoomFactor}px`;
  });

  carouselMain.addEventListener('mousemove', (e) => {
    // Get mouse position relative to image container
    const rect = mainImg.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Lens dimensions
    const lensWidth = zoomLens.offsetWidth || 150;
    const lensHeight = zoomLens.offsetHeight || 150;

    // Prevent lens from getting positioned outside image bounds
    if (x > rect.width - lensWidth / 2) x = rect.width - lensWidth / 2;
    if (x < lensWidth / 2) x = lensWidth / 2;
    if (y > rect.height - lensHeight / 2) y = rect.height - lensHeight / 2;
    if (y < lensHeight / 2) y = lensHeight / 2;

    // Position the lens
    zoomLens.style.left = `${x - lensWidth / 2}px`;
    zoomLens.style.top = `${y - lensHeight / 2}px`;

    // Position the background preview
    const ratioX = (x - lensWidth / 2) / (rect.width - lensWidth);
    const ratioY = (y - lensHeight / 2) / (rect.height - lensHeight);

    // Calculate max background position
    const maxBackX = (rect.width * zoomFactor) - zoomPreview.offsetWidth;
    const maxBackY = (rect.height * zoomFactor) - zoomPreview.offsetHeight;

    zoomPreview.style.backgroundPosition = `-${ratioX * maxBackX}px -${ratioY * maxBackY}px`;
  });

  // ==========================================
  // 3. Accordion Logic (FAQ Section)
  // ==========================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Close all other accordions
      accordionHeaders.forEach(otherHeader => {
        otherHeader.setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current accordion
      header.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // ==========================================
  // 4. Tabs Logic (Manufacturing Process)
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active classes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Add active class to clicked button and corresponding pane
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
});

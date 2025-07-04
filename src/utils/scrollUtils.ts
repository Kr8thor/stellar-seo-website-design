/**
 * Smooth scroll utilities for anchor links
 */

export const scrollToElement = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const yOffset = -offset;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const handleAnchorClick = (href: string, e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  // Handle different anchor formats
  if (href.startsWith('#')) {
    const elementId = href.substring(1);
    if (elementId === 'top') {
      scrollToTop();
    } else {
      scrollToElement(elementId);
    }
  } else if (href.includes('#')) {
    const [path, anchor] = href.split('#');
    if (window.location.pathname === path || path === '') {
      if (anchor === 'top') {
        scrollToTop();
      } else {
        scrollToElement(anchor);
      }
    } else {
      // Navigate to the page first, then scroll
      window.location.href = href;
    }
  }
};

/**
 * راست‌نویس (RTL Fixer) - Core Content Script
 * Optimized for LLM streams and modern web applications.
 */

const PERSIAN_FONT_STACK = "'Vazirmatn', 'Vazir', 'Tahoma', -apple-system, sans-serif";

// 1. Inject baseline CSS overrides safely without breaking global layouts
const styleElement = document.createElement('style');
styleElement.textContent = `
  body, input, textarea, [contenteditable="true"] {
    font-family: ${PERSIAN_FONT_STACK};
  }
  /* Strict protection for code containers, text syntax, and KaTeX formulas */
  pre, code, pre *, code *, [class*="code"], .code-block, .katex, .katex *, svg {
    direction: ltr !important;
    text-align: left !important;
    font-family: 'Consolas', 'Courier New', monospace !important;
  }
`;
document.head.appendChild(styleElement);

// Helper function to detect if a text block naturally starts with RTL characters
function targetRequiresRTL(text) {
  const rtlRegex = /^[\s\d\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text.trim());
}

// 2. Dynamic Stylist: Evaluates text blocks and applies isolated direction rules
function evaluateAndStyleElement(el) {
  if (el.closest('pre') || el.closest('code') || el.closest('.katex')) return;

  const contentText = el.innerText || "";
  if (contentText.trim().length > 0) {
    if (targetRequiresRTL(contentText)) {
      el.style.setProperty("direction", "rtl", "important");
      el.style.setProperty("text-align", "right", "important");
    } else {
      el.style.setProperty("direction", "ltr", "important");
      el.style.setProperty("text-align", "left", "important");
    }
  }
}

// 3. MutationObserver: High-performance real-time tracking for streaming tokens
const DOMObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // Handle live character updates (essential for streaming LLM outputs)
    if (mutation.type === 'characterData') {
      const parent = mutation.target.parentElement;
      if (parent) {
        const textBlock = parent.closest('p, li, h1, h2, h3, h4, h5, h6, [role="presentation"]');
        if (textBlock) evaluateAndStyleElement(textBlock);
      }
    } 
    // Handle newly injected structural nodes
    else if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches('textarea, [contenteditable="true"]')) {
            node.setAttribute('dir', 'auto');
            return;
          }
          const textBlocks = node.querySelectorAll?.('p, li, h1, h2, h3, h4, [role="presentation"]') || [];
          textBlocks.forEach(evaluateAndStyleElement);
          if (node.matches?.('p, li, h1, h2, h3, h4, [role="presentation"]')) {
            evaluateAndStyleElement(node);
          }
        }
      });
    }
  }
});

DOMObserver.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
});

// 4. Context Menu Bridge: Manual override handler
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "FORCE_RTL_SELECTION") {
    const selection = window.getSelection();
    let executionTarget = null;

    if (selection.rangeCount > 0 && selection.toString().trim().length > 0) {
      executionTarget = selection.getRangeAt(0).commonAncestorContainer;
      if (executionTarget.nodeType === 3) executionTarget = executionTarget.parentElement;
    } else if (document.activeElement) {
      executionTarget = document.activeElement;
    }

    if (executionTarget) {
      executionTarget.style.setProperty("direction", "rtl", "important");
      executionTarget.style.setProperty("text-align", "right", "important");
      executionTarget.style.setProperty("font-family", PERSIAN_FONT_STACK, "important");
    }
  }
});
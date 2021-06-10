(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /*
  Just draw a border round the document.body.
  */
  document.body.style.border = "5px solid orange";
  console.log('loaded extension file');
})();

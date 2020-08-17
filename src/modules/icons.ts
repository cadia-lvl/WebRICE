/**
 * AN abstract Icon class containing the base of what every Icon should have
 */
export abstract class Icon {
  readonly ID: string;
  svg: SVGSVGElement;
  classes = '';
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    this.ID = id;

    if (classlist) this.classes = classlist;

    this.svg = this.createSvg();
  }

  /**
   * Getter for Icon id
   * @return {string} - returns Icon id
   */
  get id(): string {
    return this.ID;
  }

  /**
   * Getter for svg element
   * @return {SVGSVGElement} - returns the svg for Icon
   */
  get svgHtml(): SVGSVGElement {
    return this.svg;
  }

  /**
   * Setter for html of svg
   * @param {SVGSVGElement} svg - svg element
   */
  set svgHtml(svg: SVGSVGElement) {
    this.svg = svg;
  }

  /**
   * Getter for class list
   * @return {string} - class list of Icon
   */
  get classList(): string {
    return this.classes;
  }

  /**
   * Setter for class list
   * @param {string} classes - class list for Icon
   */
  set classList(classes: string) {
    this.classes = classes;
  }

  /**
   * Creates basics for svg element
   * @param {string} pathValue - path to add to svg element
   * @return {SVGSVGElement} - returns an svg element which includes pathValue
   */
  protected createBasics(pathValue: string): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', this.id);
    svg.setAttributeNS(null, 'class', this.classList);
    svg.setAttributeNS(null, 'viewBox', '0 0 24 24');
    svg.setAttributeNS(null, 'role', 'img');
    svg.setAttributeNS(null, 'aria-hidden', 'true');

    const firstPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    firstPath.setAttributeNS(null, 'd', 'M0 0h24v24H0z');
    firstPath.setAttributeNS(null, 'fill', 'none');
    svg.appendChild(firstPath);

    const secondPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    secondPath.setAttributeNS(null, 'd', pathValue);
    svg.appendChild(secondPath);
    return svg;
  }

  /**
   * Creates the compleate svg element
   * @returns {SVGSVGElement} - compleate svg element
   */
  abstract createSvg(): SVGSVGElement;
}

/**
 * Play Icon
 */
export class PlayIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates playIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics('M8 5v14l11-7z');
  }
}

/**
 * Stop Icon
 */
export class StopIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates stopIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics('M6 6h12v12H6z');
  }
}

/**
 * Pause Icon
 */
export class PauseIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates pauseIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics('M6 19h4V5H6v14zm8-14v14h4V5h-4z');
  }
}

/**
 * Ear Icon
 */
export class EarIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates earIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics(
        'M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.'+
      '71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.'+
      '32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 '+
      '5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91'+
      ' 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82'+
      ' 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 '+
      '4-4h-2c0 1.1-.9 2-2 2zM7.64 2.64L6.22 1.22C4.23 3.21 3 5.96 '+
      '3 9s1.23 5.79 3.22 7.78l1.41-1.41C6.01 13.74 5 11.49 5 '+
      '9s1.01-4.74 2.64-6.36zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 '+
      '2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z');
  }
}

/**
 * Speed Icon
 */
export class SpeedIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates speedIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics(
        'M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 '+
        '0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 '+
        '1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 '+
        '6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z');
  }
}

/**
 * FastForward Icon
 */
export class FastforwardIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates fastforwardIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics('M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z');
  }
}

/**
 * Close Icon
 */
export class CloseIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates closeIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics(
        'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 '+
        '5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
  }
}

/**
 * Settings Icon
 */
export class SettingsIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates settingsIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttributeNS(null, 'id', this.ID);
    svg.setAttributeNS(null, 'enable-background', 'new 0 0 24 24');
    svg.setAttributeNS(null, 'viewBox', '0 0 24 24');
    svg.setAttributeNS(null, 'class', this.classList);

    const firstG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const firstPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    firstPath.setAttributeNS(null, 'd', 'M0,0h24v24H0V0z');
    firstPath.setAttributeNS(null, 'fill', 'none');


    const secondPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    secondPath.setAttributeNS(null, 'd',
        'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0'+
        '.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.'+
        '58c0.18-0.14,0.23-0.41,0.12-0.61 '+
        'l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0'+
        '.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0'+
        '.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.'+
        '41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5'+
        '.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.'+
        '22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.'+
        '66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69'+
        ',4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.'+
        '14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0'+
        '.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.'+
        '94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0'+
        '.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96'+
        ' c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12'+
        '-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,'+
        '3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z');
    firstG.appendChild(firstPath);
    firstG.appendChild(secondPath);

    svg.appendChild(firstG);
    return svg;
  }
}

/**
 * Volume up Icon
 */
export class VolumeUpIcon extends Icon {
  /**
   * @param {string} id - id of Icon
   * @param {string} classlist - classes of Icon
   */
  constructor(id: string, classlist?: string) {
    super(id, classlist);
  }

  /**
   * Creates volumeUpIcon html
   * @return {SVGSVGElement} - svg element
   */
  createSvg(): SVGSVGElement {
    return this.createBasics(
        'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4'+
        '.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2'+
        '.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.9'+
        '1 7-4.49 7-8.77s-2.99-7.86-7-8.77z');
  }
}


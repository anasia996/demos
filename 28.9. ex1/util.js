import { Points } from "@ixfx/geometry.js";

/**
 * 
 * @param {HTMLElement} element 
 * @param {Points.Point} position 
 */
export function positionFromMiddle(element, position){
  const bounds = element.getBoundingClientRect();
  let {x, y} = position;
  x = x - bounds.width/2;
  y = y - bounds.height/2;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  
}
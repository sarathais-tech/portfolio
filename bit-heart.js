const heartTarget = document.querySelector('.bit-heart-target');

heartTarget.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch') return;

  const bounds = heartTarget.getBoundingClientRect();
  const x = 2 * (event.clientX - bounds.left) / bounds.width - 1;
  const y = 2 * (event.clientY - bounds.top) / bounds.height - 1;
  heartTarget.style.setProperty('--heart-x', `${x * 11}px`);
  heartTarget.style.setProperty('--heart-y', `${y * 8}px`);
  heartTarget.style.setProperty('--heart-tilt', `${x * 9}deg`);
  heartTarget.classList.add('is-tracking');
});

function resetHeart() {
  heartTarget.classList.remove('is-tracking');
  for (const property of ['--heart-x', '--heart-y', '--heart-tilt']) {
    heartTarget.style.removeProperty(property);
  }
}

heartTarget.addEventListener('pointerleave', resetHeart);
heartTarget.addEventListener('pointercancel', resetHeart);

export const fadeInUp = {
  hidden: {
    y: 60,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const fadeInLeft = {
  hidden: {
    x: -60,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const fadeInRight = {
  hidden: {
    x: 60,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const scaleIn = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut'
    }
  }
});
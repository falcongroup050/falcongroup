export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 3, ease: "easeOut" }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: window.innerWidth < 768 ? -20 : -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

export const fadeInRight = {
  initial: { opacity: 0, x: window.innerWidth < 768 ? 20 : 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const scaleOnHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
}

export const floatingAnimation = {
  animate: {
    x: [0, 100, 0],
    y: [0, -50, 0],
  },
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }
}

export const floatingAnimationReverse = {
  animate: {
    x: [0, -80, 0],
    y: [0, 60, 0],
  },
  transition: {
    duration: 25,
    repeat: Infinity,
    ease: "linear"
  }
}

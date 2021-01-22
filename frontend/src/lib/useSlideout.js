import { useEffect, useRef, useState } from 'react'

export const useSlideout = () => {
  const menuLeft = useRef(null)
  const menuRight = useRef(null)
  const panel = useRef(null)
  const header = useRef(null)

  let slideoutLeft = null
  let slideoutRight = null

  const [sl, setSl] = useState(slideoutLeft)
  const [sr, setSr] = useState(slideoutRight)

  useEffect(() => {
    async function setupSlideout() {
      const Slideout = (await import('slideout')).default

      const paddingLeft = 304
      const paddingRight = 240

      if (menuRight) {
        slideoutRight = new Slideout({
          panel: panel.current,
          menu: menuRight.current,
          padding: paddingRight,
          tolerance: 70,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          side: 'right'
        })
      }

      if (menuLeft) {
        slideoutLeft = new Slideout({
          panel: panel.current,
          menu: menuLeft.current,
          padding: paddingLeft,
          tolerance: 70,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        })

        slideoutLeft.on('translate', function (translated) {
          if (header) {
            header.current.style.transform = `translateX(${translated}px)`
          }
        })
        slideoutLeft.on('translatestart', function () {
          if (menuRight && slideoutRight) {
            menuRight.current.classList.add('slideout-open--left')
            slideoutRight.disableTouch()
          }
        })
        slideoutLeft.on('beforeopen', function () {
          if (header) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = `translateX(${paddingLeft}px)`
          }
          if (menuRight && slideoutRight) {
            menuRight.current.classList.add('slideout-open--left')
            slideoutRight.disableTouch()
          }
        })
        slideoutLeft.on('beforeclose', function () {
          if (header) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = 'translateX(0px)'
          }
        })
        slideoutLeft.on('open', function () {
          if (header) {
            header.current.style.transition = ''
          }
        })
        slideoutLeft.on('close', function () {
          if (header) {
            header.current.style.transition = ''
          }
          if (menuRight && slideoutRight) {
            menuRight.current.classList.remove('slideout-open--left')
            slideoutRight.enableTouch()
          }
        })
      }

      if (menuRight && slideoutRight) {
        slideoutRight.on('translate', function (translated) {
          if (header) {
            header.current.style.transform = `translateX(${translated}px)`
          }
        })
        slideoutRight.on('translatestart', function () {
          if (menuLeft && slideoutLeft) {
            menuLeft.current.classList.add('slideout-open--right')
            slideoutLeft.disableTouch()
          }
        })
        slideoutRight.on('beforeopen', function () {
          if (header) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = `translateX(${-paddingRight}px)`
          }
          if (menuLeft && slideoutLeft) {
            menuLeft.current.classList.add('slideout-open--right')
            slideoutLeft.disableTouch()
          }
        })
        slideoutRight.on('beforeclose', function () {
          if (header) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = 'translateX(0px)'
          }
        })
        slideoutRight.on('open', function () {
          if (header) {
            header.current.style.transition = ''
          }
        })
        slideoutRight.on('close', function () {
          if (menuLeft && slideoutLeft) {
            menuLeft.current.classList.remove('slideout-open--right')
            slideoutLeft.enableTouch()
          }
          if (header) {
            header.current.style.transition = ''
          }
        })
      }

      setSl(slideoutLeft)
      setSr(slideoutRight)
    }
    setupSlideout()
  }, [menuLeft, menuRight, header, panel])

  return {
    panel,
    header,
    menuLeft,
    menuRight,
    slideoutLeft: sl,
    slideoutRight: sr
  }
}

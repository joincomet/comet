import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

export const useSlideout = () => {
  const menuLeft = useRef(null)
  const menuRight = useRef(null)
  const panel = useRef(null)
  const header = useRef(null)

  let slideoutLeft = null
  let slideoutRight = null

  const [sl, setSl] = useState(slideoutLeft)
  const [sr, setSr] = useState(slideoutRight)

  useClickAway(
    menuLeft,
    e => {
      //e.stopPropagation()
      //e.preventDefault()
      if (sl && sl.isOpen()) sl.close()
    },
    ['click']
  )

  useClickAway(
    menuRight,
    e => {
      //e.stopPropagation()
      //e.preventDefault()
      if (sr && sr.isOpen()) sr.close()
    },
    ['click']
  )

  useEffect(() => {
    async function setupSlideout() {
      const Slideout = (await import('slideout')).default

      const paddingLeft = 304
      const paddingRight = 240
      const tolerance = 100 // default 70
      const easing = 'cubic-bezier(0.4, 0, 0.2, 1)'

      if (menuRight.current) {
        slideoutRight = new Slideout({
          panel: panel.current,
          menu: menuRight.current,
          padding: paddingRight,
          tolerance,
          easing,
          side: 'right'
        })
      }

      if (menuLeft.current) {
        slideoutLeft = new Slideout({
          panel: panel.current,
          menu: menuLeft.current,
          padding: paddingLeft,
          tolerance,
          easing
        })

        slideoutLeft.on('translate', function (translated) {
          if (header.current) {
            header.current.style.transform = `translateX(${translated}px)`
          }
        })
        slideoutLeft.on('translatestart', function () {
          if (menuRight.current && slideoutRight) {
            menuRight.current.classList.add('slideout-open--left')
            slideoutRight.disableTouch()
          }
        })
        slideoutLeft.on('beforeopen', function () {
          if (header.current) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = `translateX(${paddingLeft}px)`
          }
          if (menuRight.current && slideoutRight) {
            menuRight.current.classList.add('slideout-open--left')
            slideoutRight.disableTouch()
          }
        })
        slideoutLeft.on('beforeclose', function () {
          if (header.current) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = 'translateX(0px)'
          }
        })
        slideoutLeft.on('open', function () {
          if (header.current) {
            header.current.style.transition = ''
          }
        })
        slideoutLeft.on('close', function () {
          if (header.current) {
            header.current.style.transition = ''
          }
          if (menuRight.current && slideoutRight) {
            menuRight.current.classList.remove('slideout-open--left')
            slideoutRight.enableTouch()
          }
        })
      }

      if (menuRight.current && slideoutRight) {
        slideoutRight.on('translate', function (translated) {
          if (header.current) {
            header.current.style.transform = `translateX(${translated}px)`
          }
        })
        slideoutRight.on('translatestart', function () {
          if (menuLeft.current && slideoutLeft) {
            menuLeft.current.classList.add('slideout-open--right')
            slideoutLeft.disableTouch()
          }
        })
        slideoutRight.on('beforeopen', function () {
          if (header.current) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = `translateX(${-paddingRight}px)`
          }
          if (menuLeft.current && slideoutLeft) {
            menuLeft.current.classList.add('slideout-open--right')
            slideoutLeft.disableTouch()
          }
        })
        slideoutRight.on('beforeclose', function () {
          if (header.current) {
            header.current.style.transition = 'transform 300ms ease'
            header.current.style.transform = 'translateX(0px)'
          }
        })
        slideoutRight.on('open', function () {
          if (header.current) {
            header.current.style.transition = ''
          }
        })
        slideoutRight.on('close', function () {
          if (menuLeft.current && slideoutLeft) {
            menuLeft.current.classList.remove('slideout-open--right')
            slideoutLeft.enableTouch()
          }
          if (header.current) {
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

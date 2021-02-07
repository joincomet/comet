import React from 'react'
import { motion } from 'framer-motion'
import { card } from './Auth.module.css'

export default function AuthCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: '-50%' }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: '-50%' }}
      transition={{ type: 'spring', duration: 0.8 }}
      className={card}
    >
      {children}
    </motion.div>
  )
}

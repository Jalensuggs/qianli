import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 首屏加载印章：朱砂「归」字 1.5s 后淡出。
export default function Loader({ onDone }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false)
      onDone?.()
    }, 1500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
        >
          <motion.div
            className="loader__seal"
            initial={{ scale: 1.4, opacity: 0, rotate: -14 }}
            animate={{ scale: 1, opacity: 1, rotate: -4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            归
          </motion.div>
          <div className="loader__bar">
            <motion.span
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 注意：这里刻意不用 StrictMode——
// StrictMode 在开发环境会双挂载组件，导致 GSAP ScrollTrigger 的 pin
// 和 Lenis 实例被注册两次，产生跳动。生产构建不受影响。
createRoot(document.getElementById('root')).render(<App />)

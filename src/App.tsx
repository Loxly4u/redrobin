import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutResume from './routes/AboutResume'
import Arsenal from './routes/Arsenal'
import CaseStudies from './routes/CaseStudies'
import Careers from './routes/Careers'
import Home from './routes/Home'
import Methodology from './routes/Methodology'
import PentestChecklist from './routes/PentestChecklist'
import ResearchAdvisories from './routes/ResearchAdvisories'
import QuestionBank from './routes/QuestionBank'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

const pageTransition = {
  duration: 0.35,
  ease: 'easeOut',
}

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
      <main className="mx-auto max-w-7xl overflow-x-hidden px-3 pb-16 pt-5 sm:px-6 sm:pb-24 sm:pt-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-10"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/research-and-advisories" element={<ResearchAdvisories />} />
              <Route path="/arsenal" element={<Arsenal />} />
              <Route path="/pentest-checklist" element={<PentestChecklist />} />
              <Route path="/about-and-resume" element={<AboutResume />} />
              <Route path="/pentest-questions" element={<QuestionBank kind="pentesting" />} />
              <Route path="/red-team-questions" element={<QuestionBank kind="red-teaming" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App

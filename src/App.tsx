import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Faturamento from './pages/Faturamento';
import Lancamento from './pages/Lancamento';
import Welcome from './pages/Welcome';
import Clientes from './pages/Cliente';
import Agendamento from './pages/AgendamentoPage';



function App({ toggleTheme }: { toggleTheme: () => void }) {
  const location = useLocation();

  return (
    <Layout toggleTheme={toggleTheme}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faturamento" element={<Faturamento />} />
          <Route path="/lancamento" element={<Lancamento />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/agendamento" element={<Agendamento />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;

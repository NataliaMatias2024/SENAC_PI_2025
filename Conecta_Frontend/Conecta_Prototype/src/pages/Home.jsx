import React, { useState, useEffect } from 'react';
import PrestadorDeServicoCard from '../components/Cards';
import { getAllPrestadoresDeServico } from '../api/Prestadordeservico';

const Home = () => {
  const [prestadores, setPrestadores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const data = await getAllPrestadoresDeServico();
        setPrestadores(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchPrestadores();
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <PrestadorDeServicoCard prestador={null} />
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <PrestadorDeServicoCard prestador={null} />
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <PrestadorDeServicoCard prestador={null} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!prestadores || prestadores.length === 0) {
    return <div>No prestadores de serviço found.</div>;
  }

  return (
    <div className="row">
      {prestadores.map((prestador) => (
        <div key={prestador.id} className="col-12 col-md-6 col-lg-4 mb-4">
          <PrestadorDeServicoCard prestador={prestador} />
        </div>
      ))}
    </div>
  );
};

export default Home;

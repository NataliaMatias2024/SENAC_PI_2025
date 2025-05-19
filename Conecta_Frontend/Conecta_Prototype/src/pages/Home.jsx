import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
} from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllPrestadoresDeServico } from '../api/Prestadordeservico';
import styled from 'styled-components';
import '../index.css';

// Styled Components
const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 0;
  text-align: center;
  width: 100%;
`;

const NewContainer = styled(Container)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 5000%;
  z-index: 500;
  padding: 0;
  height: 8%;
  background: #2a6670;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-bottom: 2rem;
`;

const PrestadoresDeServicoPage = () => {
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
      <Container className="header">
        {' '}
        <Header>
          <h1>Prestadores de Serviço</h1>
        </Header>
        <ContentWrapper>
          <Container>
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Prestadores de Serviço</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
              {Array.from({ length: 3 }).map((_, i) => (
                <Col key={i} xs={12} md={6} lg={4} className="mb-4">
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="d-flex align-items-center gap-4">
                        <div className="skeleton h-12 w-12 rounded-circle"></div>
                        <div>
                          <div className="skeleton h-6 w-32 mb-1"></div>
                          <div className="skeleton h-4 w-48"></div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-100"></div>
                        <div className="skeleton h-4 w-80"></div>
                        <div className="d-flex flex-wrap gap-2">
                          <div className="skeleton h-6 w-20"></div>
                          <div className="skeleton h-6 w-24"></div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </ContentWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="header">
        <Header>
          <h1>Prestadores de Serviço</h1>
        </Header>
        <ContentWrapper>
          <Container>
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Prestadores de Serviço</Breadcrumb.Item>
            </Breadcrumb>
            <Alert variant="danger">Error: {error}</Alert>
          </Container>
        </ContentWrapper>
      </Container>
    );
  }

  if (!prestadores || prestadores.length === 0) {
    return (
      <NewContainer className="header">
        <Header>
          <h1>Prestadores de Serviço</h1>
        </Header>
        <ContentWrapper>
          <Container>
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Prestadores de Serviço</Breadcrumb.Item>
            </Breadcrumb>
            <Alert variant="warning">No prestadores de serviço found.</Alert>
          </Container>
        </ContentWrapper>
      </NewContainer>
    );
  }

  return (
    <NewContainer className="mt-0">
      <Header>
        <h1>Prestadores de Serviço</h1>
      </Header>
      <ContentWrapper>
        <Container>
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Prestadores de Serviço</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            {prestadores.map((prestador) => (
              <Col key={prestador.id} xs={12} md={6} lg={4} className="mb-4">
                <Card className="mb-4 transition-transform transform hover:scale-[1.02] hover:shadow-lg border-0 shadow-sm">
                  <CardHeader className="bg-white border-bottom-0">
                    <div className="d-flex align-items-center gap-4">
                      {prestador.imagemLogo ? (
                        <Image
                          src={prestador.imagemLogo}
                          roundedCircle
                          width={60}
                          height={60}
                          alt={prestador.nome}
                          className="border border-1 border-secondary"
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                          style={{
                            width: '60px',
                            height: '60px',
                            fontSize: '1.5rem',
                          }}
                        >
                          {prestador.nome.substring(0, 2)}
                        </div>
                      )}
                      <div>
                        <CardTitle className="h5 mb-1">
                          {prestador.nome}
                        </CardTitle>
                        <CardText className="small text-muted">
                          {prestador.endereco}, {prestador.cidade} -{' '}
                          {prestador.estado}
                        </CardText>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2">
                      <p>
                        <strong>Telefone:</strong> {prestador.telefone}
                      </p>
                      <p>
                        <strong>Email:</strong> {prestador.email}
                      </p>
                      <div className="d-flex flex-wrap gap-2">
                        {prestador.areasDeAtuacao.map((area, index) => (
                          <Badge
                            key={index}
                            variant="primary"
                            className="badge-pill"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="outline-secondary" size="lg">
              Load More
            </Button>
          </div>
        </Container>
      </ContentWrapper>
    </NewContainer>
  );
};

export default PrestadoresDeServicoPage;

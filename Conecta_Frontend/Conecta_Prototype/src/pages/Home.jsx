import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Badge,
  Image,
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllPrestadoresDeServico } from "../api/Prestadordeservico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBook } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "../index.css";

// Styled Components
const FixedHeader = styled.header`
  background-color: #1c88eb;
  color: white;
  padding: 1rem 0;
  text-align: start;
  width: 100%;
  position: sticky;
  top: 0 !important;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  left: 0;
  right: 0;
  height: 8%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-bottom: 2rem;
  padding-top: 10px;
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
        setError(err.message || "Falha ao carregar os dados");
      } finally {
        setLoading(false);
      }
    };
    fetchPrestadores();
  }, []);

  // Helper function to render the fixed header
  const renderFixedHeader = () => (
    <FixedHeader>
      <Container fluid> {/* Use fluid container for full width */}
        <Row className="align-items-center">
          <Col xs={9} className="d-flex align-items-center">
            <Image
              src="/logo.jpg"
              alt="logo"
              rounded
              style={{
                width: "45px",
                height: "45px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                border: "2px solid rgba(255, 255, 255, 0.4)",
                padding: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
            />
            <h1
              className="h1 mb-0 ms-2"
              style={{
                color: "white",
                textShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              CONECTA
            </h1>
          </Col>
          <Col xs={3} className="d-flex justify-content-end align-items-center">
            <FontAwesomeIcon
              icon={faCircleUser}
              color="rgb(255, 255, 255)"
              style={{ fontSize: "40px" }}
            />
          </Col>
        </Row>
      </Container>
    </FixedHeader>
  );

  if (loading) {
    return (
      <Container fluid className="p-0">
        {renderFixedHeader()}
        <ContentWrapper>
          <Container>
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Prestadores de Serviço</Breadcrumb.Item>
            </Breadcrumb>
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="mb-4">
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
            ))}
          </Container>
        </ContentWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-0">
        {renderFixedHeader()}
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
      <Container fluid className="p-0">
        {renderFixedHeader()}
        <ContentWrapper>
          <Container>
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Prestadores de Serviço</Breadcrumb.Item>
            </Breadcrumb>
            <Alert variant="warning">Não há prestadores de serviços.</Alert>
          </Container>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0" style={{ backgroundColor: "#f8f9fa" }}>
      {renderFixedHeader()}
      <ContentWrapper>
        <Container>
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Prestadores de Serviço</Breadcrumb.Item>
          </Breadcrumb>
          {prestadores.map((prestador) => (
            <Card
              key={prestador.id}
              className="mb-4 transition-transform transform hover:scale-[1.02] hover:shadow-lg border-0 shadow-sm"
            >
              <CardHeader className="bg-white border-bottom-0">
                <div className="d-flex align-items-center gap-4">
                  {prestador.imagemLogo ? (
                    <Image
                      src={prestador.imagemLogo}
                      roundedCircle
                      width={50}
                      height={50}
                      alt={prestador.nome}
                      className="border border-1 border-secondary"
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "1.5rem",
                      }}
                    >
                      {prestador.nome.substring(0, 2)}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <CardTitle className="h5 mb-1">{prestador.nome}</CardTitle>
                    <CardText className="small text-muted">
                      Endereço: {prestador.endereco}, {prestador.cidade} -{" "}
                      {prestador.estado}
                    </CardText>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> {prestador.email}
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    Áreas de atuação:
                    {prestador.areasDeAtuacao.map((area, index) => (
                      <Badge key={index} variant="primary" className="badge-pill">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          <div className="text-center mt-4">
            <Button variant="outline-secondary" size="lg">
              Carregar
            </Button>
          </div>
        </Container>
      </ContentWrapper>
    </Container>
  );
};

export default PrestadoresDeServicoPage;
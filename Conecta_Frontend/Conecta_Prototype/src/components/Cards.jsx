import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Badge,
  Image,
} from 'react-bootstrap';

const PrestadorDeServicoCard = ({ prestador }) => {
  if (!prestador) {
    return (
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
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="d-flex align-items-center gap-4">
          {prestador.imagemLogo ? (
            <Image
              src={prestador.imagemLogo}
              roundedCircle
              width={48}
              height={48}
              alt={prestador.nome}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white"
              style={{ width: '48px', height: '48px' }}
            >
              {prestador.nome.substring(0, 2)}
            </div>
          )}
          <div>
            <CardTitle>{prestador.nome}</CardTitle>
            <CardText>
              {prestador.endereco}, {prestador.cidade} - {prestador.estado}
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
              <Badge key={index} variant="secondary">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PrestadorDeServicoCard;

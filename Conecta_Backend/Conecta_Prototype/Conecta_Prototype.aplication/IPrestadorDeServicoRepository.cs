using Conecta_Prototype.Domain.Entities;

namespace Conecta_Prototype.Application.Interfaces;

public interface IPrestadorDeServicoRepository
{
    PrestadorDeServico GetById(int id);
    void Add(PrestadorDeServico prestadorDeServico);
    List<PrestadorDeServico> GetPS();
}

using Conecta_Prototype.Application.Interfaces;
using Conecta_Prototype.Domain.Entities;

namespace Conecta_Prototype.Application.Services;

public class PrestadorDeServicoService
{
    private readonly IPrestadorDeServicoRepository _prestadorDeServicoRepository;

    public PrestadorDeServicoService(IPrestadorDeServicoRepository prestadorDeServicoRepository)
    {
        _prestadorDeServicoRepository = prestadorDeServicoRepository;
    }

    public PrestadorDeServico GetPrestadorDeServicoById(int id)
    {
        return _prestadorDeServicoRepository.GetById(id);
    }

    public void CreatePrestadorDeServico(PrestadorDeServico prestadorDeServico)
    {
        _prestadorDeServicoRepository.Add(prestadorDeServico);
    }

    public List<PrestadorDeServico> GetPrestadorDeServico()
    {
        return _prestadorDeServicoRepository.GetPS();
    }
}


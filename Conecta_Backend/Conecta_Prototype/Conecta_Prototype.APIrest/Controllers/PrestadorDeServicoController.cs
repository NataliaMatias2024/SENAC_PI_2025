using Conecta_Prototype.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Conecta_Prototype.Domain.Entities;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Conecta_Prototype.APIRest.Controllers;

[ApiController]
[Route("[controller]")]
public class PrestadorDeServicoController : ControllerBase
{
    private readonly PrestadorDeServicoService _prestadorDeServicoService;
    private readonly string _dbPath;

    public PrestadorDeServicoController(PrestadorDeServicoService prestadorDeServicoService)
    {
        _prestadorDeServicoService = prestadorDeServicoService;
        _dbPath = "meu_banco.db";
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var prestador = _prestadorDeServicoService.GetPrestadorDeServicoById(id);
        if (prestador == null)
            return NotFound();
        return Ok(prestador);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var prestadores = _prestadorDeServicoService.GetPrestadorDeServico();
        return Ok(prestadores);
    }

    [HttpPost]
    public IActionResult Post([FromForm] PrestadorDeServicoInputModel inputModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var prestadorDeServico = new PrestadorDeServico
        {
            CPF = inputModel.CPF,
            CNPJ = inputModel.CNPJ,
            Nome = inputModel.Nome,
            Endereco = inputModel.Endereco,
            AreasDeAtuacao = inputModel.AreasDeAtuacao,
            ImagemLogo = inputModel.ImagemLogo,
            ImagensTrabalhos = inputModel.ImagensTrabalhos,
            Cidade = inputModel.Cidade,
            Estado = inputModel.Estado,
            Telefone = inputModel.Telefone,
            Email = inputModel.Email,
            Senha = inputModel.Senha,
            DataNascimento = inputModel.DataNascimento,
            Genero = inputModel.Genero,
            TelefoneCelular = inputModel.TelefoneCelular,
            CEP = inputModel.CEP
        };
        _prestadorDeServicoService.CreatePrestadorDeServico(prestadorDeServico);
        return Ok();
    }
}

public class PrestadorDeServicoInputModel
{
    [System.ComponentModel.DataAnnotations.Required]
    public string CPF { get; set; }
    public string CNPJ { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public string Nome { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public string Endereco { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public List<string> AreasDeAtuacao { get; set; }
    public string ImagemLogo { get; set; }
    public List<string> ImagensTrabalhos { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public string Cidade { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public string Estado { get; set; }
    public string Telefone { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public string Email { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public string Senha { get; set; }
    [System.ComponentModel.DataAnnotations.Required]
    public string DataNascimento { get; set; }
    public string Genero { get; set; }
    public string TelefoneCelular { get; set; }
    public string CEP { get; set; }
}
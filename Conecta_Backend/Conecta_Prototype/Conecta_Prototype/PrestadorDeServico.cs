namespace Conecta_Prototype.Domain.Entities
{
    public class PrestadorDeServico
    {
        public int Id { get; set; }
        public string CPF { get; set; }
        public string Nome { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string DataNascimento { get; set; }
        public string Endereco { get; set; }
        public List<string> AreasDeAtuacao { get; set; }
    }
}

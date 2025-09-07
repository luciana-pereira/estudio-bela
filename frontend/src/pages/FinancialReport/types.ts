export interface Servico {
    id: number;
    profissional: string;
    descricao: string;
    valor: number;
    data: string;
}
  
export interface Produto {
    id: number;
    nome: string;
    tipo: "entrada" | "saida";
    quantidade: number;
    valorUnitario: number;
    data: string;
}
  
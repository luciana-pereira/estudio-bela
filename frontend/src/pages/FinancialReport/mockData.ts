import { Produto, Servico } from "./types";

export const servicos: Servico[] = [
  { id: 1, profissional: "Luca Andrade", descricao: "Corte", valor: 50, data: "2025-05-01" },
  { id: 2, profissional: "Camila Torres", descricao: "Escova", valor: 40, data: "2025-05-02" },
];

export const produtos: Produto[] = [
  { id: 1, nome: "Shampoo", tipo: "saida", quantidade: 2, valorUnitario: 30, data: '2025-04-30T00:00:00.000Z' },
  { id: 2, nome: "Creme", tipo: "entrada", quantidade: 10, valorUnitario: 25, data: '2025-04-31T00:00:00.000Z' },
];

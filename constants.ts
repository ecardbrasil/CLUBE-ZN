
import type { Partner } from './types';

export const PARTNERS: Partner[] = [
  {
    id: 1,
    name: 'Restaurante Sabor do Sul',
    category: 'Gastronomia',
    benefit: '15% de desconto no almoço',
    imageUrl: 'https://picsum.photos/seed/restaurante/400/300',
  },
  {
    id: 2,
    name: 'Academia Corpo em Movimento',
    category: 'Saúde & Bem-estar',
    benefit: 'Isenção da taxa de matrícula',
    imageUrl: 'https://picsum.photos/seed/academia/400/300',
  },
  {
    id: 3,
    name: 'Barbearia ZN Style',
    category: 'Beleza & Estética',
    benefit: '20% de desconto em corte e barba',
    imageUrl: 'https://picsum.photos/seed/barbearia/400/300',
  },
  {
    id: 4,
    name: 'Pet Shop Meu Amigo Fiel',
    category: 'Pets',
    benefit: '10% de desconto em toda a loja',
    imageUrl: 'https://picsum.photos/seed/petshop/400/300',
  },
  {
    id: 5,
    name: 'Cafeteria Aroma & Grãos',
    category: 'Gastronomia',
    benefit: 'Café expresso em dobro',
    imageUrl: 'https://picsum.photos/seed/cafeteria/400/300',
  },
  {
    id: 6,
    name: 'Livraria Páginas Abertas',
    category: 'Cultura & Lazer',
    benefit: '10% de desconto em livros',
    imageUrl: 'https://picsum.photos/seed/livraria/400/300',
  },
];

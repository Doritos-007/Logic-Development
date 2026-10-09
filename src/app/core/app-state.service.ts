import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  weight: string;
  unitPrice: number;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly products: Product[] = [
    {
      id: 'pergamino',
      name: 'Pergamino Especialidad',
      subtitle: 'Notas frutales y florales',
      price: 195,
      image: 'assets/img/product-pergamino.png',
      category: 'En grano',
      rating: 4.8,
      reviews: 128
    },
    {
      id: 'oro',
      name: 'Oro Natural',
      subtitle: 'Sabor balanceado y dulce',
      price: 175,
      image: 'assets/img/product-oro.png',
      category: 'En grano',
      rating: 4.7,
      reviews: 94
    },
    {
      id: 'tostado',
      name: 'Tostado Clásico',
      subtitle: 'Cuerpo medio y equilibrado',
      price: 165,
      image: 'assets/img/product-tostado.png',
      category: 'Tostado',
      rating: 4.6,
      reviews: 78
    },
    {
      id: 'honey',
      name: 'Honey Premium',
      subtitle: 'Cuerpo intenso y notas de miel',
      price: 210,
      image: 'assets/img/product-honey.png',
      category: 'En grano',
      rating: 4.9,
      reviews: 112
    }
  ];

  cart: CartItem[] = [
    { ...this.products[0], quantity: 1, weight: '250 g', unitPrice: 195 },
    { ...this.products[1], quantity: 1, weight: '500 g', unitPrice: 345 },
    { ...this.products[3], quantity: 1, weight: '250 g', unitPrice: 210 }
  ];

  selectedDelivery = 'standard';
  selectedPayment = 'card';

  addToCart(product: Product, weight = '250 g', unitPrice?: number): void {
    const price = unitPrice ?? product.price;
    const existing = this.cart.find((item) => item.id === product.id && item.weight === weight);
    if (existing) {
      existing.quantity += 1;
      return;
    }
    this.cart.push({ ...product, quantity: 1, weight, unitPrice: price });
  }

  increase(item: CartItem): void {
    item.quantity += 1;
  }

  decrease(item: CartItem): void {
    if (item.quantity > 1) item.quantity -= 1;
  }

  remove(item: CartItem): void {
    this.cart = this.cart.filter((current) => current !== item);
  }

  cartCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  subtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  shipping(): number {
    if (this.selectedDelivery === 'pickup') return 0;
    if (this.selectedDelivery === 'express') return 150;
    return 90;
  }

  total(): number {
    return this.subtotal() + this.shipping();
  }

  money(value: number): string {
    return `$${new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(value)} MXN`;
  }

  resetDemoCart(): void {
    this.cart = [
      { ...this.products[0], quantity: 1, weight: '250 g', unitPrice: 195 },
      { ...this.products[1], quantity: 1, weight: '500 g', unitPrice: 345 },
      { ...this.products[3], quantity: 1, weight: '250 g', unitPrice: 210 }
    ];
  }
}

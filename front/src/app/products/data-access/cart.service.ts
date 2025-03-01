import {computed, Injectable, signal} from '@angular/core';
import {Product} from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _products = signal<Product[]>([]);
  public readonly products = this._products.asReadonly();

  totalQuantity = computed(() => {
    return this.products().reduce((sum, product) => sum + product.quantity, 0);
  });


  addToBasket(product: Product) {
    this._products.update((products: Product[]) => {

      let items: Product[] = [...products];
      const index = items.findIndex(p => p.id === product.id);
      if (index !== -1) {
        items[index] = {...items[index], quantity: items[index].quantity + 1};
      } else {
        items = [...items, {...product, quantity: 1}];
      }
      return items;
    });
  }

  removeFromBasket(productId: number) {
    this._products.update((products: Product[]) => {
      return products.filter(p => p.id !== productId);
    });
  }

  setQuantity(quantity: number, productId: number) {
    this._products.update((products: Product[]) => {
      return products.map(p => p.id === productId ? {...p, quantity} : p);
    });
  }
}

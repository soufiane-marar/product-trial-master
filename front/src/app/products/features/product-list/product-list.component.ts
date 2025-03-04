import {Component, OnInit, inject, signal, Signal, WritableSignal} from "@angular/core";
import {Product} from "app/products/data-access/product.model";
import {ProductsService} from "app/products/data-access/products.service";
import {ProductFormComponent} from "app/products/ui/product-form/product-form.component";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DataView, DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DecimalPipe} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {ImageModule} from "primeng/image";
import {TagModule} from "primeng/tag";
import {CartService} from "../../data-access/cart.service";
import {InputTextModule} from "primeng/inputtext";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, DecimalPipe, RatingModule, FormsModule, ImageModule, TagModule, InputTextModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  public readonly products: Signal<Product[]> = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  getInventoryStatusColor(inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK") {
    if (inventoryStatus === "INSTOCK") {
      return "success";
    } else if (inventoryStatus === "LOWSTOCK") {
      return "warning";
    } else if (inventoryStatus === "OUTOFSTOCK") {
      return "danger";
    }

    return 'info';
  };

  addToBasket(product: Product) {
    this.cartService.addToBasket(product);
  }

  onFilter(dv: DataView, event: any) {
    dv.filter(event.target['value']);
  }
}

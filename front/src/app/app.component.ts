import {
  Component, inject, Signal,
} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SplitterModule} from 'primeng/splitter';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelMenuComponent} from "./shared/ui/panel-menu/panel-menu.component";
import {BadgeModule} from "primeng/badge";
import {Product} from "./products/data-access/product.model";
import {CartService} from "./products/data-access/cart.service";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {DataViewModule} from "primeng/dataview";
import {DecimalPipe} from "@angular/common";
import {ImageModule} from "primeng/image";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule, OverlayPanelModule, Button, CardModule, DataViewModule, DecimalPipe, ImageModule, RatingModule, TagModule, InputNumberModule, FormsModule],
})
export class AppComponent {

  private readonly cartService = inject(CartService);

  public readonly products: Signal<Product[]> = this.cartService.products;
  public readonly totalQuantity: Signal<number> = this.cartService.totalQuantity;


  title = "ALTEN SHOP";

  onQuantityChange(qte: number, product: Product) {
    if (qte == 0) {
      qte = 1;
    }
    this.cartService.setQuantity(qte, product.id);
  }

  removeItemFromCart(product: Product) {
    this.cartService.removeFromBasket(product.id);
  }
}

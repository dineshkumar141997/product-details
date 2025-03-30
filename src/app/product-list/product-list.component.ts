import { Component } from '@angular/core';
import { ProductServicesService } from '../product-services.service';
import { Table } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: any = [];
  searchQuery = '';
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(private productService : ProductServicesService,private dialog: MatDialog,private router: Router,private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((data : any) => {
      this.products = data;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

confirmDelete(id: number): void {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this product?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.deleteProduct(id);
    }
  });
}

deleteProduct(id: number): void {
  this.productService.deleteProduct(id).subscribe(
    () => {
      this.products = this.products.filter((p: any) => p.id !== id);
      this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Product deleted successfully' });
    },
    (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete product' });
    }
  );
}


  Addproduct(){
    this.router.navigateByUrl(`/product/add`);
  }
}

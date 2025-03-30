import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServicesService } from '../product-services.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  product : any = [];
  productForm !: FormGroup;
   categories : any = [
    { name: "Men's Clothing", value: "men's clothing" },
    { name: "Jewellery", value: "jewelery" },
    { name: "Women's Clothing", value: "women's clothing" },
    { name: "Electronics", value: "electronics" }
  ];

  constructor(private router: Router,private fb: FormBuilder,private productService : ProductServicesService, private messageService: MessageService){
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {

  }

  cancel(){
    this.productForm.reset();
    // this.router.navigateByUrl(`/product`);
  }


  save(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
  
    const productData = {
      id: 0, 
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      category: this.productForm.value.category,
      image: this.productForm.value.imageUrl
    };
  
    this.productService.addProduct(productData).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully!' });
        this.productForm.reset();
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product. Try again.' });
        console.error('Error adding product:', error);
      }
    });
  }
  
}

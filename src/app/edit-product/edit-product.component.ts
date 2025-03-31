import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServicesService } from '../product-services.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

  product : any = [];
  productForm !: FormGroup;
  productId!: number;
   categories : any = [
    { name: "Men's Clothing", value: "men's clothing" },
    { name: "Jewellery", value: "jewelery" },
    { name: "Women's Clothing", value: "women's clothing" },
    { name: "Electronics", value: "electronics" }
  ];

  constructor(private router: Router,private fb: FormBuilder,private productService : ProductServicesService,  private route: ActivatedRoute, private messageService: MessageService,){
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : any) => {
      var id = params.get('id');
      if (id) {
        this.productId = id;
        this.fetchProductData(this.productId);
      }
    });
  }

  fetchProductData(id: number): void {
    this.productService.getProductById(id).subscribe(
      (data : any) => {
        this.productForm.patchValue({
          title: data.title,
          price: data.price,
          category: data.category,
          description: data.description,
          imageUrl: data.image
        });
      },
      (error : any) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  cancel(){
    // this.productForm.reset();
    // this.router.navigateByUrl(`/product`);
  }


  save(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
  
    if (this.productId === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Product ID' });
      return;
    }
  
    const updatedProduct = {
      id: this.productId,
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      category: this.productForm.value.category,
      image: this.productForm.value.imageUrl
    };
  
    this.productService.updateProduct(this.productId, updatedProduct).subscribe(
      (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully' });
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update product' });
      }
    );
  }
  
}

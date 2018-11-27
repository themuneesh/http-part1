import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  productForm;
  products = [];

  constructor(private http: HttpClient, private fb: FormBuilder){

    this.productForm = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      price: ["", Validators.required]
    });

    this.http.get('http://localhost:4000/products').subscribe(
      (data: any) =>{
        setTimeout(() =>{
          this.products = data.response;
        }, 3000)      
      },
      (err) =>{
        console.log('No Records Found');
      },
      () =>{
        console.log('Done.....');
      }
    )
    
    // this.http.post('http://localhost:4000/products', {id:12, name:'Box', price: 3000}).subscribe(
    //   (data: any) =>{
    //     console.log(data);
    //   },
    //   (err) =>{

    //   },
    //   () =>{
    //     console.log('done..');
    //   }
    // )
  }

  submitForm(){
    this.http.post('http://localhost:4000/products', this.productForm.value).subscribe(
      (data: any) =>{
        this.products = data.response;
      },
      (err) =>{

      },
      ()=>{console.log('done...');}
    )
  }
  editForm(){
    const id = this.productForm.get('id').value;
    this.http.put(`http://localhost:4000/products/${id}`, this.productForm.value).subscribe(
      (data: any) =>{
        this.products = data.response;
      },
      (err)=>{
        console.log('err..');
      },
      ()=>{
        console.log('Done....');
      }
    )
  }

  deleteForm(){
    const id = this.productForm.get('id').value;
    alert(id);
    this.http.delete(`http://localhost:4000/products/${id}`).subscribe(
      (data: any) =>{
        this.products = data.response;
      },
      (err)=>{
        console.log('err..');
      },
      ()=>{
        console.log('Done....');
      }
    )
  }
  

}

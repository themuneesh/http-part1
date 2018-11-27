import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-newapi',
  templateUrl: './newapi.component.html',
  styleUrls: ['./newapi.component.css']
})
export class NewapiComponent implements OnInit {

  url = "http://localhost:3000/tweet";

  posts = [];

  dogs = [];

  postForm;

  constructor(private http: HttpClient, private fb: FormBuilder) {

    this.postForm = this.fb.group({
      title: [],
      description: [],
      hashtags: this.fb.array([])
    })

    this.http.get(this.url).subscribe(
      (data: any) => {
        console.log(data);
        this.posts = data.response;
      },
      (err) =>{
        console.log('err...');
      },
      () => {
        console.log('Done...');
      }
    )

    this.http.get('https://dog.ceo/api/breed/hound/images/random/10').subscribe(
      (data: any) =>{
        console.log(data);
        this.dogs = data.message;
      }
    )
   }

  ngOnInit() {
  }

  addHashtags(){
    this.postForm.get('hashtags').push(this.fb.control(""));
  }

  postFormData(){
    this.http.post(this.url, this.postForm.value).subscribe(
      (data: any) => {
        location.reload();
        this.posts = data.response;
      },
      (err) => {
        console.log('err...');
      },
      () => {
        console.log('Done...');
      }
    )
  }

  deleteHashtags(ind){
    this.postForm.get('hashtags').removeAt(ind);
  }

  deleteData(ind){
    this.http.delete(`${this.url}/${ind}`).subscribe(
      (data:any) => {
        location.reload();
        this.posts = data.response;
        
      }
    )
  }

  updateData(ind){
    this.http.put(`${this.url}/${ind}`, this.postForm.value).subscribe(
      (data: any)=> {
        location.reload();
        this.posts = data.response;
      }
    )
  }

}

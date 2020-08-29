import { Component } from '@angular/core';

import { products } from '../products';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Post } from '../post';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products = products;

  readonly ROOT_URL ='https://morning-beyond-66097.herokuapp.com';
  readonly ROOT_URL2 = 'https://jsonplaceholder.typicode.com';
  readonly ROOT_URL3 = 'http://localhost:5000';

  posts: Observable<Post[]>;
  newPost: Observable<any>;
  data: Observable<any>;


  constructor(private http: HttpClient) {}

  getPosts() {
    let params = new HttpParams().set('userId', '1');

    let headers = new HttpHeaders().set('Authorization', 'auth-token');

    // this.posts = this.http.get<Post[]>(this.ROOT_URL2 + '/posts', {params});
    this.posts = this.http.get<Post[]>(this.ROOT_URL2 + '/posts', {headers});
  }

  createPost() {
    const data: Post = {
      id: null,
      userId: 23,
      title: 'My New Post',
      body: 'Hello World! qwertty'
    }

    this.newPost = this.http.post(this.ROOT_URL2 + '/posts', data)
      .retry(3)
      .catch(err => {
        console.log(err)
        return Observable.of(err)
      })
  }

  getPeople() {
    console.log("here");

    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
    headers.append('Access-Control-Allow-Headers', 'Authorization, Lang');

    this.data = this.http.get(this.ROOT_URL3 + '/test', {headers});
    console.log("djiofjej");
  }






  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
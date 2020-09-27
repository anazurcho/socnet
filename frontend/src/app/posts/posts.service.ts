import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebRequestService } from '../web-request.service';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts:Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private webReqService: WebRequestService){  }

  getPosts(){
    return this.webReqService.get('posts');
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title:string, content:string){
    return this.webReqService.post('posts', { title: title, content: content });
    // this.postsUpdated.next(this.getPosts());
  }
  likePost(_id:string){
    console.log('პოსტის სერვისი');
    return this.webReqService.patch(`posts/${_id}`, {rating: 10});
    // this.postsUpdated.next(this.getPosts());
  }
  deletePost(_id: string) {
    return this.webReqService.delete(`posts/${_id}`);
  }


  // updatePost(title:)
}

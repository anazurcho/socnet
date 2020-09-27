import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  posts:Post[];

  // private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(){
    this.postsService.getPosts().subscribe((posts:Post[])=> {
      this.posts = posts;
    })
  }

  // ngOnDestroy(){
  //   this.postsSub.unsubscribe();
  // }
  onDeletePostClick(_id:string){
    this.postsService.deletePost(_id)
      .subscribe((res: any) => {
        this.posts = this.posts.filter(val => val._id !== _id);
        console.log(res);
      })
  }
  onPostLikeClick(_id:string, rating:number){
    rating +=1;
    console.log('პოსტებიდან',rating)
    this.postsService.likePost(_id);
  }
}

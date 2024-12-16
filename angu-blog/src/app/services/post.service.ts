import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root', // Ensure this is present
})
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  getPosts(): Observable<any[]> {
    return this.firestore.collection('posts').valueChanges({ idField: 'id' });
  }

  getPostById(id: string): Observable<any> {
    return this.firestore.doc(`posts/${id}`).valueChanges();
  }

  createPost(post: any): Promise<any> {
    return this.firestore.collection('posts').add(post);
  }

  updatePost(id: string, post: any): Promise<void> {
    return this.firestore.doc(`posts/${id}`).update(post);
  }

  deletePost(id: string): Promise<void> {
    return this.firestore.doc(`posts/${id}`).delete();
  }
}

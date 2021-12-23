import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook } from 'src/app/components/book-list/book-list.component';
import { GlobalConstants } from 'src/app/common/global.constants';

export interface IBooksResponse {
  message: string;
  data: IBook[]
}
export interface IBookDetailResponse {
  message: string;
  data: IBook
}
export interface ICommonResponse {
  message?: string;
  statusCode?: number;
  error?: string;
}
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookApiUrl: string = `${GlobalConstants.apiUrl}/api/book`
  private bookId: string = '61c44215e0ae9c56ceb25b31';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBooksResponse> {
    return this.http.get<IBooksResponse>(this.bookApiUrl, {
      headers: {
        'x-access-token': GlobalConstants.token
      }
    });
  }
  getBook(bookId: string): Observable<IBookDetailResponse> {
    return this.http.get<IBookDetailResponse>(`${this.bookApiUrl}/${bookId}`, {
      headers: {
        'x-access-token': GlobalConstants.token
      }
    });
  }
  createBook(): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.bookApiUrl, {
      headers: {
        'x-access-token': GlobalConstants.token
      }
    });
  }
  updateBook(): Observable<IBookDetailResponse> {
    return this.http.put<IBookDetailResponse>(`${this.bookApiUrl}/${this.bookId}`, {
      headers: {
        'x-access-token': GlobalConstants.token
      }
    });
  }
  deleteBook(): Observable<ICommonResponse> {
    return this.http.delete<ICommonResponse>(`${this.bookApiUrl}/${this.bookId}`, {
      headers: {
        'x-access-token': GlobalConstants.token
      }
    });
  }
}

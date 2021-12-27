import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBook } from 'src/app/components/books/books.component';
import { GlobalConstants } from 'src/app/common/global.constants';
import { AuthService } from '../auth/auth.service';

export interface IBooksResponse {
  message: string;
  data: IBook[];
  count?: number;
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

export interface UpdatedBookData {
  title?: number;
  book: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookApiUrl: string = `${GlobalConstants.apiUrl}/api/book`
  private bookId: string = '61c44215e0ae9c56ceb25b31';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBooks(): Observable<IBooksResponse> {
    return this.http.get<IBooksResponse>(this.bookApiUrl, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  getBook(bookId: string): Observable<IBookDetailResponse> {
    return this.http.get<IBookDetailResponse>(`${this.bookApiUrl}/${bookId}`, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  createBook(formData: FormData): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.bookApiUrl, formData, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  updateBook(): Observable<IBookDetailResponse> {
    return this.http.put<IBookDetailResponse>(`${this.bookApiUrl}/${this.bookId}`, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
  deleteBook(updatedBookData: UpdatedBookData): Observable<ICommonResponse> {
    return this.http.delete<ICommonResponse>(`${this.bookApiUrl}/${updatedBookData.book}`, {
      headers: {
        'x-access-token': this.authService.getCookie('token')
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIEndPoints } from '../config/constant';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor(
    private http: HttpClient,
    private authService: UserService
  ) { }

  uploadImageService(image) {
    return this.http.post(APIEndPoints.UPLOAD, image, { headers: this.authService.authHeaderFile(), withCredentials: true })
  }

  deleteOldImageService(image) {
    return this.http.post(APIEndPoints.DELETE_UPLOAD, image, { headers: this.authService.authHeader(), withCredentials: true })
  }

  addMomentService(data) {
    return this.http.post(APIEndPoints.MOMENT, data, { headers: this.authService.authHeader(), withCredentials: true });
  }

  getMomentService() {
    return this.http.get(APIEndPoints.MOMENT, { headers: this.authService.authHeader(), withCredentials: true });
  }

  getMomentByIdService(id) {
    return this.http.get(`${APIEndPoints.MOMENT}byId?mId=${id}`, { headers: this.authService.authHeader(), withCredentials: true })
  }

  updateMomentService(id, data) {
    return this.http.post(`${APIEndPoints.EDIT_MOMENT}?mId=${id}`, data, { headers: this.authService.authHeader(), withCredentials: true })
  }

  deleteMomentService(id) {
    return this.http.delete(`${APIEndPoints.DELETE_MOMENT}?mId=${id}`, { headers: this.authService.authHeader(), withCredentials: true })
  }
}

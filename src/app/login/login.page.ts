import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'logging in...'
    });
    await loading.present();

    let body = {
      username: this.username,
      password: this.password
    }

    let url = 'https://disruptivetech.unisza.edu.my/api/common/v1/auth/login';

    this.httpService.postPublicApi(url, body).subscribe({
      next: async (response: any) => {
        loading.dismiss();

        console.log(response);

        if (response.status == 200) {
          await this.storageService.store('isAuthenticate', true);
          await this.storageService.store('authUser', response.data.info);

          this.router.navigate([''], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        }
      },
      error: (error: any) => {
        console.log(error);
        
      }
    });
  }


}
